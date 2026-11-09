"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type MutableRefObject } from "react";
import { ImageZoom } from "@/components/ui/image-zoom";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

const dragThreshold = 10;

export type LexicalGalleryImage = {
    id?: string | null;
    alt?: string | null;
    image?:
        | number
        | string
        | {
              id?: number | string | null;
              alt?: string | null;
              height?: number | null;
              mimeType?: string | null;
              url?: string | null;
              width?: number | null;
              sizes?: {
                  thumbnail?: {
                      url?: string | null;
                  } | null;
              } | null;
          }
        | null;
};

type Slide = {
    id: string;
    alt: string;
    src: string;
    thumb: string;
    width?: number;
    height?: number;
};

function toSlides(images?: LexicalGalleryImage[] | null): Slide[] {
    const slides = (images ?? []).flatMap((item, index) => {
        const media = item.image;
        if (!media || typeof media !== "object" || !media.url || !media.mimeType?.startsWith("image")) return [];

        return [
            {
                id: item.id || `${media.id ?? "image"}-${index}`,
                alt: item.alt?.trim() || media.alt?.trim() || "",
                src: media.url,
                thumb: media.sizes?.thumbnail?.url || media.url,
                width: media.width ?? undefined,
                height: media.height ?? undefined,
            },
        ];
    });

    return slides.map((slide, index) => ({
        ...slide,
        alt: slide.alt || `Image ${index + 1}`,
    }));
}

function zoomIsOpen(zoomedRef: MutableRefObject<boolean>) {
    return zoomedRef.current || document.querySelector("dialog[data-rmiz-modal][open]") !== null;
}

function ZoomableImage({ slide }: { slide: Slide }) {
    return (
        <ImageZoom className="w-full">
            <img alt={slide.alt} className="h-auto w-full rounded-xl" height={slide.height} src={slide.src} width={slide.width} />
        </ImageZoom>
    );
}

function DragClickGuard({ children }: { children: React.ReactNode }) {
    const dragged = useRef(false);

    return (
        <div
            onPointerDown={(event) => {
                if (event.button !== 0) return;

                const originX = event.clientX;
                const originY = event.clientY;
                dragged.current = false;

                const move = (pointerEvent: PointerEvent) => {
                    const dx = pointerEvent.clientX - originX;
                    const dy = pointerEvent.clientY - originY;
                    if (dx * dx + dy * dy > dragThreshold * dragThreshold) dragged.current = true;
                };
                const end = () => {
                    window.removeEventListener("pointermove", move);
                    window.removeEventListener("pointerup", end);
                    window.removeEventListener("pointercancel", end);
                };

                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", end);
                window.addEventListener("pointercancel", end);
            }}
            onClickCapture={(event) => {
                if (!dragged.current) return;

                event.preventDefault();
                event.stopPropagation();
                dragged.current = false;
            }}
        >
            {children}
        </div>
    );
}

function ThumbnailStrip({
    slides,
    selected,
    onSelect,
}: {
    slides: Slide[];
    selected: number;
    onSelect: (index: number) => void;
}) {
    const stripRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const dragged = useRef(false);

    useEffect(() => {
        const strip = stripRef.current;
        const button = buttonRefs.current[selected];
        if (!strip || !button) return;

        const stripRect = strip.getBoundingClientRect();
        const buttonRect = button.getBoundingClientRect();
        if (buttonRect.left < stripRect.left) {
            strip.scrollLeft -= stripRect.left - buttonRect.left;
        } else if (buttonRect.right > stripRect.right) {
            strip.scrollLeft += buttonRect.right - stripRect.right;
        }
    }, [selected]);

    return (
        <div
            ref={stripRef}
            className="mt-3 flex gap-2 overflow-x-auto overscroll-x-contain pb-1"
            onPointerDown={(event) => {
                if (event.button !== 0) return;

                const strip = stripRef.current;
                if (!strip) return;

                const originX = event.clientX;
                const originY = event.clientY;
                const originScroll = strip.scrollLeft;
                dragged.current = false;

                const move = (pointerEvent: PointerEvent) => {
                    const dx = pointerEvent.clientX - originX;
                    const dy = pointerEvent.clientY - originY;
                    if (Math.abs(dx) < dragThreshold || Math.abs(dx) <= Math.abs(dy)) return;

                    dragged.current = true;
                    strip.scrollLeft = originScroll - dx;
                };
                const end = () => {
                    window.removeEventListener("pointermove", move);
                    window.removeEventListener("pointerup", end);
                    window.removeEventListener("pointercancel", end);
                };

                window.addEventListener("pointermove", move);
                window.addEventListener("pointerup", end);
                window.addEventListener("pointercancel", end);
            }}
            onClickCapture={(event) => {
                if (!dragged.current) return;

                event.preventDefault();
                event.stopPropagation();
                dragged.current = false;
            }}
        >
            {slides.map((slide, index) => {
                const current = index === selected;

                return (
                    <button
                        key={slide.id}
                        ref={(node) => {
                            buttonRefs.current[index] = node;
                        }}
                        type="button"
                        aria-current={current ? "true" : undefined}
                        aria-label={`Show image ${index + 1} of ${slides.length}: ${slide.alt}`}
                        className={cn(
                            "h-16 w-24 shrink-0 overflow-hidden rounded-md border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                            current ? "border-primary opacity-100" : "border-white/20 opacity-70 hover:opacity-100",
                        )}
                        onClick={() => onSelect(index)}
                    >
                        <img alt="" className="h-full w-full object-cover" src={slide.thumb} />
                    </button>
                );
            })}
        </div>
    );
}

function GalleryCarousel({ slides }: { slides: Slide[] }) {
    const zoomedRef = useRef(false);
    const [api, setApi] = useState<CarouselApi>();
    const [selected, setSelected] = useState(0);
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduceMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    const watchDrag = useCallback(() => !zoomIsOpen(zoomedRef), []);
    const opts = useMemo(
        () => ({
            align: "start" as const,
            duration: reduceMotion ? 0 : 25,
            loop: false,
            watchDrag,
        }),
        [reduceMotion, watchDrag],
    );

    useEffect(() => {
        if (!api) return;

        const update = () => setSelected(api.selectedScrollSnap());
        update();
        api.on("select", update);
        api.on("reInit", update);
        return () => {
            api.off("select", update);
            api.off("reInit", update);
        };
    }, [api]);

    function handleZoomChange(open: boolean) {
        zoomedRef.current = open;
    }

    function selectSlide(index: number) {
        api?.scrollTo(index);
    }

    return (
        <div
            className="not-prose my-6 w-full"
            onKeyDownCapture={(event) => {
                if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
                if (!zoomIsOpen(zoomedRef)) return;

                event.stopPropagation();
            }}
        >
            <Carousel aria-label="Image gallery" opts={opts} setApi={setApi}>
                <CarouselContent className="ml-0">
                    {slides.map((slide, index) => (
                        <CarouselItem
                            key={slide.id}
                            aria-label={`${index + 1} of ${slides.length}`}
                            className="pl-0"
                            inert={index !== selected}
                        >
                            <DragClickGuard>
                                <ImageZoom className="w-full" onZoomChange={handleZoomChange}>
                                    <img
                                        alt={slide.alt}
                                        className="h-auto w-full rounded-xl"
                                        height={slide.height}
                                        src={slide.src}
                                        width={slide.width}
                                    />
                                </ImageZoom>
                            </DragClickGuard>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="top-auto bottom-3 left-3 translate-y-0" />
                <CarouselNext className="top-auto right-3 bottom-3 translate-y-0" />
            </Carousel>
            <ThumbnailStrip slides={slides} selected={selected} onSelect={selectSlide} />
        </div>
    );
}

export function LexicalGallery({ images }: { images?: LexicalGalleryImage[] | null }) {
    const slides = toSlides(images);
    if (!slides.length) return null;

    if (slides.length === 1) {
        return (
            <div className="not-prose my-6 w-full">
                <ZoomableImage slide={slides[0]} />
            </div>
        );
    }

    return <GalleryCarousel slides={slides} />;
}
