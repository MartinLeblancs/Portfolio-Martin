import { useEffect, useRef } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Ingénieur Développeur Fullstack",
    company: "ACENSI",
    location: "Paris, France",
    period: "Oct 2024 - Oct 2025",
    description: "Conseil en technologies & transformation digitale",
    achievements: [
      "Déploiement projet SFR Étiquette unifiée",
      "Encadrement de 2 alternants",
      "Développement Acensigne (signature électronique)",
      "Acenstream pour 200+ collaborateurs"
    ]
  },
  {
    type: "work",
    title: "Développeur Fullstack & Data",
    company: "AMUNDI",
    location: "Paris, France",
    period: "Jan 2023 - Août 2023",
    description: "Leader européen de la gestion d'actifs",
    achievements: [
      "Automatisation Python & intégration IA (ChatGPT)",
      "Optimisation des rapports ESG (-30% temps)",
      "Développement Alto Studio",
      "Site web d'analyse impact climatique"
    ]
  },
  {
    type: "work",
    title: "Chef de Projet",
    company: "Sony CSL & Crédit Agricole",
    location: "Paris, France",
    period: "2022 - 2023",
    description: "Projet SchooLab d'innovation technologique",
    achievements: [
      "Application web collaborative avec IA générative musicale",
      "Front-end React + API IA (Python/TensorFlow)",
      "Collaboration Sony Computer Science Laboratories",
      "Présentation Demo Day SchooLab"
    ]
  },
  {
    type: "education",
    title: "EPITECH Paris",
    company: "Master 2 - Expert en technologies de l'information",
    location: "Paris, France",
    period: "2020 - 2025",
    description: "Diplôme visé par le ministère de l'Enseignement Supérieur",
    achievements: [
      "Expert en ingénierie logicielle",
      "Projet innovant StayAlive (100+ utilisateurs)",
      "Spécialisations multiples: Fullstack, IA, Cybersécurité"
    ]
  },
  {
    type: "education",
    title: "Beijing Jiaotong University",
    company: "Échange universitaire",
    location: "Pékin, Chine",
    period: "2023 - 2024",
    description: "Master 1 - Expérience internationale",
    achievements: [
      "Immersion culturelle et académique",
      "Apprentissage du Mandarin (HSK 3)",
      "Collaboration multiculturelle"
    ]
  }
];

const Timeline = () => {
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
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial opacity-50" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial opacity-40" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">我的经历 — Mon Parcours</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Une trajectoire marquée par l'innovation et l'excellence technique
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Timeline line with gradient */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent animate-shimmer"
            style={{ backgroundSize: '200% 200%' }} />

          {experiences.map((exp, index) => {
            const isWork = exp.type === "work";
            const Icon = isWork ? Briefcase : GraduationCap;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className="scroll-reveal relative mb-16"
              >
                <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? 'md:flex-row-reverse' : ''
                  }`}>
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? 'md:text-right' : 'md:text-left'} pl-20 md:pl-0`}>
                    <div className="glass-card p-6 rounded-2xl hover-glow group transition-all duration-500 hover:scale-105">
                      {/* Header */}
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors font-noto-jp">
                          {exp.title}
                        </h3>
                        <p className="text-lg text-secondary font-semibold mb-2">
                          {exp.company}
                        </p>
                        <p className="text-sm text-muted-foreground italic mb-3">
                          {exp.description}
                        </p>

                        {/* Meta info */}
                        <div className={`flex flex-wrap gap-3 text-sm text-muted-foreground ${isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}>
                          <span className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Calendar className="h-4 w-4" />
                            {exp.period}
                          </span>
                          <span className="flex items-center gap-1 hover:text-secondary transition-colors">
                            <MapPin className="h-4 w-4" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className={`space-y-2 ${isEven ? 'md:items-end' : 'md:items-start'} flex flex-col`}>
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className={`text-sm text-muted-foreground flex items-start gap-2 transition-colors hover:text-foreground ${isEven ? 'flex-row-reverse text-right' : ''}`}
                          >
                            <span className="text-secondary mt-1 animate-pulse-slow">▸</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                    </div>
                  </div>

                  {/* Timeline marker with enhanced animation */}
                  <div className="relative flex justify-center md:justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary p-1 group hover:scale-110 hover:rotate-12 transition-all duration-300 zen-circle">
                      <div className="w-full h-full bg-card rounded-full flex items-center justify-center">
                        <Icon className="h-7 w-7 text-primary group-hover:text-secondary transition-colors" />
                      </div>
                    </div>
                  </div>


                  {/* Spacer for even layout */}
                  <div className="flex-1 hidden md:block" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
