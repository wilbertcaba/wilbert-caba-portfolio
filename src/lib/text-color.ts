type TextColorNode = {
    $?: {
        color?: string | null;
    } | null;
};

/** Tailwind `text-primary`, applied in the admin via inline CSS. */
export const textPrimary = {
    label: "Primary",
    className: "text-primary",
    css: {
        color: "var(--primary-color, #2fd38e)",
    },
} as const;

export function textColorClassName(node: TextColorNode | null | undefined) {
    return node?.$?.color === "primary" ? textPrimary.className : undefined;
}
