// src/app/components/Loader.tsx
"use client";

import { Html, useProgress } from "@react-three/drei";

export default function Loader() {
    const { progress } = useProgress();
    return (
        <Html center>
            <div className="text-white text-lg font-bold">
                Loading {Math.round(progress)}%
            </div>
        </Html>
    );
}
