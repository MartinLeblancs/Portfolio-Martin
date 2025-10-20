"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Code, Database, Shield, Cloud, Smartphone, Brain } from "lucide-react";

const skillCategories = [
  { key: "fullstack", icon: Code, color: "from-primary to-primary-glow", skills: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Node.js"] },
  { key: "mobile", icon: Smartphone, color: "from-secondary to-secondary-glow", skills: ["React Native", "Flutter", "Dart", "Mobile-first design"] },
  { key: "ia", icon: Brain, color: "from-accent-dark to-secondary", skills: ["TensorFlow", "PyTorch", "Python", "Data Engineering", "ML"] },
  { key: "cybersecurity", icon: Shield, color: "from-primary-dark to-primary", skills: ["Sécurité Web", "DevSecOps", "Audit", "Best Practices"] },
  { key: "cloud", icon: Cloud, color: "from-secondary to-accent-dark", skills: ["Docker", "AWS", "Azure", "Jenkins", "GitHub Actions", "Kafka"] },
  { key: "database", icon: Database, color: "from-accent to-primary", skills: ["SQL", "PostgreSQL", "MongoDB", "Redis", "ORM"] }
];

const Skills = () => {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLElement>(null);

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
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-circles opacity-30" />

      {/* Decorative zen circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-primary/10 animate-rotate-slow" />
      <div
        className="absolute bottom-20 right-20 w-60 h-60 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "30s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">{t("title")}</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.key}
                className="scroll-reveal glass-card p-8 rounded-2xl hover-glow group cursor-default transition-all duration-500 hover:scale-105"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {/* Icon with gradient */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${category.color} p-0.5 mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <div className="w-full h-full bg-card rounded-xl flex items-center justify-center">
                    <Icon className="h-8 w-8 text-primary group-hover:animate-bounce-slow" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-semibold mb-3 group-hover:text-primary transition-colors font-noto-jp">
                  {t(`categories.${category.key}.title`)}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">{t(`categories.${category.key}.description`)}</p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, idx) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-muted/50 text-xs rounded-full text-foreground/80 border border-border/30 hover:border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-default"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto">
          {[
            { key: "technologies", value: "50+" },
            { key: "experience", value: "2+" },
            { key: "projects", value: "30+" },
            { key: "languages", value: "4" }
          ].map((stat) => (
            <div
              key={stat.key}
              className="scroll-reveal glass-card p-6 rounded-xl text-center hover-glow group cursor-default"
            >
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{t(`stats.${stat.key}`)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
