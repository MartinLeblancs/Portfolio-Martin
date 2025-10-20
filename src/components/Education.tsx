"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, MapPin } from "lucide-react";

interface EducationItem {
  school: string;
  degree: string;
  period: string;
  location: string;
  description?: string;
}

interface LanguageItem {
  name: string;
  level: string;
  detail?: string;
}

interface SpecializationItem {
  text: string;
}

interface EducationMessages {
  title: string;
  educationTitle: string;
  languagesTitle: string;
  specializationsTitle: string;
  education: { [key: string]: EducationItem };
  languages: { [key: string]: LanguageItem };
  specializations: SpecializationItem[];
}

interface EducationProps {
  translations: EducationMessages;
}

const Education = ({ translations }: EducationProps) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const educationKeys = Object.keys(translations.education);
  const languageKeys = Object.keys(translations.languages);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2 }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" className="min-h-screen py-24 px-6 bg-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-black text-center mb-16">
          <span className="bg-gradient-accent bg-clip-text text-transparent">
            {translations.title}
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Education */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-primary mb-8">{translations.educationTitle}</h3>
            {educationKeys.map((key, index) => {
              const item = translations.education[key];
              return (
                <div
                  key={key}
                  ref={(el) => (itemRefs.current[index] = el)}
                  data-index={index}
                  className={`bg-card border border-border rounded-xl p-6 transition-all duration-700 hover:shadow-crimson hover:scale-[1.02] ${
                    visibleItems.has(index) ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-foreground mb-1">{item.degree}</h4>
                      <p className="text-accent font-semibold mb-2">{item.school}</p>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <span>{item.period}</span>
                        <span>•</span>
                        <MapPin className="w-4 h-4" />
                        <span>{item.location}</span>
                      </div>
                      {item.description && (
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Languages */}
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-secondary mb-8">{translations.languagesTitle}</h3>
            {languageKeys.map((key, index) => {
              const lang = translations.languages[key];
              return (
                <div
                  key={key}
                  ref={(el) => (itemRefs.current[educationKeys.length + index] = el)}
                  data-index={educationKeys.length + index}
                  className={`bg-card border border-border rounded-xl p-6 transition-all duration-700 hover:shadow-gold hover:scale-[1.02] ${
                    visibleItems.has(educationKeys.length + index)
                      ? "opacity-100 translate-x-0"
                      : "opacity-0 translate-x-10"
                  }`}
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold text-foreground">{lang.name}</h4>
                    {lang.detail && (
                      <span className="px-3 py-1 bg-accent/20 text-primary text-sm rounded-full">
                        {lang.detail}
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground">{lang.level}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Specializations */}
        <div className="bg-card border border-border rounded-xl p-8 shadow-elevated">
          <h3 className="text-3xl font-bold text-center mb-8">{translations.specializationsTitle}</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {translations.specializations.map((spec, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <span className="text-foreground">{spec.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
