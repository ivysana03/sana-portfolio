"use client";

import { motion } from "framer-motion";
import { letterVariants } from "@/lib/animations";

const HERO_NAME = "SANA SHEIKH";
const HERO_SUBTITLE = "AI FILMMAKER  ·  VISUAL STORY ARCHITECT";

export default function Hero() {
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

            {/* Background Video — Vimeo Embed */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden bg-bg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ delay: 1.6, duration: 2 }}
            >
                <iframe
                    src="https://play.gumlet.io/embed/69b4fad3dc37184fc7936e1f?autoplay=true&loop=true&muted=true&preload=auto&controls=false&info=false&logo=false"
                    allow="autoplay; fullscreen"
                    className="absolute top-1/2 left-1/2 w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
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
                    className="mb-6 lg:mb-8 flex flex-wrap"
                    style={{
                        fontFamily: "var(--font-display)",
                        fontWeight: 400,
                        lineHeight: 0.95,
                        fontSize: "clamp(64px, 16vw, 160px)",
                        letterSpacing: "-0.02em",
                        gap: "clamp(12px, 3vw, 32px)", /* Space between names */
                    }}
                >
                    <span className="inline-block whitespace-nowrap">
                        {"SANA".split("").map((letter, i) => (
                            <motion.span
                                key={`first-${i}`}
                                custom={i}
                                variants={letterVariants}
                                initial="hidden"
                                animate="visible"
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
                                animate="visible"
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
                    animate={{ opacity: 0.5, letterSpacing: "0.25em" }}
                    transition={{ delay: 2.2, duration: 0.8, ease: "easeOut" }}
                    style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "13px",
                        textTransform: "uppercase",
                        color: "var(--text)",
                        marginBottom: "2rem",
                    }}
                >
                    {HERO_SUBTITLE}
                </motion.p>

                {/* CTAs — editorial text links, no buttons */}
                <motion.div
                    className="flex flex-col gap-4 sm:flex-row sm:gap-12"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.8, duration: 0.6, ease: "easeOut" }}
                >
                    <a href="#showreel" className="editorial-link">
                        → watch showreel
                    </a>
                    <a href="#archive" className="editorial-link">
                        explore work →
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
