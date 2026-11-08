import type { JSXConvertersFunction } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import { richTextConverters } from "@/components/rich-text/base-converters";
import { LexicalAccordion } from "@/components/rich-text/lexical-accordion";
import { LexicalIframe } from "@/components/rich-text/lexical-iframe";

type AccordionFields = {
    items?:
        | {
              id?: string | null;
              title?: string | null;
              content?: SerializedEditorState | null;
          }[]
        | null;
};

type IframeFields = {
    url?: string | null;
    title?: string | null;
    height?: number | null;
};

export const sectionConverters: JSXConvertersFunction = (args) => ({
    ...richTextConverters(args),
    blocks: {
        accordion: ({ node }: { node: { fields: AccordionFields } }) => <LexicalAccordion items={node.fields.items} />,
        iframe: ({ node }: { node: { fields: IframeFields } }) => (
            <LexicalIframe height={node.fields.height} title={node.fields.title} url={node.fields.url} />
        ),
    },
});
