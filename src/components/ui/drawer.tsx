"use client";

import * as React from "react";
import { Drawer as DrawerPrimitive } from "vaul";

import { cn } from "@/lib/utils";

const Drawer = ({ shouldScaleBackground = false, ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
    <DrawerPrimitive.Root shouldScaleBackground={shouldScaleBackground} {...props} />
);
Drawer.displayName = "Drawer";

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerPortal = DrawerPrimitive.Portal;

const DrawerClose = DrawerPrimitive.Close;

const DrawerOverlay = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Overlay>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Overlay ref={ref} className={cn("fixed inset-0 z-50 bg-black/75", className)} {...props} />
));
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName;

const DrawerContent = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <DrawerPortal>
        <DrawerOverlay />
        <DrawerPrimitive.Content
            ref={ref}
            aria-modal="true"
            className={cn(
                "fixed inset-x-0 bottom-0 z-50 flex h-[calc(100dvh-1.75rem)] flex-col rounded-t-3xl border-t-2 border-primary bg-neutral-950 text-neutral-50 shadow-[0_-24px_80px_rgba(0,0,0,0.45)] outline-none md:h-[calc(100dvh-5.5rem)]",
                className,
            )}
            {...props}
        >
            {children}
        </DrawerPrimitive.Content>
    </DrawerPortal>
));
DrawerContent.displayName = "DrawerContent";

const DrawerHandle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Handle>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Handle>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Handle
        ref={ref}
        className={cn(
            "!relative z-10 mx-auto mt-3 !h-1.5 !w-12 shrink-0 !translate-x-0 !translate-y-0 rounded-full !bg-white/90 !opacity-100 md:pointer-events-none",
            className,
        )}
        {...props}
    />
));
DrawerHandle.displayName = "DrawerHandle";

const DrawerTitle = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Title>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Title ref={ref} className={cn("text-lg font-semibold", className)} {...props} />
));
DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = React.forwardRef<
    React.ElementRef<typeof DrawerPrimitive.Description>,
    React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
    <DrawerPrimitive.Description ref={ref} className={cn("text-sm text-neutral-400", className)} {...props} />
));
DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
    Drawer,
    DrawerPortal,
    DrawerOverlay,
    DrawerTrigger,
    DrawerClose,
    DrawerContent,
    DrawerHandle,
    DrawerTitle,
    DrawerDescription,
};
