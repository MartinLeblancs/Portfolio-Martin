import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "SFR Étiquette Unifiée",
    category: "Système Enterprise",
    description: "Centralisation et harmonisation des labels produits SFR pour améliorer la cohérence des données. Mise en place de tests unitaires et intégration continue avec Jenkins/Docker.",
    technologies: ["React.js", "JavaScript", "Node.js", "Jest", "Cypress", "Redux", "PostgreSQL", "Docker", "CI/CD", "Jenkins", "Atlassian", "Scrum", "Git", "REST API"],
    impact: "Déploiement national et meilleure fiabilité des données",
    gradient: "from-accent to-primary"
  },
  {
    title: "Site ESG Climate",
    category: "Data & Analytics - Amundi",
    description: "Développement complet d’un site web affichant l’impact climatique des entreprises. Back-end pour collecter et traiter les données via web scraping et front-end pour visualisation interactive.",
    technologies: ["React.js", "JavaScript", "Python", "Django", "Data Scraping", "REST API", "PostgreSQL", "Charts.js", "Atlassian", "Scrum", "Docker", "Git", "CI/CD"],
    impact: "Visualisation claire de l’impact climatique pour 50+ entreprises",
    gradient: "from-secondary to-accent"
  },
  {
    title: "Intégration Superset",
    category: "Data & Analytics - Amundi",
    description: "Intégration de Superset pour permettre la visualisation et l’analyse des données internes. Automatisation et optimisation des dashboards pour réduire le temps de génération des rapports.",
    technologies: ["Python", "Superset", "SQL", "TypeScript", "Data Analysis", "Automation", "Atlassian", "Scrum", "Docker", "CI/CD", "Git", "REST API"],
    impact: "-30% temps de génération des rapports",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    title: "Alto Studio",
    category: "Plateforme Interne - Amundi",
    description: "Développement et optimisation d’une plateforme interne regroupant divers outils pour les employés : visualisation de données, analyses data, notebooks Jupyter, VS Code en ligne, intégration de ChatGPT et pipelines de données.",
    technologies: ["React.js", "JavaScript", "Node.js", "Python", "S3", "JupyterHub", "Trino", "DeltaLake", "Spark", "Kafka", "Dagster", "Data Analysis", "Internal Tools", "Docker", "CI/CD", "Git", "Atlassian", "Scrum"],
    impact: "Facilitation de l’exploitation des données pour les équipes internes",
    gradient: "from-primary to-primary-dark"
  },
  {
    title: "IA Générative Musicale",
    category: "Innovation Sony CSL",
    description: "Développement d’une web app collaborative exploitant un modèle IA génératif pour la création musicale interactive. Collaboration avec les équipes R&D sur les algorithmes de génération et mixage audio.",
    technologies: ["React.js", "Python", "TensorFlow", "PyTorch", "Audio API", "Data Processing", "Atlassian", "Scrum", "Docker", "Git", "CI/CD", "Node.js", "REST API"],
    impact: "Projet lauréat SchooLab",
    gradient: "from-secondary to-secondary-glow"
  },
  {
    title: "StayAlive",
    category: "Application Mobile d'Urgence",
    description: "Application mobile Android/iOS de gestion des urgences médicales avec géolocalisation et alertes en temps réel. Centralisation et traitement des données utilisateurs santé pour priorisation des interventions.",
    technologies: ["React Native", "Next.js", "Node.js", "NestJS", "MongoDB", "GitHub Actions", "Maps API", "Real-time", "Firebase", "Geolocation", "Scrum", "Docker", "CI/CD", "Atlassian", "REST API"],
    impact: "100+ utilisateurs actifs",
    gradient: "from-primary to-primary-dark"
  },
  {
    title: "Acenstream",
    category: "Plateforme Interne ACENSI",
    description: "Plateforme de diffusion et partage de contenus multimédias pour les équipes internes. Gestion des droits et workflows optimisés pour 200+ collaborateurs.",
    technologies: ["React.js", "JavaScript", "Electron", "Node.js", "Express.js", "Sequelize", "Fastify", "Docker", "Jenkins", "Authentication", "Access Control", "Atlassian", "Scrum", "Git", "CI/CD", "REST API"],
    impact: "200+ collaborateurs",
    gradient: "from-primary to-secondary"
  },
  {
    title: "Acensigne",
    category: "Signature Électronique",
    description: "Outil interne de signature électronique sécurisée avec cryptographie avancée. Interface intuitive et workflow optimisé pour les processus métier.",
    technologies: ["React.js", "Node.js", "NestJS", "Jira API", "Azure", "Atlassian", "Workflow Management", "Scrum", "Cypress", "Jest", "Docker", "Git", "CI/CD", "REST API"],
    impact: "Déployé en production",
    gradient: "from-primary to-secondary"
  },
  {
    title: "VR Baseball",
    category: "Projet académique - VR",
    description: "Jeu de baseball immersif en réalité virtuelle avec Unity et C#. Gameplay multijoueur avec mécaniques réalistes et environnements 3D interactifs.",
    technologies: ["Unity", "C#", "VR Development", "3D Modeling", "Multiplayer", "Game Design"],
    impact: "Expérience VR interactive enrichie",
    gradient: "from-primary to-secondary"
  },
  {
    title: "R-Type",
    category: "Projet académique - C++",
    description: "Version multijoueur en réseau du jeu R-Type, développée avec un moteur de jeu en C++ modulaire et un protocole UDP optimisé.",
    technologies: ["Gestion de projet", "C++", "UDP", "Multithreading", "Game Engine", "Network Programming"],
    impact: "Jeu fluide et synchronisé en multijoueur",
    gradient: "from-primary to-secondary"
  }
];

const MAX_PROJECTS = 6;
const MAX_TECHS = 8;

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [expandedTechs, setExpandedTechs] = useState<{ [key: string]: boolean }>({});

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
  }, [showAllProjects]); // 👈 ajout de showAllProjects comme dépendance


  const toggleTechs = (title: string) => {
    setExpandedTechs((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-24 relative overflow-hidden pattern-circles"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />

      {/* Decorative zen elements */}
      <div className="absolute top-20 left-1/4 w-32 h-32 rounded-full border-2 border-primary/20 animate-rotate-slow" />
      <div
        className="absolute bottom-40 right-1/4 w-48 h-48 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: "reverse", animationDuration: "25s" }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 scroll-reveal">
          <h2 className="text-5xl font-bold mb-4 font-noto-jp">
            <span className="text-gradient">已完成的项目 — Projets Réalisés</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Des solutions innovantes pour des clients prestigieux et des projets
            d'envergure
          </p>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto transition-all duration-500"
        >
          {(showAllProjects ? projects : projects.slice(0, MAX_PROJECTS)).map(
            (project) => (
              <div
                key={project.title}
                className="scroll-reveal glass-card rounded-2xl overflow-hidden hover-glow group transition-all duration-500 hover:scale-105 hover:-translate-y-2"
              >
                {/* Gradient header with animation */}
                <div
                  className={`h-2 bg-gradient-to-r ${project.gradient} group-hover:h-3 transition-all duration-300`}
                />

                <div className="p-6">
                  {/* Category badge */}
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
                    {(expandedTechs[project.title]
                      ? project.technologies
                      : project.technologies.slice(0, MAX_TECHS)
                    ).map((tech, idx) => (
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
                      {expandedTechs[project.title] ? (
                        <>
                          Voir moins <ChevronUp className="ml-1 h-3 w-3" />
                        </>
                      ) : (
                        <>
                          Voir plus <ChevronDown className="ml-1 h-3 w-3" />
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
            )
          )}
        </div>

        {/* Voir plus/moins projets */}
        {projects.length > MAX_PROJECTS && (
          <div className="text-center mt-12">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setShowAllProjects((prev) => !prev)}
              className="border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              {showAllProjects ? "Voir moins de projets" : "Voir plus de projets"}
            </Button>
          </div>
        )}

        {/* GitHub CTA */}
        <div className="text-center mt-16 scroll-reveal">
          <p className="text-muted-foreground mb-6">
            Découvrez plus de projets sur mon GitHub
          </p>
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
              Voir tous mes projets
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
