"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Suspense, useState, useMemo, useEffect } from "react";
import * as THREE from "three";
import { motion, AnimatePresence } from "framer-motion";
import { OrbitControls, useGLTF, Html, useProgress } from "@react-three/drei";

// Loader simple
function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-white text-lg font-bold">
                Loading {Math.round(progress)}%
            </div>
        </Html>
    );
}

// Musique auto
function useAutoMusic() {
    useEffect(() => {
        const audio = new Audio("/music/ambient.mp3");
        audio.loop = true;
        audio.volume = 0.15;
        audio.play().catch(() => {
            const resume = () => {
                audio.play();
                window.removeEventListener("click", resume);
            };
            window.addEventListener("click", resume);
        });
    }, []);
}

export default function HeroSection() {
    const [introFinished, setIntroFinished] = useState(false);

    useAutoMusic();

    return (
        <div className="w-full h-screen relative overflow-hidden">
            <Canvas
                camera={{ position: [0, 5, 12], fov: 60 }}
                className="absolute inset-0 z-0"
                style={{ background: "transparent" }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={0.5} />

                <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            </Canvas>

            {/* Texte par-dessus */}
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5 }}
                    className="absolute inset-0 flex flex-col items-center justify-center z-10"
                >
                    <h1 className="text-7xl font-extrabold text-[#e63946] drop-shadow-[0_0_40px_rgba(230,57,70,0.7)] mb-4">
                        Martin <span className="text-white/80">LEBLANCS</span>
                    </h1>
                    <p className="text-xl text-white/70 animate-pulse">
                        Fullstack Engineer – Web, Mobile, Data & AI, Cybersecurity
                    </p>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
