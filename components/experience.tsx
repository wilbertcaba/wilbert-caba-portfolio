"use client";

import React from "react";
import SectionHeading from "./section-heading";
import { experiencesData } from "@/lib/data";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useInView } from "react-intersection-observer";

export default function Experience() {
    const { ref } = useSectionInView("Experience");
    const { inView } = useInView({
        triggerOnce: true,
    });

    return (
        <section ref={ref} id="experience" className="scroll-m-28">
            <SectionHeading>My Experience</SectionHeading>
            <VerticalTimeline lineColor="">
                {experiencesData.map((item, index) => (
                    // A React Fragment is a way to group a list of children without adding extra nodes to the DOM.
                    <React.Fragment key={index}>
                        <VerticalTimelineElement
                            contentStyle={{
                                background: "#f3f4f6",
                                boxShadow: "none",
                                border: "1px solid rgba(0, 0, 0, 0.05)",
                                textAlign: "left",
                                padding: "1.3rem 2rem",
                            }}
                            contentArrowStyle={{
                                borderRight: "0.4rem solid #9ca3af",
                            }}
                            date={item.date}
                            icon={item.icon}
                            iconStyle={{
                                background: "white",
                                fontSize: "1.5rem",
                            }}
                        >
                            <h3 className="font-semibold capitalize">{item.company}</h3>
                            <h4>{item.title}</h4>
                            <h5 className="text-sm">{item.location}</h5>
                            <p className="!font-normal text-gray-700 !text-sm">{item.description}</p>
                        </VerticalTimelineElement>
                    </React.Fragment>
                ))}
            </VerticalTimeline>
        </section>
    );
}
