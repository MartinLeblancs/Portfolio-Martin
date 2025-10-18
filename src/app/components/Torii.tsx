// src/app/components/Torii.tsx
"use client";

import { useGLTF } from "@react-three/drei";

export default function Torii() {
    const { scene } = useGLTF("/models/torii.glb"); // accessible via public/models/torii.glb
    return <primitive object={scene} scale={0.5} position={[0, -1, -5]} />;
}
