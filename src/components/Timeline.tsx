"use client";

import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n";

interface Achievement {
  text: string;
  link?: string;
}

interface ExperienceData {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements?: Achievement[];
}

interface TimelineProps { }

const experiences = [
  { key: "acensi", type: "work" },
  { key: "amundi", type: "work" },
  { key: "stayalive", type: "project" },
  { key: "sony-ca-schoolab", type: "project" },
  { key: "agripower-france", type: "work" },
  { key: "epitech", type: "education" },
  { key: "beijing", type: "education" },
];

const Timeline = ({ }: TimelineProps) => {
  const { messages } = useI18n();
  if (!messages.timeline) return null;
  const t = messages.timeline;
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [showAll]);

  const displayedExperiences = showAll
    ? experiences
    : experiences.filter((exp) =>
      ["epitech", "beijing", "amundi", "acensi"].includes(exp.key)
    );

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">{t.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent animate-shimmer" />

          {displayedExperiences.map((exp, index) => {
            const expData = t[exp.key] as ExperienceData;
            if (!expData) return null;

            const Icon =
              exp.type === "work"
                ? Briefcase
                : exp.type === "project"
                  ? Code
                  : GraduationCap;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="scroll-reveal relative mb-16">
                <div
                  className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? "md:flex-row-reverse" : ""
                    }`}
                >
                  <div
                    className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"
                      } pl-20 md:pl-0`}
                  >
                    <div className="glass-card p-6 rounded-2xl hover-glow group transition-all duration-500 hover:scale-105">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors font-noto-jp">
                          {expData.title}
                        </h3>
                        <p className="text-lg text-secondary font-semibold mb-2">
                          {expData.company}
                        </p>
                        <p className="text-sm text-muted-foreground italic mb-3">
                          {expData.description}
                        </p>

                        <div
                          className={`flex flex-wrap gap-3 text-sm text-muted-foreground ${isEven ? "md:justify-end" : "md:justify-start"
                            }`}
                        >
                          <span className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Calendar className="h-4 w-4" />
                            {expData.period}
                          </span>
                          <span className="flex items-center gap-1 hover:text-secondary transition-colors">
                            <MapPin className="h-4 w-4" />
                            {expData.location}
                          </span>
                        </div>
                      </div>

                      <ul
                        className={`space-y-2 flex flex-col ${isEven ? "text-right items-end" : "text-left items-start"
                          }`}
                      >
                        {expData.achievements?.map((ach, i) => (
                          <li
                            key={i}
                            className="text-sm text-muted-foreground flex flex-col gap-1"
                          >
                            <span
                              className={`flex items-center gap-2 ${isEven ? "flex-row-reverse" : "flex-row"
                                }`}
                            >
                              <span className="text-secondary mt-1 animate-pulse-slow">
                                ▸
                              </span>
                              <span>{ach.text}</span>
                            </span>
                            {ach.link && (
                              <span
                                className={`ml-6 text-primary hover:underline ${isEven ? "ml-0 mr-6" : ""
                                  }`}
                              >
                                <a
                                  href={ach.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  {t.viewProject || "Voir projet"}
                                </a>
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="relative flex justify-center md:justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-1 group hover:scale-110 hover:rotate-12 transition-all duration-300 zen-circle">
                      <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-24">
          <Button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            {showAll ? t.showLess || "Réduire" : t.showAll || "Tout voir"}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
