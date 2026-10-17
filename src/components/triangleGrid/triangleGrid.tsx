import type { CSSProperties } from "react";
import "./triangleGrid.css";

// Grid dimensions
const WIDTH = 1440;
const HEIGHT = 900;
const SPACING = 150;

const ROW_HEIGHT = (SPACING * Math.sqrt(3)) / 2;

// Visual configuration
const DOT_RADIUS = 1.4;
const GLOW_RADIUS = 5;
const GLOW_PERCENTAGE = 75;

type Dot = {
  x: number;
  y: number;
  glowing: boolean;
  delay: number;
  duration: number;
  peak: number;
};

function generateGrid() {
  const dots: Dot[] = [];
  const paths: string[] = [];

  const rows = Math.ceil(HEIGHT / ROW_HEIGHT) + 2;
  const cols = Math.ceil(WIDTH / SPACING) + 2;

  const getX = (row: number, col: number) =>
    col * SPACING +
    (row % 2 !== 0 ? SPACING / 2 : 0);

  const getY = (row: number) => row * ROW_HEIGHT;

  for (let row = -1; row < rows; row++) {
    for (let col = -1; col < cols; col++) {
      const x = getX(row, col);
      const y = getY(row);

      // Deterministic pseudo-random values
      const seed = Math.abs(row * 31 + col * 17);

      // Stable hash for selecting glowing dots
      const hash = (
        Math.imul(row + 1000, 73856093) ^
        Math.imul(col + 1000, 19349663)
      ) >>> 0;

      const glowing = hash % 100 < GLOW_PERCENTAGE;

      dots.push({
        x,
        y,
        glowing,
        delay: -(seed % 120) / 10,
        duration: 1.5 + (seed % 25) / 10,
        peak: 0.55 + (seed % 40) / 100,
      });

      // Horizontal line
      paths.push(
        `M${x},${y}L${getX(row, col + 1)},${y}`
      );

      // Diagonal lines toward the next row
      const nextColA = row % 2 === 0 ? col - 1 : col;
      const nextColB = nextColA + 1;

      paths.push(
        `M${x},${y}L${getX(row + 1, nextColA)},${getY(row + 1)}`
      );

      paths.push(
        `M${x},${y}L${getX(row + 1, nextColB)},${getY(row + 1)}`
      );
    }
  }

  return {
    dots,
    path: paths.join(" "),
  };
}

// Generated once, not on every render
const GRID = generateGrid();

export default function TriangleGrid() {
  return (
    <svg
      className="triangle-grid"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="triangle-dot-glow">
          <stop
            offset="0%"
            stopColor="#20e6a0"
            stopOpacity="0.9"
          />
          <stop
            offset="25%"
            stopColor="#20e6a0"
            stopOpacity="0.45"
          />
          <stop
            offset="100%"
            stopColor="#20e6a0"
            stopOpacity="0"
          />
        </radialGradient>
      </defs>

      {/* Static triangular grid */}
      <path
        d={GRID.path}
        fill="none"
        stroke="#20cb8c"
        strokeOpacity="0.10"
        strokeWidth="0.7"
      />

      {/* Static intersection dots */}
      <g fill="#20e6a0" opacity="0.25">
        {GRID.dots.map((dot, index) => (
          <circle
            key={index}
            cx={dot.x}
            cy={dot.y}
            r={DOT_RADIUS}
          />
        ))}
      </g>

      {/* Animated glowing dots */}
      <g>
        {GRID.dots
          .filter((dot) => dot.glowing)
          .map((dot, index) => {
            const animationStyle = {
              animationDelay: `${dot.delay}s`,
              animationDuration: `${dot.duration}s`,
              "--peak": dot.peak,
            } as CSSProperties;

            return (
              <g
                key={index}
                className="triangle-glow"
                style={animationStyle}
              >
                {/* Soft radial glow */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={GLOW_RADIUS}
                  fill="url(#triangle-dot-glow)"
                />

                {/* Bright center */}
                <circle
                  cx={dot.x}
                  cy={dot.y}
                  r={DOT_RADIUS * 1.2}
                  fill="#20e6a0"
                />
              </g>
            );
          })}
      </g>
    </svg>
  );
}
