"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Stars() {
    const pointsRef = useRef<THREE.Points>(null!);

    const starPositions = useMemo(() => {
        const positions = [];
        for (let i = 0; i < 400; i++) {
            positions.push((Math.random() - 0.5) * 100); // x
            positions.push((Math.random() - 0.5) * 100); // y
            positions.push((Math.random() - 0.5) * 100); // z
        }
        return new Float32Array(positions);
    }, []);

    useFrame(({ clock }) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = clock.getElapsedTime() * 0.01;
            pointsRef.current.rotation.x = clock.getElapsedTime() * 0.005;
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={starPositions}
                    count={starPositions.length / 3}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                color="#ffffff"
                size={0.1}
                sizeAttenuation
                transparent
                opacity={0.8}
                depthWrite={false}
            />
        </points>
    );
}

function GradientBackground() {
    const meshRef = useRef<THREE.Mesh>(null!);

    return (
        <mesh ref={meshRef} position={[0, 0, -50]}>
            <planeGeometry args={[500, 500]} />
            <meshBasicMaterial
                // simple gradient via vertexColors
                onBeforeCompile={(shader) => {
                    shader.fragmentShader = `
            uniform vec3 color1;
            uniform vec3 color2;
            varying vec2 vUv;
            ${shader.fragmentShader.replace(
                        `#include <dithering_fragment>`,
                        `
              vec3 grad = mix(color1, color2, vUv.y);
              gl_FragColor = vec4(grad, 1.0);
              #include <dithering_fragment>
              `
                    )}
          `;
                    shader.uniforms.color1 = { value: new THREE.Color("#0a0a0a") }; // noir
                    shader.uniforms.color2 = { value: new THREE.Color("#8b0000") }; // rouge sombre
                }}
            />
        </mesh>
    );
}

export default function GlobalStarsCanvas() {
    return (
        <Canvas
            camera={{ position: [0, 0, 10], fov: 75 }}
            style={{ background: "transparent" }}
        >
            <GradientBackground />
            <Stars />
        </Canvas>
    );
}
