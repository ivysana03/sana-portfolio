"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

export default function Showreel() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-15%" });

    return (
        <section
            id="showreel"
            ref={sectionRef}
            className="relative"
        >
            <SectionTransition />

            <div>
                {/* Oversized section title — clipped at edges like a drive-in sign */}
                <motion.div
                    className="overflow-hidden mb-6"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <motion.h2
                        className="text-center whitespace-nowrap"
                        style={{
                            fontSize: "clamp(80px, 12vw, 200px)",
                            letterSpacing: "-0.03em",
                            color: "var(--text)",
                            opacity: 0.08,
                        }}
                        initial={{ y: 60 }}
                        animate={isInView ? { y: 0 } : {}}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        SHOWREEL 2025
                    </motion.h2>
                </motion.div>

                {/* Video Player — 2.35:1 letterbox ratio */}
                <motion.div
                    className="relative mx-auto overflow-hidden bg-bg-surface border border-border group"
                    style={{ aspectRatio: "2.35 / 1", maxWidth: "1200px" }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ scale: 1.005 }}
                    data-cursor="play"
                >
                    {/* Filmstrip sprocket holes — decorative */}
                    <div className="absolute left-0 top-0 bottom-0 w-6 z-20 pointer-events-none flex flex-col justify-between py-4 opacity-[0.06]">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-3 h-2 mx-auto border border-text/30 rounded-sm" />
                        ))}
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 w-6 z-20 pointer-events-none flex flex-col justify-between py-4 opacity-[0.06]">
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="w-3 h-2 mx-auto border border-text/30 rounded-sm" />
                        ))}
                    </div>

                    {/* Gumlet Showreel */}
                    <iframe
                        src="https://play.gumlet.io/embed/69b66344dc37184fc7ace60f?preload=auto&loop=true"
                        allow="autoplay; fullscreen"
                        className="absolute inset-0 w-full h-full z-10"
                    />
                </motion.div>

                {/* Metadata row below video */}
                <motion.div
                    className="flex justify-between items-center mt-6 max-w-[1200px] mx-auto"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.4 } : {}}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
                        Compiled Works · 2023–2025
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
                        Runtime 2:34
                    </span>
                </motion.div>
            </div>
        </section>
    );
}
