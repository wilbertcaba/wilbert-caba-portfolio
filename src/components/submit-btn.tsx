import React from "react";
import { useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";
import { Button } from "@/components/ui/button";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <Button type="submit" disabled={pending} className="group min-w-44 gap-2 self-center">
            {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-neutral-900" />
            ) : (
                <>
                    Start The Conversation
                    <FaPaperPlane className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
            )}
        </Button>
    );
}
