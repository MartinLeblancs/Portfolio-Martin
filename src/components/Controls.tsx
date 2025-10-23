"use client";

import { useState, useEffect, useRef } from "react";
import { Speaker, VolumeX, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import ReactCountryFlag from "react-country-flag";
import { useI18n, Locale } from "@/contexts/i18n";

const localeCountryCode: Record<string, string> = {
  fr: "FR",
  en: "GB",
};

export default function Controls() {
  const [isMounted, setIsMounted] = useState(false);
  const { locale, setLocale, messages } = useI18n();

  const [showLangOptions, setShowLangOptions] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.06);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);

    const audio = new Audio("/background.mp3");
    audio.loop = true;
    audio.volume = volume;
    audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    audioRef.current = audio;

    return () => audio.pause();
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setShowVolumeSlider(false);
    } else {
      audioRef.current.play().catch(() => console.log("Lecture bloquée"));
      setIsPlaying(true);
    }
  };

  if (!isMounted) return null;

  const BUTTON_SIZE = "3rem";
  const LANGUAGE_BUTTON_SIZE = "2.5rem";

  return (
    <div className="fixed bottom-5 right-5 flex items-center gap-4 z-50">
      {/* VOLUME */}
      <div
        className="relative flex flex-col items-center"
        onMouseEnter={() => isPlaying && setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        {isPlaying && (
          <div
            className={`absolute bottom-full mb-2 flex flex-col items-center overflow-visible transition-all duration-300 ${showVolumeSlider ? "opacity-100" : "opacity-0"}`}
          >
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                height: "120px",
              }}
              className="accent-primary cursor-pointer"
            />
          </div>
        )}

        <button
          onClick={toggleAudio}
          className="glass-card hover-glow hover:scale-110 transition-all duration-300 flex items-center justify-center"
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, borderRadius: "50%" }}
        >
          {isPlaying ? <Speaker className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* THEME */}
      <div className="relative flex flex-col items-center">
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="glass-card hover-glow hover:scale-110 transition-all duration-300 flex items-center justify-center"
          style={{ width: BUTTON_SIZE, height: BUTTON_SIZE, borderRadius: "50%" }}
        >
          {theme === "light" ? <Moon className="w-5 h-5 text-primary" /> : <Sun className="w-5 h-5 text-primary" />}
        </button>
      </div>

      {/* LANGUE */}
      <div className="relative flex flex-col items-center">
        <div
          className={`absolute bottom-full mb-2 flex flex-col items-center overflow-hidden transition-all duration-300 ${showLangOptions ? "opacity-100 h-auto" : "opacity-0 h-0"
            }`}
        >
          {(["fr", "en"] as Locale[]).map((loc) => (
            <button
              key={loc}
              onClick={() => {
                setLocale(loc);
                setShowLangOptions(false);
              }}
              className="block rounded-full shadow-md my-1 bg-background border border-border overflow-hidden flex items-center justify-center transition-transform transform hover:scale-110"
              style={{ width: LANGUAGE_BUTTON_SIZE, height: LANGUAGE_BUTTON_SIZE }}
            >
              <ReactCountryFlag
                countryCode={localeCountryCode[loc]}
                svg
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                title={messages.languages?.[loc] ?? loc.toUpperCase()}
              />
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowLangOptions(!showLangOptions)}
          className="glass-card hover-glow hover:scale-110 transition-all duration-300 flex items-center justify-center overflow-hidden"
          style={{ width: LANGUAGE_BUTTON_SIZE, height: LANGUAGE_BUTTON_SIZE, borderRadius: "50%" }}
        >
          <ReactCountryFlag
            countryCode={localeCountryCode[locale]}
            svg
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            title={messages.languages?.[locale] ?? locale.toUpperCase()}
          />
        </button>
      </div>
    </div>
  );
}
