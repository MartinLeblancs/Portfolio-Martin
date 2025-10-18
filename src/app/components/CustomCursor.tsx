"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", moveCursor);
        return () => window.removeEventListener("mousemove", moveCursor);
    }, []);

    return (
        <>
            {/* Cercle principal blanc transparent */}
            <motion.div
                className="fixed top-0 left-0 w-6 h-6 rounded-full bg-white/30 pointer-events-none z-[9999] shadow-[0_0_30px_rgba(255,255,255,0.4)]"
                style={{
                    translateX: position.x - 12,
                    translateY: position.y - 12,
                }}
            />

            {/* Halo lumineux plus large avec blur et opacité */}
            <motion.div
                className="fixed top-0 left-0 w-20 h-20 rounded-full bg-white/5 pointer-events-none z-[9998] blur-[40px]"
                style={{
                    translateX: position.x - 40,
                    translateY: position.y - 40,
                }}
            />
        </>
    );
}
