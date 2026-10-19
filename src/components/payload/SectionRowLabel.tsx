"use client";

import { useRowLabel } from "@payloadcms/ui";

type SectionRow = {
    title?: string | null;
};

export function SectionRowLabel() {
    const { data, rowNumber } = useRowLabel<SectionRow>();
    const number = String((rowNumber ?? 0) + 1).padStart(2, "0");
    const title = data?.title?.trim();

    return <span>{title ? `${number}  ${title}` : `Section ${number}`}</span>;
}
