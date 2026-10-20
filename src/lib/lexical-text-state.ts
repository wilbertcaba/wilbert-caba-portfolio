import { TextStateFeature } from "@payloadcms/richtext-lexical";
import { textSm } from "@/lib/text-size";

export const textSizeFeature = TextStateFeature({
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
    },
});
