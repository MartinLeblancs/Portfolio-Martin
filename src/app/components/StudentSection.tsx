"use client";
import { motion } from "framer-motion";

export default function StudentSection() {
    const students = [
        {
            country: "🇫🇷",
            school: "EPITECH Paris",
            description: "Dynamic learning environment focused on practical experience and problem-solving.",
        },
        {
            country: "🇨🇳",
            school: "Beijing Jiaotong University",
            description: "Exchange program with transformative academic and cultural experiences.",
        },
    ];

    return (
        <section
            id="student"
            className="min-h-screen flex flex-col items-center justify-center p-8 text-white"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-semibold mb-8"
            >
                As a Student
            </motion.h2>

            <div className="flex flex-col gap-6 max-w-4xl">
                {students.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 * i, duration: 0.8 }}
                        className="p-6 bg-gray-700 rounded-xl shadow-lg"
                    >
                        <h3 className="text-2xl font-bold mb-2">{s.country} {s.school}</h3>
                        <p className="text-white/80">{s.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
