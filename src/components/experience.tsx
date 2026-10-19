"use client";

import Image from "next/image";
import SectionHeading from "./section-heading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import type { ExperienceWithMedia } from "@/lib/cms";

export default function Experience({ data }: { data: ExperienceWithMedia[] }) {
    const { ref, inView } = useSectionInView("experience", 0.3, true);

    return (
        <section ref={ref} id="experience" className="scroll-m-28 mb-28 w-full">
            <SectionHeading alignment="center">My Experience</SectionHeading>
            <VerticalTimeline lineColor="">
                {data
                    ? data.map((experience) => (
                          <VerticalTimelineElement
                              key={experience.id}
                              contentStyle={{
                                  background: "rgba(255,255,255,0.05)",
                                  boxShadow: "none",
                                  border: "1px solid rgba(0, 0, 0, 0.05)",
                                  textAlign: "left",
                                  padding: "1.3rem 2rem",
                              }}
                              contentArrowStyle={{
                                  borderRight: "0.4rem solid rgba(255,255,255,0.5)",
                              }}
                              date={experience.date}
                              icon={
                                  experience.logo?.url ? (
                                      <Image
                                          src={experience.logo.url}
                                          alt={experience.logo.alt || `${experience.company} logo`}
                                          width={40}
                                          height={40}
                                          unoptimized
                                          className="h-[70%] w-[70%] object-contain"
                                      />
                                  ) : undefined
                              }
                              iconStyle={{
                                  background: "rgba(255, 255, 255)",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  overflow: "hidden",
                              }}
                              visible={inView}
                          >
                              <h3 className="font-semibold capitalize">{experience.company}</h3>
                              <h4>{experience.title}</h4>
                              <h5 className="text-sm">{experience.location}</h5>
                              <div
                                  className="!font-normal !text-sm text-white/75"
                                  dangerouslySetInnerHTML={{ __html: experience.description_html ?? "" }}
                              />
                          </VerticalTimelineElement>
                      ))
                    : "No experiences found"}
            </VerticalTimeline>
        </section>
    );
}
