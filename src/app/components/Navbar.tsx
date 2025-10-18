"use client";
import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const links = ["Home", "About", "Student", "Experience", "Contact"];

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md transition-colors duration-500 ${scrolled
                ? "bg-[#0f0f0f]/80 border-b border-[#e63946]/50"
                : "bg-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo stylisé */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        textShadow: ["0 0 8px #e63946", "0 0 16px #e63946", "0 0 8px #e63946"],
                        color: ["#e63946", "#ff4c4c", "#e63946"],
                    }}
                    transition={{ repeat: Infinity, repeatType: "loop", duration: 3 }}
                    className="text-2xl font-extrabold cursor-pointer select-none text-[#e63946] drop-shadow-lg"
                >
                    Martin <span className="text-white/80">LEBLANCS</span>
                </motion.div>

                {/* Liens animés */}
                <div className="flex gap-8">
                    {links.map((link, i) => (
                        <motion.div
                            key={link}
                            whileHover={{
                                scale: 1.2,
                                color: "#e63946",
                                textShadow: "0 0 12px #e63946",
                            }}
                            animate={{
                                scale: [1, 1.05, 1],
                                textShadow: ["0 0 0px #e63946", "0 0 8px #e63946", "0 0 0px #e63946"],
                            }}
                            transition={{ repeat: Infinity, repeatType: "loop", duration: 4, delay: i * 0.2 }}
                            className="text-white/80 cursor-pointer"
                        >
                            <Link to={link.toLowerCase()} smooth duration={500}>
                                {link}
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </nav>
    );
}
