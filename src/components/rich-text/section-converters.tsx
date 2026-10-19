import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import { richTextConverters } from "@/components/rich-text/base-converters";
import { LexicalAccordion } from "@/components/rich-text/lexical-accordion";

type AccordionFields = {
    items?:
        | {
              id?: string | null;
              title?: string | null;
              content?: SerializedEditorState | null;
          }[]
        | null;
};

export const sectionConverters: JSXConvertersFunction = (args) => ({
    ...richTextConverters(args),
    blocks: {
        accordion: ({ node }: { node: { fields: AccordionFields } }) => (
            <LexicalAccordion items={node.fields.items} />
        ),
    },
});
