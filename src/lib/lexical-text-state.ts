import { TextStateFeature } from "@payloadcms/richtext-lexical";
import { textPrimary } from "@/lib/text-color";
import { textSm } from "@/lib/text-size";

export const textStateFeature = TextStateFeature({
    state: {
        size: {
            sm: {
                label: textSm.label,
                css: {
                    "font-size": textSm.css["font-size"],
                    "line-height": textSm.css["line-height"],
                },
            },
        },
        color: {
            primary: {
                label: textPrimary.label,
                css: {
                    color: textPrimary.css.color,
                },
            },
        },
    },
});
