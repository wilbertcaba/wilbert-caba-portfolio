"use client";

import Image from "next/image";
import SectionHeading from "./section-heading";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { useSectionInView } from "@/lib/hooks";
import type { ExperienceWithMedia } from "@/lib/cms";
import Eyebrow from "./eyebrow";

export default function Experience({ data }: { data: ExperienceWithMedia[] }) {
    const { ref } = useSectionInView("about", 0.3);

    return (
        <section ref={ref} id="experience" className="mb-28 w-full sm:scroll-m-28">
            <Eyebrow size="lg" className="text-center text-primary">
                [ Career Timeline ]
            </Eyebrow>
            <SectionHeading alignment="center">
                Decades in <span className="text-stroke-primary">The Craft</span>
            </SectionHeading>
            <VerticalTimeline lineColor="">
                {data
                    ? data.map((experience) => (
                          <VerticalTimelineElement
                              key={experience.id}
                              contentStyle={{
                                  background: "rgb(22,22,22)",
                                  textAlign: "left",
                                  borderBottom: "2px solid #2fd38e",
                                  padding: "16px",
                                  borderRadius: "16px",
                                  position: "relative",
                                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                                  backgroundImage:
                                      "linear-gradient(127deg, rgb(255 255 255 / 14%), rgba(255, 255, 255, 0.02) )",

                                  backdropFilter: "blur(24px) saturate(180%)",
                                  WebkitBackdropFilter: "blur(24px) saturate(180%)",
                                  border: "1px solid rgba(255, 255, 255, 0.1)",
                                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
                                  willChange: "transform",
                                  transform: "translateZ(0)",
                              }}
                              contentArrowStyle={{
                                  borderRight: "0.4rem solid #2fd38e",
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
                          >
                              <p className="font-eyebrow !mt-0 text-sm uppercase tracking-widest text-neutral-400 text-primary">
                                  {experience.title}
                              </p>
                              <h3 className="text-2xl font-semibold capitalize">{experience.company}</h3>
                              <h5 className="text-sm">{experience.location}</h5>
                              <div
                                  className="mt-4 border-t border-neutral-700 text-sm"
                                  dangerouslySetInnerHTML={{ __html: experience.description_html ?? "" }}
                              />
                          </VerticalTimelineElement>
                      ))
                    : "No experiences found"}
            </VerticalTimeline>
        </section>
    );
}
