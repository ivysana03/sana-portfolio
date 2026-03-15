"use client";

import { motion } from "framer-motion";
import { letterVariants } from "@/lib/animations";
import { useState, useEffect } from "react";

const HERO_NAME = "SANA SHEIKH";
const HERO_SUBTITLE = "AI FILMMAKER  ·  VISUAL STORY ARCHITECT";

export default function Hero() {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    return (
        <section
            id="home"
            className="relative flex min-h-screen flex-col justify-center overflow-hidden"
        >
            {/* Projector Flash Sequence (happens once on load) */}
            <motion.div
                className="absolute inset-0 z-20 bg-text pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ delay: 1.5, duration: 0.08, times: [0, 0.5, 1] }}
            />

            {/* Background Video — Gumlet Embed */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden bg-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 1.6, duration: 2 }}
            >
                {/* Fallback backdrop screen (intentional dark gradient) */}
                <div 
                    className="absolute inset-x-0 bottom-0 h-1/2 z-5"
                    style={{
                        background: 'linear-gradient(to top, var(--bg) 0%, transparent 100%)'
                    }}
                />
                <div 
                    className="absolute inset-0 z-1"
                    style={{ backgroundColor: 'rgba(10,8,6,0.6)' }} 
                />
                <iframe
                    src="https://play.gumlet.io/embed/69b67284dc37184fc7adef34?autoplay=true&loop=true&muted=true&preload=auto&controls=false&info=false&logo=false"
                    allow="autoplay; fullscreen"
                    className="absolute top-1/2 left-1/2 pointer-events-none"
                    style={{
                        minWidth: '100%',
                        minHeight: '100%',
                        width: 'max(100vw, 250vh)', // Ensure cover even on extreme mobile aspect ratios
                        height: 'max(100vh, 56.25vw)', // 16:9 aspect ratio height
                        transform: 'translate(-50%, -50%)',
                        objectFit: 'cover'
                    }}
                />

                {/* Vignette overlay to ensure text legibility */}
                <div
                    className="absolute inset-0 z-10"
                    style={{
                        background: `
              linear-gradient(180deg, var(--bg) 0%, transparent 20%, transparent 80%, var(--bg) 100%),
              radial-gradient(ellipse at center, transparent 40%, rgba(10,8,6,0.8) 100%)
            `,
                    }}
                />
            </motion.div>
            {/* Content */}
            <div className="relative z-10">
                {/* Name — letter-by-letter blur reveal */}
                <h1
                    className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:flex-wrap items-start"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        lineHeight: 0.95,
                        fontSize: "clamp(60px, 15vw, 160px)",
                        letterSpacing: "-0.02em",
                        gap: "clamp(4px, 2vw, 32px)", /* Space between names */
                    }}
                >
                    <span className="inline-block whitespace-nowrap">
                        {"SANA".split("").map((letter, i) => (
                            <motion.span
                                key={`first-${i}`}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate={isMounted ? "visible" : "hidden"}
                                style={{ display: "inline-block" }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </span>
                    <span className="inline-block whitespace-nowrap">
                        {"SHEIKH".split("").map((letter, i) => (
                            <motion.span
                                key={`last-${i}`}
                                custom={i + 4}
                                variants={letterVariants}
                                initial="hidden"
                                animate={isMounted ? "visible" : "hidden"}
                                style={{ display: "inline-block" }}
                            >
                                {letter}
                            </motion.span>
                        ))}
                    </span>
                </h1>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    animate={{ opacity: 0.5, letterSpacing: "0.15em" }}
                    transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        color: "var(--accent)",
                        marginBottom: "1.5rem",
                    }}
                >
                    {HERO_SUBTITLE}
                </motion.p>

                {/* CTAs — editorial text links, no buttons */}
                <motion.div
                    className="flex flex-col gap-5 sm:flex-row sm:gap-12"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8, duration: 0.6, ease: "easeOut" }}
                >
                    <a href="#showreel" className="editorial-link">
                        → watch showreel
                    </a>
                    <a href="#archive" className="editorial-link">
                        → explore work
                    </a>
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-10 inset-x-0 z-10 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 0.6 }}
            >
                <span
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        letterSpacing: "0.3em",
                        color: "var(--text-muted)",
                    }}
                >
                    SCROLL
                </span>
                <motion.div
                    className="w-px"
                    style={{
                        height: "50px",
                        background: "linear-gradient(to bottom, var(--text-muted), transparent)",
                    }}
                    animate={{ scaleY: [0.6, 1, 0.6], opacity: [0.3, 0.8, 0.3] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                />
            </motion.div>
        </section>
    );
}
