import { textColorClassName } from "@/lib/text-color";
import { textSizeClassName } from "@/lib/text-size";

type TextStateNode = {
    $?: {
        color?: string | null;
        size?: string | null;
    } | null;
};

export function textStateClassName(node: TextStateNode | null | undefined) {
    const className = [textSizeClassName(node), textColorClassName(node)].filter(Boolean).join(" ");
    return className || undefined;
}
