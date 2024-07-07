"use client";

import { useTheme } from "@/context/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeSwitch() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="
                fixed top-3 sm:top-auto sm:bottom-5 right-5 bg-white w-[2rem] h-[2rem] sm:w-[3rem] sm:h-[3rem] bg-opacity-80 backdrop-blur-[0.5rem] 
                border boder-white border-opacity-40 shadow-2xl rounded-full flex items-center justify-center 
                hover:scale-[1.1] active:scale-[1.1] transition-all dark:bg-gray-950 z-[120]
            "
            onClick={toggleTheme}
        >
            {theme === "light" ? <BsSun /> : <BsMoon />}
        </button>
    );
}
