"use client";
import { motion } from "framer-motion";
import { FaLaptopCode, FaMobileAlt, FaRobot, FaShieldAlt } from "react-icons/fa";

const benefits = [
    {
        icon: <FaLaptopCode size={32} />,
        title: "Web Development",
        description: "Building responsive and modern web applications with clean code.",
    },
    {
        icon: <FaMobileAlt size={32} />,
        title: "Mobile Apps",
        description: "Creating high-performance mobile applications for iOS and Android.",
    },
    {
        icon: <FaRobot size={32} />,
        title: "AI & Data",
        description: "Leveraging AI and data science to deliver intelligent solutions.",
    },
    {
        icon: <FaShieldAlt size={32} />,
        title: "Cybersecurity",
        description: "Ensuring applications are secure and resilient against threats.",
    },
];

export default function AboutSection() {
    return (
        <section id="about" className="min-h-screen flex flex-col items-center justify-center p-8 text-white bg-black">
            <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-4xl font-semibold mb-12"
            >
                About Me
            </motion.h2>

            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-lg max-w-3xl text-center mb-16"
            >
                Passionate fullstack developer with experience in web, mobile, AI, and cybersecurity.
                I love building interactive experiences and exploring new technologies.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
                {benefits.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 * index, duration: 0.8 }}
                        className="bg-white/10 backdrop-blur-md p-6 rounded-2xl flex flex-col items-center text-center hover:bg-red-600/20 hover:scale-105 transition-all duration-300"
                    >
                        <div className="mb-4 text-red-600">{item.icon}</div>
                        <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-white/80">{item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
