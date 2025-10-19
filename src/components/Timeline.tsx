import { useEffect, useRef, useState } from "react";
import { Briefcase, GraduationCap, MapPin, Calendar, Code } from "lucide-react";

type Achievement = { text: string; link?: string };

interface Experience {
  type: "work" | "education" | "project";
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: Achievement[];
}

const experiences: Experience[] = [
  {
    type: "work",
    title: "Ingénieur Développeur Fullstack",
    company: "ACENSI",
    location: "Paris, France",
    period: "Oct 2024 - Oct 2025",
    description: "Conseil en technologies & transformation digitale pour clients grands comptes",
    achievements: [
      { text: "Déploiement du projet SFR Étiquette unifiée pour centraliser et harmoniser les labels" },
      { text: "Développement d'Acensigne, outil interne de signature électronique sécurisée" },
      { text: "Acenstream : plateforme interne de diffusion et partage de contenus" },
      { text: "Mise en place de tests unitaires et d’intégration (Jest, Cypress) et automatisation du déploiement via Jenkins/Docker" }
    ]
  },
  {
    type: "work",
    title: "Développeur Fullstack & Data",
    company: "AMUNDI",
    location: "Paris, France",
    period: "Jan 2023 - Août 2023",
    description: "Leader européen de la gestion d'actifs, filiale Crédit Agricole",
    achievements: [
      { text: "Automatisation via Python et intégration d'IA pour la recherche documentaire et génération d'analyses" },
      { text: "Maintenance et optimisation des plateformes d’analyse financière et ESG" },
      { text: "Développement d'Alto Studio, outil interne pour exploiter et visualiser les données ESG" },
      { text: "Création d'un site web pour recenser et analyser l’impact climatique des entreprises" },
      { text: "Optimisation d’un outil de reporting réduisant de 30% le temps de génération des rapports" }
    ]
  },
  {
    type: "work",
    title: "Chef de Projet - SchooLab / Crédit Agricole",
    company: "Crédit Agricole / SchooLab",
    location: "Paris, France",
    period: "2022 - 2023",
    description: "Projet d'innovation technologique et attractivité jeunes talents",
    achievements: [
      { text: "Lauréat du projet SchooLab d’innovation technologique et IA" },
      { text: "Mise en œuvre de solutions IT pour attirer les jeunes talents" },
      { text: "Présentation des prototypes lors d’un Demo Day organisé par SchooLab" }
    ]
  },
  {
    type: "project",
    title: "Chef de Projets Innovants",
    company: "Sony CSL & Crédit Agricole / SchooLab",
    location: "Paris, France",
    period: "2022 - 2023",
    description: "Projet SchooLab d'innovation technologique",
    achievements: [
      { text: "Développement d'une application web collaborative exploitant un modèle IA générative pour la création musicale interactive", link: "https://pianoto.cslmusic.team" },
      { text: "Conception du front-end React et intégration API IA (Python / TensorFlow)" },
      { text: "Collaboration avec des ingénieurs R&D de Sony Computer Science Laboratories" },
      { text: "Collaboration avec Crédit Agricole & SchooLab sur l’attractivité des jeunes talents de la tech" },
      { text: "Présentation des prototypes lors d’un Demo Day SchooLab" }
    ]
  },
  {
    type: "project",
    title: "StayAlive",
    company: "EPITECH Innovative Project",
    location: "Paris, France",
    period: "Sept 2023 - Févr 2025",
    description: "Application mobile d'urgence médicale permettant à une communauté vérifiée de secouristes d'intervenir rapidement",
    achievements: [
      { text: "Développement complet de l’application mobile (React Native) et backend (Node.js)" },
      { text: "Pilotage du projet et coordination d'une équipe pour 100+ utilisateurs" },
      { text: "Implémentation de fonctionnalités : disponibilité utilisateur, alertes urgences, géolocalisation, documents, signalement de bugs" },
      { text: "Mise en place de tests unitaires et optimisation de la performance" }
    ]
  },
  {
    type: "education",
    title: "EPITECH Paris",
    company: "Master 2 - Expert en technologies de l'information",
    location: "Paris, France",
    period: "2020 - 2025",
    description: "Diplôme visé par le ministère de l’Enseignement Supérieur",
    achievements: [
      { text: "Expert en ingénierie logicielle" },
      { text: "Projet innovant StayAlive (application mobile d'urgence, 100+ utilisateurs)" },
      { text: "Spécialisations multiples : Fullstack, IA, Cybersécurité" }
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
      { text: "Immersion culturelle et académique" },
      { text: "Apprentissage du Mandarin (HSK 3)" },
      { text: "Collaboration multiculturelle" }
    ]
  }
];

const Timeline = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAll, setShowAll] = useState(false);

  // IntersectionObserver pour les éléments visibles
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll(".scroll-reveal");
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [showAll]);

  // Filtrage pour la timeline par défaut
  const displayedExperiences = showAll
    ? experiences
    : experiences.filter(exp =>
      ["EPITECH Paris", "Beijing Jiaotong University", "AMUNDI", "ACENSI"].includes(exp.title)
      || ["EPITECH Paris", "Beijing Jiaotong University", "AMUNDI", "ACENSI"].includes(exp.company)
    );

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />

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
          {/* Timeline vertical */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent animate-shimmer" style={{ backgroundSize: "200% 200%" }} />

          {displayedExperiences.map((exp, index) => {
            const isWork = exp.type === "work";
            const isProject = exp.type === "project";
            const Icon = isWork ? Briefcase : isProject ? Code : GraduationCap;
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="scroll-reveal relative mb-16">
                <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? "md:flex-row-reverse" : ""}`}>
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"} pl-20 md:pl-0`}>
                    <div className="glass-card p-6 rounded-2xl hover-glow group transition-all duration-500 hover:scale-105">
                      <div className="mb-4">
                        <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors font-noto-jp">{exp.title}</h3>
                        <p className="text-lg text-secondary font-semibold mb-2">{exp.company}</p>
                        <p className="text-sm text-muted-foreground italic mb-3">{exp.description}</p>

                        <div className={`flex flex-wrap gap-3 text-sm text-muted-foreground ${isEven ? "md:justify-end" : "md:justify-start"}`}>
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

                      <ul className={`space-y-2 ${isEven ? "md:items-end" : "md:items-start"} flex flex-col`}>
                        {exp.achievements.map((ach, i) => (
                          <li key={i} className={`text-sm text-muted-foreground flex flex-col items-start gap-1 transition-colors hover:text-foreground ${isEven ? "md:items-end text-right" : ""}`}>
                            <span className="flex items-start gap-2">
                              <span className="text-secondary mt-1 animate-pulse-slow">▸</span>
                              <span>{ach.text}</span>
                            </span>
                            {ach.link && (
                              <span className="ml-6 text-primary hover:underline">
                                <a href={ach.link} target="_blank" rel="noopener noreferrer">Voir le projet</a>
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

          {/* Bouton placé en dessous de la timeline */}


        </div>
        <div className="text-center mt-24">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            {showAll ? "Voir moins" : "Voir toute la timeline"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
