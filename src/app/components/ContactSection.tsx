"use client";
import { motion } from "framer-motion";

export default function ContactSection() {
    return (
        <section
            id="contact"
            className="min-h-screen flex flex-col items-center justify-center p-8 text-white"
        >
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-semibold mb-6"
            >
                Contact
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-lg mb-4 text-center max-w-2xl"
            >
                You can reach me via email at <span className="text-teal-400">martin.leblancs@epitech.eu</span>
                or check my LinkedIn / GitHub profiles below.
            </motion.p>

            <div className="flex gap-6">
                <a href="https://www.linkedin.com/in/martin-leblancs7a21542097a2154209/" target="_blank" className="text-teal-400 hover:underline">LinkedIn</a>
                <a href="https://github.com/MartinLeblancs" target="_blank" className="text-teal-400 hover:underline">GitHub</a>
            </div>
        </section>
    );
}
