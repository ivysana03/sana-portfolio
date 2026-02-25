"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

export default function Showreel() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
    const [isPlaying, setIsPlaying] = useState(false);

    return (
        <section
            id="showreel"
            ref={sectionRef}
            className="relative py-24"
        >
            <SectionTransition />

            <div style={{ padding: "0 var(--section-px)" }}>
                {/* Oversized section title — clipped at edges like a drive-in sign */}
                <motion.div
                    className="overflow-hidden mb-16"
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

                    {/* Vimeo Embed */}
                    <iframe
                        src="https://player.vimeo.com/video/76979871?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1"
                        allow="autoplay; fullscreen"
                        className="absolute inset-0 w-full h-full"
                        style={{ border: "none" }}
                    />

                    {/* Custom Play Overlay */}
                    {!isPlaying && (
                        <motion.div
                            className="absolute inset-0 z-10 flex items-center justify-center bg-bg/40 backdrop-blur-sm cursor-pointer"
                            onClick={() => setIsPlaying(true)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.div
                                className="flex flex-col items-center gap-3"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                            >
                                <div className="w-20 h-20 rounded-full border border-text/40 flex items-center justify-center">
                                    <span className="font-mono text-[11px] tracking-[0.3em] text-text uppercase">
                                        Play
                                    </span>
                                </div>
                                <span className="font-mono text-[9px] tracking-[0.2em] text-text-muted uppercase">
                                    Showreel · 2:34
                                </span>
                            </motion.div>
                        </motion.div>
                    )}
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
