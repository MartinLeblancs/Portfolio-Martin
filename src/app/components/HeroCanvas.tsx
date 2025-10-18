// src/app/components/HeroCanvas.tsx
"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";
import { OrbitControls, useGLTF } from "@react-three/drei";

// Torii 3D
function Torii() {
    const { scene } = useGLTF("/models/torii.glb");
    return <primitive object={scene} scale={0.5} position={[0, -1, -5]} />;
}

// Étoiles animées
function StarsParticles() {
    const pointsRef = useRef<THREE.Points>(null!);

    const starPositions = useMemo(() => {
        const positions = [];
        const numStars = 300;
        for (let i = 0; i < numStars; i++) {
            positions.push(
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100,
                (Math.random() - 0.5) * 100
            );
        }
        return new Float32Array(positions);
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.005;
            pointsRef.current.rotation.x = clock.getElapsedTime() * 0.0025;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={starPositions.length / 3}
                    array={starPositions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.1}
                sizeAttenuation
                transparent
                opacity={0.9}
            />
        </points>
    );
}

export default function HeroCanvas() {
    return (
        <Canvas camera={{ position: [0, 0, 12], fov: 60 }} className="absolute inset-0 -z-10">
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={0.5} />

            <Suspense fallback={null}>
                <Torii />
            </Suspense>

            <StarsParticles />

            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
}
