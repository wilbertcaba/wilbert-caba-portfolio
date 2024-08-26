import React from "react";

type SectionHeadingProps = {
    children: React.ReactNode;
    alignment?: "center" | "left" | "right";
};

const textAlign = {
    center: "text-center",
    left: "text-left",
    right: "text-right",
};

export default function SectionHeading({ children, alignment }: SectionHeadingProps) {
    return (
        <h2 className={`${alignment ? textAlign[alignment] : "left"} text-5xl font-medium capitalize mb-16`}>
            {children}
        </h2>
    );
}
