"use client";

import { RichText } from "@payloadcms/richtext-lexical/react";
import type { SerializedEditorState } from "lexical";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { richTextConverters } from "@/components/rich-text/base-converters";

type AccordionItemField = {
    id?: string | null;
    title?: string | null;
    content?: SerializedEditorState | null;
};

export function LexicalAccordion({ items }: { items?: AccordionItemField[] | null }) {
    const rows = (items ?? []).flatMap((item, index) => {
        const title = item.title?.trim();
        if (!title) return [];

        return [
            {
                id: item.id || `accordion-item-${index}`,
                title,
                content: item.content ?? null,
            },
        ];
    });

    if (!rows.length) return null;

    return (
        <Accordion type="single" collapsible className="not-prose my-8 w-full">
            {rows.map((item) => (
                <AccordionItem key={item.id} value={item.id} className="border-white/15">
                    <AccordionTrigger className="text-base text-white hover:text-primary hover:no-underline">
                        {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-neutral-300">
                        {item.content ? (
                            <RichText
                                className="prose prose-invert max-w-none prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-img:rounded-xl prose-p:mb-4 prose-p:last:mb-0"
                                converters={richTextConverters}
                                data={item.content}
                            />
                        ) : null}
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
