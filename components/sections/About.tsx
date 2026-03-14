"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

// Faint generative prompt text that sits behind the bio — barely visible
const GHOST_PROMPTS = [
    "cinematic wide shot, anamorphic flare, golden hour through industrial glass --ar 21:9",
    "fashion editorial, dramatic chiaroscuro lighting, smoke and silk, 35mm film grain",
    "slow push in on subject, shallow depth of field, Alexa Mini LF look",
    "colour palette: deep amber, burnt sienna, desaturated teal, film emulsion texture",
];

const BIO_LINES = [
    "Sana Sheikh is a multidisciplinary creative who evolved from a strong foundation in acting and modeling into building her own AI film production. With an intuitive grasp of performance, framing, emotion, and visual language, she approaches AI filmmaking not just as a toolset but as a storytelling medium.",
    "Her work blends cinematic sensibility with advanced AI workflows, crafting high impact visuals that feel both intentional and immersive. From narrative architecture to AI-driven visual development and post-production enhancement, Sana focuses on precision, aesthetic coherence, and innovation.",
    "She operates at the intersection of art and technology building films that are sophisticated, emotionally resonant, and technically elevated.",
];

export default function About() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    return (
        <section
            id="about"
            ref={sectionRef}
            className="relative min-h-screen"
        >
            <SectionTransition />

            <div
                className="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
            >
                {/* LEFT — Portrait */}
                <motion.div
                    className="relative aspect-3/4 w-full max-w-[500px] min-h-[70vh] mx-auto lg:mx-0 overflow-hidden bg-bg-surface border border-border"
                    initial={{ opacity: 0, x: -40 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* About Video */}
                    <iframe
                        src="https://play.gumlet.io/embed/69b4fad3c8f901eb75f2257c?autoplay=true&loop=true&muted=true&preload=auto&controls=false&info=false&logo=false"
                        allow="autoplay; fullscreen"
                        className="absolute top-1/2 left-1/2 w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    />

                    {/* Gradient overlay to blend into the page */}
                    <div
                        className="absolute inset-0 z-10 pointer-events-none"
                        style={{
                            background:
                                "linear-gradient(to right, transparent 80%, var(--bg) 100%)",
                        }}
                    />
                </motion.div>

                {/* RIGHT — Bio */}
                <div className="relative lg:pr-8">
                    {/* Section Label */}
                    <motion.span
                        className="section-label mb-8 block"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.6 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        001 / ABOUT
                    </motion.span>

                    {/* Headline */}
                    <motion.h2
                        className="mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <span className="block text-text">Not generating.</span>
                        <span className="block text-accent italic">Directing.</span>
                    </motion.h2>

                    {/* Bio — line-by-line scroll reveal */}
                    <div className="space-y-6 relative">
                        {/* Ghost prompts — faint AI prompts floating behind the text */}
                        <div className="absolute inset-0 -z-10 overflow-hidden select-none pointer-events-none">
                            {GHOST_PROMPTS.map((prompt, i) => (
                                <p
                                    key={i}
                                    className="font-mono text-[10px] text-text/4 leading-relaxed whitespace-nowrap"
                                    style={{
                                        transform: `translateY(${i * 60 + 20}px) rotate(-1deg)`,
                                        animation: `ghostDrift ${60 + i * 10}s linear infinite`,
                                    }}
                                >
                                    {prompt}
                                </p>
                            ))}
                        </div>

                        {BIO_LINES.map((line, i) => (
                            <motion.p
                                key={i}
                                className="text-[17px] max-w-[50ch]"
                                style={{ fontStyle: "italic", color: "var(--text-muted)" }}
                                initial={{ opacity: 0, y: 16 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    delay: 0.4 + i * 0.15,
                                    duration: 0.7,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {line}
                            </motion.p>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
