import { useEffect, useRef } from "react";
import { Code, Database, Shield, Cloud, Smartphone, Brain } from "lucide-react";

const skillCategories = [
  {
    icon: Code,
    title: "Développement Fullstack",
    description: "Création d'applications web et mobile performantes",
    skills: ["React.js", "Next.js", "Vue.js", "Angular", "TypeScript", "Node.js"],
    color: "from-primary to-primary-glow"
  },
  {
    icon: Smartphone,
    title: "Mobile & Cross-platform",
    description: "Applications natives et hybrides iOS/Android",
    skills: ["React Native", "Flutter", "Dart", "Mobile-first design"],
    color: "from-secondary to-secondary-glow"
  },
  {
    icon: Brain,
    title: "IA & Data Science",
    description: "Intelligence artificielle et traitement de données",
    skills: ["TensorFlow", "PyTorch", "Python", "Data Engineering", "ML"],
    color: "from-accent-dark to-secondary"
  },
  {
    icon: Shield,
    title: "Cybersécurité",
    description: "Sécurité applicative et infrastructure",
    skills: ["Sécurité Web", "DevSecOps", "Audit", "Best Practices"],
    color: "from-primary-dark to-primary"
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description: "Infrastructure moderne et automatisation",
    skills: ["Docker", "AWS", "Azure", "Jenkins", "GitHub Actions", "Kafka"],
    color: "from-secondary to-accent-dark"
  },
  {
    icon: Database,
    title: "Bases de données",
    description: "Conception et optimisation de données",
    skills: ["SQL", "PostgreSQL", "MongoDB", "Redis", "ORM"],
    color: "from-accent to-primary"
  }
];

const Skills = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.scroll-reveal');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 pattern-circles opacity-30" />

      {/* Decorative zen circles */}
      <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-primary/10 animate-rotate-slow" />
      <div className="absolute bottom-20 right-20 w-60 h-60 rounded-full border border-secondary/10 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">技术专长 — Expertises Techniques</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une palette complète de compétences pour transformer vos idées en réalité digitale
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
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
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
                  {category.description}
                </p>

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
            { value: "20+", label: "Technologies maîtrisées" },
            { value: "5+", label: "Années d'expérience" },
            { value: "10+", label: "Projets réalisés" },
            { value: "3", label: "Langues parlées" }
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="scroll-reveal glass-card p-6 rounded-xl text-center hover-glow group cursor-default"
            >
              <div className="text-4xl font-bold text-gradient mb-2 group-hover:scale-110 transition-transform duration-300">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
