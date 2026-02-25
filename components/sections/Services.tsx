"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

interface Service {
    title: string;
    description: string;
    idealFor: string;
    timeline: string;
}

const SERVICES: Service[] = [
    {
        title: "Cinematic AI Ads",
        description:
            "High-concept brand films generated with Runway Gen-3, colour-graded in DaVinci Resolve, and cut in Premiere Pro. Each frame is directed and art-directed — not randomly generated.",
        idealFor: "Product launches, fashion campaigns, luxury brands",
        timeline: "10–14 days from brief to final cut",
    },
    {
        title: "AI Music Videos",
        description:
            "Full narrative or abstract music videos built in latent space. I work directly with artists to translate their sonic identity into a visual language that feels authored, not automated.",
        idealFor: "Independent artists, labels, music producers",
        timeline: "14–21 days",
    },
    {
        title: "Brand Identity Films",
        description:
            "Short-form identity pieces that communicate brand ethos through cinematic AI imagery. These aren't explainer videos — they're mood films designed to make audiences feel something.",
        idealFor: "Startups, DTC brands, creative agencies",
        timeline: "7–10 days",
    },
    {
        title: "Creative Direction",
        description:
            "Strategic visual guidance for teams exploring generative tools. I develop prompt frameworks, establish visual systems, and consult on AI-native content pipelines.",
        idealFor: "Agencies, studios, in-house creative teams",
        timeline: "Project-based or ongoing retainer",
    },
];

export default function Services() {
    const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

    return (
        <section id="services" ref={sectionRef} className="relative py-32">
            <SectionTransition />

            <div style={{ padding: "0 var(--section-px)" }}>
                {/* Section Header */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-label mb-4 block">003 / SERVICES</span>
                    <h2 className="text-text">Core Expertise</h2>
                </motion.div>

                {/* Accordion List */}
                <div className="flex flex-col">
                    {SERVICES.map((service, i) => {
                        const isOpen = expandedIndex === i;

                        return (
                            <motion.div
                                key={service.title}
                                className="border-t border-border/30 group"
                                initial={{ opacity: 0, x: -24 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    delay: 0.2 + i * 0.1,
                                    duration: 0.6,
                                    ease: [0.16, 1, 0.3, 1],
                                }}
                            >
                                {/* Row Header */}
                                <button
                                    className="w-full flex items-center justify-between py-8 cursor-pointer text-left"
                                    onClick={() =>
                                        setExpandedIndex(isOpen ? null : i)
                                    }
                                >
                                    <div className="flex items-center gap-8">
                                        {/* Number */}
                                        <span className="font-mono text-[11px] text-text-muted tracking-wider w-8">
                                            0{i + 1}
                                        </span>
                                        {/* Service Name */}
                                        <motion.h3
                                            className="text-[28px] md:text-[36px] transition-colors group-hover:text-accent"
                                            animate={{ x: isOpen ? 8 : 0 }}
                                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                            style={{
                                                fontFamily: "var(--font-display)",
                                                fontWeight: 400,
                                                lineHeight: 1.1,
                                            }}
                                        >
                                            {service.title}
                                        </motion.h3>
                                    </div>

                                    {/* Expand indicator */}
                                    <motion.span
                                        className="font-mono text-[11px] text-text-muted"
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        ↓
                                    </motion.span>
                                </button>

                                {/* Expanded Content */}
                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pb-10 pl-16 pr-8 grid grid-cols-1 md:grid-cols-2 gap-12">
                                                <p
                                                    className="text-[15px] leading-relaxed max-w-[50ch]"
                                                    style={{
                                                        fontFamily: "var(--font-body)",
                                                        color: "var(--text-muted)",
                                                        fontStyle: "italic",
                                                    }}
                                                >
                                                    {service.description}
                                                </p>

                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                                                            Ideal For
                                                        </span>
                                                        <span className="font-mono text-[12px] text-accent/80">
                                                            {service.idealFor}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase block mb-1">
                                                            Typical Timeline
                                                        </span>
                                                        <span className="font-mono text-[12px] text-text/70">
                                                            {service.timeline}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                    {/* Bottom border */}
                    <div className="border-t border-border/30" />
                </div>
            </div>
        </section>
    );
}
