import React from "react";

type SectionHeadingProps = {
    children: React.ReactNode;
};

export default function SectionHeading({ children }: SectionHeadingProps) {
    return <h2 className="text-5xl text-center font-medium capitalize mb-16">{children}</h2>;
}
