"use client";

import { useState, useEffect, useRef } from "react";
import { Speaker, VolumeX } from "lucide-react";

export default function AudioButton() {
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.06);
    const [showSlider, setShowSlider] = useState(false);

    useEffect(() => {
        const audio = new Audio("/background.mp3");
        audio.loop = true;
        audio.volume = volume;
        audio.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        audioRef.current = audio;

        return () => audio.pause();
    }, []);

    useEffect(() => {
        if (audioRef.current) audioRef.current.volume = volume;
    }, [volume]);

    const handleClick = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().catch(() => console.log("Lecture bloquée"));
            setIsPlaying(true);
        }
    };

    return (
        <div
            className="fixed bottom-5 right-5 flex items-center"
            onMouseEnter={() => isPlaying && setShowSlider(true)}
            onMouseLeave={() => setShowSlider(false)}
        >
            {/* Bouton rond */}
            <button
                onClick={handleClick}
                className={`p-3 glass-card rounded-full hover-glow hover:scale-110 transition-all duration-300 flex items-center justify-center
          ${showSlider ? "mr-36" : "mr-0"}`}
                aria-label={isPlaying ? "Pause musique" : "Lire musique"}
            >
                {isPlaying ? (
                    <Speaker className="w-5 h-5 text-primary" />
                ) : (
                    <VolumeX className="w-5 h-5 text-primary" />
                )}
            </button>

            {/* Slider de volume */}
            {isPlaying && (
                <div
                    className={`absolute right-0 flex items-center transition-all duration-300 overflow-hidden ${showSlider ? "w-36 opacity-100" : "w-0 opacity-0"
                        }`}
                >
                    <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.01}
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className="w-full h-2 rounded-full bg-gray-300 dark:bg-gray-700 accent-primary cursor-pointer appearance-none"
                        style={{
                            borderRadius: "9999px",
                        }}
                    />
                    <style jsx>{`
            input[type="range"]::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: hsla(357, 83%, 23%, 1.00);
              cursor: pointer;
              border: none;
              box-shadow: 0 0 4px rgba(0,0,0,0.3);
              transition: transform 0.2s;
            }
            input[type="range"]::-webkit-slider-thumb:hover {
              transform: scale(1.2);
            }
            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              border-radius: 50%;
              background: hsla(357, 83%, 23%, 1.00);
              cursor: pointer;
              border: none;
              box-shadow: 0 0 4px rgba(0,0,0,0.3);
            }
          `}</style>
                </div>
            )}
        </div>
    );
}
