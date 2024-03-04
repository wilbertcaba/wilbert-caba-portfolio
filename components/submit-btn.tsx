import React from "react";
// @ts-expect-error
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="group flex items-center justify-center gap-2 h-[3rem] w-[8rem] bg-gray-800 hover:bg-gray-950 text-white rounded-full outline-none transition-all disabled:bg-opacity-65 dark:bg-white dark:bg-opacity-10"
            type="submit"
            disabled={pending}
        >
            {pending ? (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
            ) : (
                <>
                    Sumbit
                    <FaPaperPlane className="text-xs opacity-70 transition-all group-hover:translate-x-1 group-hover:-translate-y-1" />
                </>
            )}
        </button>
    );
}
