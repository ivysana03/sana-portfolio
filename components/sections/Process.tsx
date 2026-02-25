"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

interface Step {
    number: string;
    title: string;
    description: string;
    visual: string; // Descriptive placeholder for the visual artifact
}

const STEPS: Step[] = [
    {
        number: "01",
        title: "Concept",
        description:
            "Every film begins as a feeling. I build mood boards that mix visual references, emotional notes, and colour stories — then translate that feeling into a generative brief the AI can actually understand.",
        visual: "[ Mood board collage ]",
    },
    {
        number: "02",
        title: "Prompting",
        description:
            "The prompt is the script. Each word is a camera instruction, a lighting choice, a performance note. I've developed a proprietary prompting framework that produces consistent, directable results.",
        visual: "[ Terminal prompt sequence ]",
    },
    {
        number: "03",
        title: "Generation",
        description:
            "Using Runway Gen-3, Midjourney, and Kling, I iterate 50–200 variations per scene — selecting, refining, and re-prompting until each frame meets the vision.",
        visual: "[ Raw → Final comparison ]",
    },
    {
        number: "04",
        title: "Editing",
        description:
            "The AI gives me the raw material. In Premiere Pro and DaVinci Resolve, I compose, colour, and score — bringing human editorial judgment to AI-generated imagery.",
        visual: "[ Colour grade comparison ]",
    },
    {
        number: "05",
        title: "Delivery",
        description:
            "Final deliverables in 4K, colour-graded and mixed, with full rights transfer and source file packages. Typical turnaround: 7–14 days from brief to final cut.",
        visual: "[ 4K export package ]",
    },
];

export default function Process() {
    const containerRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-20%" });

    // Horizontal scroll driven by vertical scroll
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map vertical scroll progress (0→1) to horizontal translation
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${(STEPS.length - 1) * 100}vw`]
    );

    return (
        <section id="process" ref={sectionRef} className="relative">
            <SectionTransition />

            {/* Sticky Container — height = steps × viewport */}
            <div
                ref={containerRef}
                style={{ height: `${STEPS.length * 100}vh` }}
                className="relative"
            >
                {/* Pinned viewport */}
                <div className="sticky top-0 h-screen overflow-hidden">
                    {/* Section Label */}
                    <motion.div
                        className="absolute top-8 left-0 z-20"
                        style={{ padding: "0 var(--section-px)" }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-label">004 / PROCESS</span>
                    </motion.div>

                    {/* Horizontal Track */}
                    <motion.div
                        className="flex h-full"
                        style={{ x, width: `${STEPS.length * 100}vw` }}
                    >
                        {STEPS.map((step, i) => (
                            <div
                                key={step.number}
                                className="w-screen h-full flex items-center justify-center flex-shrink-0"
                                style={{ padding: "0 var(--section-px)" }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 max-w-6xl w-full">
                                    {/* Left — Step info */}
                                    <div className="flex flex-col justify-center">
                                        {/* Giant background number */}
                                        <span
                                            className="block mb-6 select-none pointer-events-none"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "clamp(120px, 18vw, 260px)",
                                                lineHeight: 0.85,
                                                color: "var(--text)",
                                                opacity: 0.04,
                                            }}
                                        >
                                            {step.number}
                                        </span>

                                        <h3
                                            className="mb-6"
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontSize: "clamp(36px, 5vw, 64px)",
                                                fontWeight: 400,
                                                lineHeight: 1.1,
                                                marginTop: "-80px",
                                                color: "var(--text)",
                                            }}
                                        >
                                            {step.title}
                                        </h3>

                                        <p
                                            className="max-w-[45ch]"
                                            style={{
                                                fontFamily: "var(--font-body)",
                                                fontSize: "16px",
                                                lineHeight: 1.7,
                                                color: "var(--text-muted)",
                                                fontStyle: "italic",
                                            }}
                                        >
                                            {step.description}
                                        </p>

                                        {/* Progress indicator */}
                                        <div className="flex gap-2 mt-10">
                                            {STEPS.map((_, j) => (
                                                <div
                                                    key={j}
                                                    className="h-[2px] transition-all duration-500"
                                                    style={{
                                                        width: j === i ? "40px" : "12px",
                                                        backgroundColor:
                                                            j === i
                                                                ? "var(--accent)"
                                                                : "var(--border)",
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right — Visual artifact placeholder */}
                                    <div className="flex items-center justify-center">
                                        <div className="aspect-square w-full max-w-[400px] bg-bg-surface border border-border flex items-center justify-center">
                                            <span className="font-mono text-[11px] tracking-widest text-text-muted/40 uppercase">
                                                {step.visual}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
