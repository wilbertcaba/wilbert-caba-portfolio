import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export default function Eyebrow({ children, className }: { children?: ReactNode; className?: string }) {
    if (children == null || children === "") return null;

    return (
        <p className={cn("mb-2 font-eyebrow text-sm uppercase tracking-widest text-neutral-500", className)}>
            {children}
        </p>
    );
}
