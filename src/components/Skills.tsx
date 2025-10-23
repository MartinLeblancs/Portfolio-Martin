"use client";

import { useEffect, useRef, useState } from "react";
import * as Icons from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/i18n";

const MAX_SKILLS = 8;

const Skills = () => {
  const { messages } = useI18n();
  if (!messages.skills) return null;
  const t = messages.skills;
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>({});

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

  const categories = t.categories as Record<string, any>;
  const stats = t.stats || [];

  const categoryEntries = Object.entries(categories);
  console.log(categoryEntries)
  const visibleCategories = showAll ? categoryEntries : categoryEntries.slice(0, 6);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-circles opacity-30" />

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-primary/10 animate-rotate-slow" />
      <div
        className="absolute bottom-20 right-20 w-60 h-60 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "30s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Title */}
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">{t.title || "Compétences"}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t.subtitle || ""}</p>
        </div>

        {/* Skills grid */}
        <div className="grid gap-8 max-w-7xl mx-auto grid-cols-[repeat(auto-fit,minmax(300px,1fr))] justify-items-center transition-all duration-500">
          {visibleCategories.map(([key, category], index) => {
            const Icon = Icons[category.icon] || Icons.Code;
            return (
              <div
                key={key}
                className="scroll-reveal glass-card p-8 rounded-2xl hover-glow group cursor-default transition-all duration-500 hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
                >
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary group-hover:animate-bounce-slow" />
                  </div>
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors font-noto-jp">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{category.description}</p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {(expandedSkills[key] ? category.skills : category.skills.slice(0, MAX_SKILLS)).map((skill, idx) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-muted/50 text-xs rounded-full text-foreground/80 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                {category.skills.length > MAX_SKILLS && (
                  <button
                    onClick={() => setExpandedSkills((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className="flex items-center text-xs text-primary hover:underline"
                  >
                    {expandedSkills[key] ? (
                      <>
                        {t.showMore?.less || "Voir moins"} <Icons.ChevronUp className="ml-1 h-3 w-3" />
                      </>
                    ) : (
                      <>
                        {t.showMore?.more || "Voir plus"} <Icons.ChevronDown className="ml-1 h-3 w-3" />
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Show more / show less button */}
        {categoryEntries.length > 6 && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAll(!showAll)}
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              {showAll ? t.showMore?.less || "Voir moins" : t.showMore?.more || "Voir plus"}
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="scroll-reveal glass-card p-6 rounded-xl text-center hover-glow group cursor-default"
            >
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
