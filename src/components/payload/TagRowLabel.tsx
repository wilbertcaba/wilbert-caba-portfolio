"use client";

import { useRowLabel } from "@payloadcms/ui";

type TagRow = {
    tag?: string | null;
};

export function TagRowLabel() {
    const { data, rowNumber } = useRowLabel<TagRow>();
    const tag = data?.tag?.trim();

    return <span>{tag || `Tag ${String((rowNumber ?? 0) + 1).padStart(2, "0")}`}</span>;
}
