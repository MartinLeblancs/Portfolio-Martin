"use client";
import { motion } from "framer-motion";

const experiences = [
    {
        title: "Chef de Projet – Sony CSL, Crédit Agricole & SchooLab",
        period: "2022 – 2023",
        description: "Développement d'une application web collaborative avec IA générative musicale.",
    },
    {
        title: "Chef de Projet & Développeur Mobile – StayAlive",
        period: "2023 – 2025",
        description: "Application mobile Android Urgence médicale, coordination pour 100+ utilisateurs.",
    },
    {
        title: "Fullstack & Data Développeur – Amundi",
        period: "Jan 2023 – Août 2023",
        description: "Automatisation via Python, intégration IA, visualisation et analyse de données ESG.",
    },
    {
        title: "Fullstack Développeur Ingénieur – Acensi",
        period: "Oct 2024 – Oct 2025",
        description: "Déploiement projets SFR, signature électronique sécurisée, plateforme de diffusion interne.",
    },
];

export default function ExperienceSection() {
    return (
        <section
            id="experience"
            className="min-h-screen flex flex-col items-center justify-center p-8 text-white"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-semibold mb-8"
            >
                Experiences
            </motion.h2>

            <div className="flex flex-col gap-6 max-w-4xl">
                {experiences.map((exp, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * i, duration: 0.8 }}
                        className="p-6 bg-gray-800 rounded-xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold">{exp.title}</h3>
                        <p className="text-sm text-teal-400 mb-2">{exp.period}</p>
                        <p className="text-white/80">{exp.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
