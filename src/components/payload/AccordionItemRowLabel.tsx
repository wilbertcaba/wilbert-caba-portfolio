"use client";

import { useRowLabel } from "@payloadcms/ui";

type AccordionItemRow = {
    title?: string | null;
};

export function AccordionItemRowLabel() {
    const { data, rowNumber } = useRowLabel<AccordionItemRow>();
    const title = data?.title?.trim();

    return <span>{title || `Item ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
}
