import React from "react";
import Footer from "@/components/footer";
import ThemeSwitch from "@/components/theme-switch";
import ThemeContextProvider from "@/context/theme-context";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <ThemeContextProvider>
                {children}
                <Footer />
                <ThemeSwitch />
            </ThemeContextProvider>
        </div>
    );
}
