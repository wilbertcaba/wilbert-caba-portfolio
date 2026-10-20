import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const eyebrowVariants = cva("font-eyebrow uppercase tracking-widest", {
    variants: {
        size: {
            default: "mb-2 text-sm text-neutral-500",
            lg: "mb-8 text-base",
        },
    },
    defaultVariants: {
        size: "default",
    },
});

type EyebrowProps = {
    children?: ReactNode;
    className?: string;
} & VariantProps<typeof eyebrowVariants>;

export default function Eyebrow({ children, className, size }: EyebrowProps) {
    if (children == null || children === "") return null;

    return <p className={cn(eyebrowVariants({ size }), className)}>{children}</p>;
}
