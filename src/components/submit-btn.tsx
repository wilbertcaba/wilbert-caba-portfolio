import React from "react";
import { useFormStatus as useFormStatus } from "react-dom";
import { FaPaperPlane } from "react-icons/fa";

export default function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            className="group flex h-[3rem] w-[8rem] items-center justify-center gap-2 rounded-full bg-white bg-opacity-10 text-white outline-none transition-all hover:bg-gray-950 disabled:bg-opacity-65"
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
