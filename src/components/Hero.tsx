"use client";

import { useEffect, useState } from "react";
import { ArrowDown, Check, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface HeroProps {
  translations: {
    greeting: string;
    name: string;
    subtitle: string;
    specialties: string[];
    description: string;
    projectsButton: string;
    contactButton: string;
    socialCopied: string;
  };
}

const Hero = ({ translations }: HeroProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);
  const t = useTranslations("hero");
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background & decorations */}
      <div className="absolute inset-0 pattern-circles" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 animate-gradient-shift bg-300%" />
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full border border-primary/20 animate-rotate-slow" />
      <div
        className="absolute bottom-20 left-20 w-96 h-96 rounded-full border border-secondary/10 animate-rotate-slow"
        style={{ animationDirection: 'reverse' }}
      />
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/4 left-1/4 w-3 h-3 bg-primary rounded-full animate-float opacity-60"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute top-1/3 right-1/3 w-4 h-4 bg-secondary rounded-full animate-bounce-slow opacity-40"
          style={{ animationDelay: '1s', transform: `translate(${-mousePosition.x * 0.5}px, ${-mousePosition.y * 0.5}px)` }}
        />
        <div
          className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-accent-dark rounded-full animate-float opacity-50"
          style={{ animationDelay: '2s', transform: `translate(${mousePosition.x * 0.7}px, ${mousePosition.y * 0.7}px)` }}
        />
        <div
          className="absolute top-1/2 right-1/4 w-2 h-2 bg-primary-glow rounded-full animate-bounce-slow"
          style={{ animationDelay: '0.5s', transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8 animate-slide-up">
          {/* Title */}
          <div className="space-y-4">
            <p className="text-secondary text-lg font-medium tracking-wider uppercase animate-fade-in font-noto-jp">
              {t("greeting")}
            </p>
            <h1 className="text-6xl md:text-8xl font-bold animate-scale-in">
              <span className="text-gradient glow-text">{t("name")}</span>
            </h1>
            <h2 className="text-3xl md:text-4xl font-semibold text-muted-foreground animate-fade-in" style={{ animationDelay: '0.2s' }}>
              {t("subtitle")}
            </h2>
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap justify-center gap-3 pt-4">
            {translations.specialties.map((spec, i) => (
              <span
                key={i}
                className="glass-card px-5 py-2 rounded-full text-sm font-medium hover-glow cursor-default animate-fade-in wave-animation"
                style={{ animationDelay: `${i * 0.1 + 0.3}s` }}
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {t("description")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary-dark hover:shadow-glow transition-all duration-300 group relative overflow-hidden"
              onClick={() => scrollToSection('projects')}
            >
              <span className="relative z-10">{t("projectsButton")}</span>
              <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform relative z-10" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary-dark to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary/50 hover:bg-primary/10 hover:border-primary transition-all duration-300 zen-circle"
              onClick={() => scrollToSection('contact')}
            >
              {t("contactButton")}
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 pt-8 animate-fade-in" style={{ animationDelay: '0.7s' }}>
            <a
              href="https://www.linkedin.com/in/martin-leblancs-7a2154209/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover-glow hover:scale-110 transition-all duration-300 group"
            >
              <Linkedin className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
            </a>
            <a
              href="https://github.com/MartinLeblancs"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 glass-card rounded-full hover-glow hover:scale-110 transition-all duration-300 group"
            >
              <Github className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
            </a>
            <div className="relative flex flex-col items-center">
              <a
                onClick={() => {
                  navigator.clipboard.writeText("martin.leblancs@epitech.eu");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="p-3 glass-card rounded-full hover-glow hover:scale-110 transition-all duration-300 group cursor-pointer flex items-center justify-center"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-secondary transition-all" />
                ) : (
                  <Mail className="h-5 w-5 text-primary group-hover:text-secondary transition-colors" />
                )}
              </a>

              {copied && (
                <span className="absolute top-full mt-1 text-xs text-green-500 animate-fade-in">
                  {t("socialCopied")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce-slow">
        <ArrowDown className="h-6 w-6 text-primary" />
      </div>
    </section>
  );
};

export default Hero;
