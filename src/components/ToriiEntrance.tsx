"use client";

import { useEffect, useState } from "react";

interface ToriiEntranceProps {
  onComplete: () => void;
  translations: {
    welcome: string;
    portfolio: string;
  };
}

const ToriiEntrance = ({ onComplete, translations }: ToriiEntranceProps) => {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimating(false);
      onComplete();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!isAnimating) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-hero" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-50" />

      {/* Geometric shapes animation */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Expanding circles */}
        {[...Array(3)].map((_, i) => (
          <div
            key={`circle-${i}`}
            className="absolute w-32 h-32 border-2 border-primary/30 rounded-full animate-torii-open"
            style={{
              animationDelay: `${i * 0.2}s`,
              width: `${(i + 1) * 100}px`,
              height: `${(i + 1) * 100}px`
            }}
          />
        ))}

        {/* Top horizontal beam */}
        <div className="absolute top-1/3 left-1/2 w-[80%] h-5 bg-gradient-accent animate-torii-gates origin-center rounded-full shadow-gold" />

        {/* Second horizontal beam */}
        <div
          className="absolute top-[38%] left-1/2 w-[70%] h-4 bg-primary animate-torii-gates origin-center rounded-full shadow-purple"
          style={{ animationDelay: "0.1s" }}
        />

        {/* Left pillar */}
        <div
          className="absolute left-[15%] top-[20%] w-10 h-[60%] bg-gradient-to-b from-primary to-primary/80 animate-torii-open origin-bottom shadow-purple rounded-t-lg"
          style={{ animationDelay: "0.2s" }}
        />

        {/* Right pillar */}
        <div
          className="absolute right-[15%] top-[20%] w-10 h-[60%] bg-gradient-to-b from-primary to-primary/80 animate-torii-open origin-bottom shadow-purple rounded-t-lg"
          style={{ animationDelay: "0.2s" }}
        />

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className={`absolute rounded-full animate-float ${
              i % 2 === 0 ? "bg-primary w-2 h-2" : "bg-accent w-1.5 h-1.5"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 3}s`,
            }}
          />
        ))}

        {/* Center glow effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 bg-primary rounded-full blur-3xl opacity-30 animate-glow" />
          <div
            className="absolute w-32 h-32 bg-accent rounded-full blur-2xl opacity-25 animate-glow"
            style={{ animationDelay: "0.5s" }}
          />
        </div>

        {/* Welcome text */}
        <div className="absolute text-center z-10">
          <h1
            className="text-7xl font-bold mb-4 animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              {translations.welcome}
            </span>
          </h1>
          <p
            className="text-xl text-muted-foreground animate-fade-in-up"
            style={{ animationDelay: "0.8s" }}
          >
            {translations.portfolio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ToriiEntrance;
