"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectData {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  impact: string;
  gradient: string;
}

interface ProjectsMessages {
  title: string;
  subtitle: string;
  seeMore: string;
  seeLess: string;
  viewProject: string;
  seeAllOnGitHub: string;
  githubCTA: string;
  items: { [key: string]: ProjectData };
}

interface ProjectsProps {
  translations: ProjectsMessages;
}

const MAX_PROJECTS = 6;
const MAX_TECHS = 8;

const Projects = ({ translations }: ProjectsProps) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expandedTechs, setExpandedTechs] = useState<{ [key: string]: boolean }>(
    {}
  );

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
  }, [showAllProjects]);

  const toggleTechs = (title: string) => {
    setExpandedTechs((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const projectKeys = Object.keys(translations.items);
  const displayedKeys = showAllProjects
    ? projectKeys
    : projectKeys.slice(0, MAX_PROJECTS);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden pattern-circles"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Decorative elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full border-2 border-primary/20 animate-rotate-slow" />
      <div
        className="absolute bottom-40 right-1/4 w-48 h-48 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">{translations.title}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {translations.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-500">
          {displayedKeys.map((key) => {
            const project = translations.items[key];
            const isTechExpanded = expandedTechs[project.title] || false;

            return (
              <div
                key={project.title}
                className="scroll-reveal glass-card rounded-2xl overflow-hidden hover-glow group transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Gradient header */}
                <div
                  className={`h-2 bg-gradient-to-r ${project.gradient} group-hover:h-3 transition-all duration-300`}
                />

                <div className="p-6">
                  {/* Category */}
                  <div className="inline-block px-3 py-1 bg-muted/50 rounded-full text-xs text-secondary mb-4 group-hover:bg-secondary/20 group-hover:text-secondary transition-all duration-300 border border-secondary/20">
                    {project.category}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors font-noto-jp">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {(isTechExpanded ? project.technologies : project.technologies.slice(0, MAX_TECHS)).map((tech, idx) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-xs rounded border border-primary/20 text-primary hover:bg-primary/20 hover:border-primary/40 transition-all duration-300 cursor-default wave-animation"
                        style={{ animationDelay: `${idx * 0.1}s` }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {project.technologies.length > MAX_TECHS && (
                    <button
                      onClick={() => toggleTechs(project.title)}
                      className="flex items-center text-xs text-primary hover:underline"
                    >
                      {isTechExpanded ? (
                        <>
                          {translations.seeLess} <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          {translations.seeMore} <ChevronDown className="ml-1 h-3 w-3" />
                        </>
                      )}
                    </button>
                  )}

                  {/* Impact */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="text-sm font-semibold text-secondary group-hover:scale-105 transition-transform duration-300">
                      {project.impact}
                    </span>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-4 w-4 text-primary animate-bounce-slow" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Toggle projects */}
        {projectKeys.length > MAX_PROJECTS && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              {showAllProjects ? translations.seeLess : translations.seeMore}
            </Button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16 scroll-reveal">
          <p className="text-muted-foreground mb-6">{translations.githubCTA}</p>
          <Button
            size="lg"
            variant="outline"
            className="border-primary/50 hover:bg-primary/10 hover:border-primary group relative overflow-hidden zen-circle"
            asChild
          >
            <a
              href="https://github.com/MartinLeblancs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
              {translations.seeAllOnGitHub}
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
