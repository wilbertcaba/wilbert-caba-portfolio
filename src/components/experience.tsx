"use client";

import React, { useState, useEffect } from "react";
import SectionHeading from "./section-heading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import { useTheme } from "@/context/theme-context";
import { ExperienceProps } from "@/lib/types";

export default function Experience({ data }: { data: ExperienceProps[] }) {
    const { ref, inView } = useSectionInView("Experience", 0.3, true);
    const { theme } = useTheme();

    return (
        <section ref={ref} id="experience" className="scroll-m-28 mb-28 w-full">
            <SectionHeading>My Experience</SectionHeading>
            <VerticalTimeline lineColor="">
                {data
                    ? data.map((experience, index) => (
                          <React.Fragment key={index}>
                              <VerticalTimelineElement
                                  contentStyle={{
                                      background: theme === "light" ? "#f3f4f6" : "rgba(255,255,255,0.05)",
                                      boxShadow: "none",
                                      border: "1px solid rgba(0, 0, 0, 0.05)",
                                      textAlign: "left",
                                      padding: "1.3rem 2rem",
                                  }}
                                  contentArrowStyle={{
                                      borderRight:
                                          theme === "light"
                                              ? "0.4rem solid #9ca3af"
                                              : "0.4rem solid rgba(255,255,255,0.5)",
                                  }}
                                  date={experience.date}
                                  icon={experience.icon}
                                  iconStyle={{
                                      background: theme === "light" ? "white" : "rgba(255, 255, 255, 0.15)",
                                      fontSize: "1.5rem",
                                  }}
                                  visible={inView}
                              >
                                  <h3 className="font-semibold capitalize">{experience.company}</h3>
                                  <h4>{experience.title}</h4>
                                  <h5 className="text-sm">{experience.location}</h5>
                                  <div
                                      className="!font-normal text-gray-700 !text-sm dark:text-white/75"
                                      dangerouslySetInnerHTML={{ __html: experience.description_html }}
                                  />
                              </VerticalTimelineElement>
                          </React.Fragment>
                      ))
                    : "No experiences found"}
            </VerticalTimeline>
        </section>
    );
}
