"use client";

import { useEffect, useRef } from "react";
import "./triangleGrid.css";

// Painted 1:1 in CSS pixels and clipped by the frame, so triangle size stays
// constant on wider and narrower viewports. Width covers large screens.
const WIDTH = 3840;
const HEIGHT = 1080;
const SPACING = 110;

const ROW_HEIGHT = (SPACING * Math.sqrt(3)) / 2;

const DOT_RADIUS = 1.4;
const GLOW_RADIUS = 7;

// Illumination tuning. Frequency and density are independent:
// frequency is how often a new pulse starts, density is the ceiling on how many
// vertices may be lit at the same time. No vertex is permanently excluded.

/** Mean number of new pulses started per second. Waits between them are random. */
const ACTIVATION_FREQUENCY = 6;

/**
 * Maximum share of vertices glowing at once.
 * The canvas is wider than the window and clipped, so this share applies to the
 * vertices currently in view. The glow pool is still this share of the full grid.
 */
const MAX_ILLUMINATION_DENSITY = 0.12;

/** Full fade-in and fade-out of one pulse, in milliseconds. */
const PULSE_DURATION_MIN_MS = 1400;
const PULSE_DURATION_MAX_MS = 2600;

/** Peak opacity of the glow group. Each pulse picks a value in this range. */
const GLOW_INTENSITY_MIN = 0.55;
const GLOW_INTENSITY_MAX = 0.94;

/** Quiet time after a pulse before that vertex may be chosen again, in milliseconds. */
const IDLE_MIN_MS = 500;
const IDLE_MAX_MS = 2800;

/** Minimum spacing from another lit vertex, in triangle steps. 1 leaves neighbors dark. */
const CLUSTER_GAP = 1;

const MIN_SEPARATION_SQ = (SPACING * CLUSTER_GAP) ** 2 * 1.02;

type Dot = {
    x: number;
    y: number;
};

function generateGrid() {
    const dots: Dot[] = [];
    const paths: string[] = [];

    const rows = Math.ceil(HEIGHT / ROW_HEIGHT) + 2;
    const cols = Math.ceil(WIDTH / SPACING) + 2;

    const getX = (row: number, col: number) => col * SPACING + (row % 2 !== 0 ? SPACING / 2 : 0);

    const getY = (row: number) => row * ROW_HEIGHT;

    for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
            const x = getX(row, col);
            const y = getY(row);

            dots.push({ x, y });

            // Horizontal line
            paths.push(`M${x},${y}L${getX(row, col + 1)},${y}`);

            // Diagonal lines toward the next row
            const nextColA = row % 2 === 0 ? col - 1 : col;
            const nextColB = nextColA + 1;

            paths.push(`M${x},${y}L${getX(row + 1, nextColA)},${getY(row + 1)}`);

            paths.push(`M${x},${y}L${getX(row + 1, nextColB)},${getY(row + 1)}`);
        }
    }

    return {
        dots,
        path: paths.join(" "),
    };
}

// Generated once, not on every render
const GRID = generateGrid();

/** DOM nodes reused for pulses. Sized to the density ceiling so the tree stays fixed. */
const GLOW_POOL = Math.max(0, Math.round(GRID.dots.length * MAX_ILLUMINATION_DENSITY));

function randomBetween(min: number, max: number) {
    return min + Math.random() * (max - min);
}

function nextActivationDelay() {
    const meanMs = 1000 / ACTIVATION_FREQUENCY;
    return -Math.log(1 - Math.random()) * meanMs;
}

function isSeparated(index: number, active: Set<number>) {
    if (CLUSTER_GAP <= 0 || active.size === 0) return true;

    const dot = GRID.dots[index];

    for (const other of active) {
        const neighbor = GRID.dots[other];
        const dx = dot.x - neighbor.x;
        const dy = dot.y - neighbor.y;
        if (dx * dx + dy * dy <= MIN_SEPARATION_SQ) return false;
    }

    return true;
}

function pickDot(candidates: number[], active: Set<number>, cooldownUntil: Float64Array, now: number) {
    if (candidates.length === 0) return -1;

    let fallback = -1;
    const tries = Math.min(24, candidates.length);

    for (let attempt = 0; attempt < tries; attempt++) {
        const index = candidates[Math.floor(Math.random() * candidates.length)];
        if (active.has(index) || cooldownUntil[index] > now) continue;
        if (fallback < 0) fallback = index;
        if (isSeparated(index, active)) return index;
    }

    return fallback;
}

/** Vertices inside the frame's visible window. Off-screen vertices stay eligible once they scroll or resize into view. */
function visibleDotIndices(svg: SVGSVGElement) {
    const frame = svg.parentElement;
    if (!frame) return [];

    const frameRect = frame.getBoundingClientRect();
    const svgRect = svg.getBoundingClientRect();
    const left = Math.max(frameRect.left, 0, svgRect.left);
    const right = Math.min(frameRect.right, window.innerWidth, svgRect.right);
    const top = Math.max(frameRect.top, 0, svgRect.top);
    const bottom = Math.min(frameRect.bottom, window.innerHeight, svgRect.bottom);

    if (right - left < 1 || bottom - top < 1) return [];

    const scaleX = WIDTH / svgRect.width;
    const scaleY = HEIGHT / svgRect.height;
    const minX = (left - svgRect.left) * scaleX;
    const maxX = (right - svgRect.left) * scaleX;
    const minY = (top - svgRect.top) * scaleY;
    const maxY = (bottom - svgRect.top) * scaleY;

    const indices: number[] = [];

    for (let index = 0; index < GRID.dots.length; index++) {
        const dot = GRID.dots[index];
        if (dot.x >= minX && dot.x <= maxX && dot.y >= minY && dot.y <= maxY) indices.push(index);
    }

    return indices;
}

function startIllumination(getSlot: (index: number) => SVGGElement | null) {
    const svg = getSlot(0)?.ownerSVGElement;
    if (!svg) return () => {};

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const active = new Set<number>();
    const cooldownUntil = new Float64Array(GRID.dots.length);
    const slotDot = new Int32Array(GLOW_POOL).fill(-1);
    const running = new Set<Animation>();

    let disposed = false;
    let timer = 0;
    let visibleCache: number[] = [];
    let visibleAt = -Infinity;

    const getVisible = (now: number) => {
        if (now - visibleAt < 200) return visibleCache;
        visibleAt = now;
        visibleCache = visibleDotIndices(svg);
        return visibleCache;
    };

    const silence = () => {
        slotDot.fill(-1);
        active.clear();

        for (const animation of running) animation.cancel();
        running.clear();

        for (let slot = 0; slot < GLOW_POOL; slot++) {
            const node = getSlot(slot);
            if (node) node.style.opacity = "0";
        }
    };

    const release = (slot: number, index: number, node: SVGGElement) => {
        if (slotDot[slot] !== index) return;

        active.delete(index);
        slotDot[slot] = -1;
        cooldownUntil[index] = performance.now() + randomBetween(IDLE_MIN_MS, IDLE_MAX_MS);
        node.style.opacity = "";
    };

    const tryActivate = () => {
        const now = performance.now();
        const visible = getVisible(now);
        if (visible.length === 0) return;

        const maxActive = Math.min(GLOW_POOL, Math.max(1, Math.round(visible.length * MAX_ILLUMINATION_DENSITY)));
        if (active.size >= maxActive) return;

        const slot = slotDot.indexOf(-1);
        if (slot < 0) return;

        const node = getSlot(slot);
        if (!node) return;

        const index = pickDot(visible, active, cooldownUntil, now);
        if (index < 0) return;

        const dot = GRID.dots[index];
        node.setAttribute("transform", `translate(${dot.x} ${dot.y})`);
        node.style.opacity = "";

        active.add(index);
        slotDot[slot] = index;

        const peak = randomBetween(GLOW_INTENSITY_MIN, GLOW_INTENSITY_MAX);
        const duration = randomBetween(PULSE_DURATION_MIN_MS, PULSE_DURATION_MAX_MS);

        const animation = node.animate(
            [
                { opacity: 0, easing: "ease-in-out" },
                { opacity: peak, offset: 0.5, easing: "ease-in-out" },
                { opacity: 0 },
            ],
            { duration, fill: "none" },
        );

        running.add(animation);

        animation.onfinish = () => {
            running.delete(animation);
            if (disposed) return;
            release(slot, index, node);
        };
    };

    const schedule = () => {
        if (disposed || document.hidden || motion.matches || timer !== 0) return;

        timer = window.setTimeout(() => {
            timer = 0;
            if (disposed || document.hidden || motion.matches) return;
            tryActivate();
            schedule();
        }, nextActivationDelay());
    };

    const onVisibility = () => {
        if (document.hidden) {
            window.clearTimeout(timer);
            timer = 0;
            return;
        }

        schedule();
    };

    const onMotion = () => {
        if (motion.matches) {
            window.clearTimeout(timer);
            timer = 0;
            silence();
            return;
        }

        schedule();
    };

    motion.addEventListener("change", onMotion);
    document.addEventListener("visibilitychange", onVisibility);

    if (!motion.matches && !document.hidden) schedule();

    return () => {
        disposed = true;
        window.clearTimeout(timer);
        motion.removeEventListener("change", onMotion);
        document.removeEventListener("visibilitychange", onVisibility);
        silence();
    };
}

export default function TriangleGrid() {
    const slotsRef = useRef<(SVGGElement | null)[]>(Array.from({ length: GLOW_POOL }, () => null));
    const slotBinders = useRef(
        Array.from({ length: GLOW_POOL }, (_, index) => (node: SVGGElement | null) => {
            slotsRef.current[index] = node;
        }),
    );

    useEffect(() => {
        if (GLOW_POOL === 0 || ACTIVATION_FREQUENCY <= 0) return;
        return startIllumination((index) => slotsRef.current[index]);
    }, []);

    return (
        <div className="triangle-grid-frame" style={{ height: HEIGHT }} aria-hidden="true">
            <svg className="triangle-grid" viewBox={`0 0 ${WIDTH} ${HEIGHT}`} width={WIDTH} height={HEIGHT}>
                <defs>
                    <radialGradient id="triangle-dot-glow">
                        <stop offset="0%" stopColor="#20e6a0" stopOpacity="0.9" />
                        <stop offset="25%" stopColor="#20e6a0" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#20e6a0" stopOpacity="0" />
                    </radialGradient>
                </defs>

                {/* Static triangular grid */}
                <path d={GRID.path} fill="none" stroke="#20cb8c" strokeOpacity="0.10" strokeWidth="0.7" />

                {/* Static intersection dots */}
                <g fill="#20e6a0" opacity="0.25">
                    {GRID.dots.map((dot, index) => (
                        <circle key={index} cx={dot.x} cy={dot.y} r={DOT_RADIUS} />
                    ))}
                </g>

                {/* One node per simultaneous pulse. Positions are assigned when a pulse starts. */}
                <g>
                    {Array.from({ length: GLOW_POOL }, (_, index) => (
                        <g key={index} className="triangle-glow" ref={slotBinders.current[index]}>
                            <circle r={GLOW_RADIUS} fill="url(#triangle-dot-glow)" />
                            <circle r={DOT_RADIUS * 1.2} fill="#20e6a0" />
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
}
