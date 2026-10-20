type TextSizeNode = {
    $?: {
        size?: string | null;
    } | null;
};

/** Tailwind `text-sm` (0.875rem / 1.25rem), applied in the admin via inline CSS. */
export const textSm = {
    label: "Small",
    className: "text-sm",
    css: {
        "font-size": "0.875rem",
        "line-height": "1.25rem",
    },
} as const;

export function textSizeClassName(node: TextSizeNode | null | undefined) {
    return node?.$?.size === "sm" ? textSm.className : undefined;
}
