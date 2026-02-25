"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";

const PROJECT_TYPES = [
    "Cinematic Ad",
    "Music Video",
    "Short Film",
    "Concept Trailer",
    "Other",
];

const BUDGET_RANGES = [
    "Under ₹50K",
    "₹50K – ₹2L",
    "₹2L – ₹10L",
    "International Budget",
];

export default function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-15%" });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Wire to API route / Resend / mailto
        setSubmitted(true);
    };

    return (
        <section id="contact" ref={sectionRef} className="relative py-32">
            <SectionTransition />

            <div
                className="mx-auto max-w-4xl"
                style={{ padding: "0 var(--section-px)" }}
            >
                {/* Section Label */}
                <motion.span
                    className="section-label mb-6 block"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.6 } : {}}
                    transition={{ duration: 0.6 }}
                >
                    005 / CONTACT
                </motion.span>

                {/* Headline */}
                <motion.h2
                    className="mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    Let&apos;s make
                    <br />
                    <span className="text-accent italic">something beautiful.</span>
                </motion.h2>

                <motion.p
                    className="mb-16 max-w-[55ch]"
                    style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "16px",
                        lineHeight: 1.7,
                        color: "var(--text-muted)",
                        fontStyle: "italic",
                    }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    I work with brands, artists, and studios who want cinematic
                    storytelling crafted with generative tools. If you have a vision,
                    I&apos;ll bring the frames.
                </motion.p>

                {/* Form or Success State */}
                {submitted ? (
                    <motion.div
                        className="py-20 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                    >
                        <p
                            className="text-[24px] italic text-accent mb-4"
                            style={{ fontFamily: "var(--font-display)" }}
                        >
                            Received.
                        </p>
                        <p className="font-mono text-[12px] text-text-muted tracking-wider">
                            I&apos;ll be in touch soon.
                        </p>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Name */}
                        <motion.div
                            className="editorial-field"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            <label className="editorial-label">Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="editorial-input"
                                placeholder="Your name"
                            />
                        </motion.div>

                        {/* Project Type */}
                        <motion.div
                            className="editorial-field"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <label className="editorial-label">Project Type</label>
                            <select name="projectType" required className="editorial-input">
                                <option value="" disabled selected>
                                    Select a project type
                                </option>
                                {PROJECT_TYPES.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Budget */}
                        <motion.div
                            className="editorial-field"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <label className="editorial-label">Budget Range</label>
                            <select name="budget" required className="editorial-input">
                                <option value="" disabled selected>
                                    Select a budget range
                                </option>
                                {BUDGET_RANGES.map((range) => (
                                    <option key={range} value={range}>
                                        {range}
                                    </option>
                                ))}
                            </select>
                        </motion.div>

                        {/* Vision */}
                        <motion.div
                            className="editorial-field"
                            initial={{ opacity: 0, y: 16 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            <label className="editorial-label">
                                Tell me about your vision
                            </label>
                            <textarea
                                name="vision"
                                rows={4}
                                required
                                className="editorial-input resize-none"
                                placeholder="Describe the project you have in mind…"
                            />
                        </motion.div>

                        {/* Submit */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.8, duration: 0.6 }}
                        >
                            <button type="submit" className="editorial-link group cursor-pointer">
                                Send →
                            </button>
                        </motion.div>
                    </form>
                )}

                {/* Footer info */}
                <motion.div
                    className="mt-24 pt-12 border-t border-border/30 flex flex-col md:flex-row justify-between gap-8"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 0.5 } : {}}
                    transition={{ delay: 1, duration: 0.8 }}
                >
                    <div className="flex flex-col gap-2">
                        <a
                            href="mailto:hello@ivysana.xyz"
                            className="font-mono text-[12px] tracking-wider text-text hover:text-accent transition-colors"
                        >
                            hello@ivysana.xyz
                        </a>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-text-muted uppercase">
                            Currently available for projects starting March 2026
                        </span>
                    </div>

                    <div className="flex gap-6">
                        {["Instagram", "Vimeo", "LinkedIn", "X"].map((social) => (
                            <a
                                key={social}
                                href="#"
                                className="font-mono text-[11px] tracking-wider text-text-muted hover:text-accent transition-colors uppercase"
                            >
                                {social}
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
