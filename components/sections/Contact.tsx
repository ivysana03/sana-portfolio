"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import SectionTransition from "../layout/SectionTransition";
import CustomSelect from "../ui/CustomSelect";

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string || "Unknown";
        const projectType = formData.get("projectType") as string || "Not specified";
        const budget = formData.get("budget") as string || "Not specified";
        const vision = formData.get("vision") as string || "No details provided";

        const subject = `New Project Inquiry: ${projectType} - ${name}`;
        const body = `Name: ${name}\nProject Type: ${projectType}\nBudget: ${budget}\n\nVision:\n${vision}`;

        window.location.href = `mailto:artiste.sanasheikh@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

        setSubmitted(true);
    };

    return (
        <section id="contact" ref={sectionRef} className="relative">
            <SectionTransition />

            <div>
                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-16 lg:gap-24">
                    {/* LEFT — Form */}
                    <div>
                        {/* Section Label */}
                        <motion.span
                            className="section-label mb-8 block"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 0.6 } : {}}
                            transition={{ duration: 0.6 }}
                        >
                            005 / CONTACT
                        </motion.span>

                        {/* Headline */}
                        <motion.h2
                            className="mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{
                                delay: 0.1,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            Crafting stories
                            <br />
                            <span className="text-accent italic">through AI.</span>
                        </motion.h2>

                        <motion.p
                            className="mb-20 max-w-[55ch]"
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
                            <form onSubmit={handleSubmit} className="space-y-10">
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

                                {/* Project Type — Custom Select */}
                                <motion.div
                                    className="editorial-field"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.5, duration: 0.6 }}
                                >
                                    <label className="editorial-label">Project Type</label>
                                    <CustomSelect
                                        name="projectType"
                                        placeholder="Select a project type"
                                        options={PROJECT_TYPES}
                                        required
                                    />
                                </motion.div>

                                {/* Budget — Custom Select */}
                                <motion.div
                                    className="editorial-field"
                                    initial={{ opacity: 0, y: 16 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ delay: 0.6, duration: 0.6 }}
                                >
                                    <label className="editorial-label">Budget Range</label>
                                    <CustomSelect
                                        name="budget"
                                        placeholder="Select a budget range"
                                        options={BUDGET_RANGES}
                                        required
                                    />
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
                                    <button
                                        type="submit"
                                        className="editorial-link group cursor-pointer"
                                    >
                                        Send →
                                    </button>
                                </motion.div>
                            </form>
                        )}
                    </div>

                    {/* RIGHT — Availability + Socials */}
                    <motion.div
                        className="flex flex-col justify-between lg:pt-32"
                        initial={{ opacity: 0, x: 20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="flex flex-col gap-12">
                            {/* Availability */}
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                                    <span className="font-mono text-[10px] tracking-[0.2em] text-accent-green uppercase">
                                        Available
                                    </span>
                                </div>
                                <p className="font-mono text-[11px] tracking-wider text-text-muted leading-relaxed">
                                    Currently accepting projects
                                    <br />
                                    starting <span className="text-text">March 2026</span>
                                </p>
                            </div>

                            {/* Email */}
                            <div>
                                <span className="editorial-label block mb-2">Email</span>
                                <a
                                    href="mailto:artiste.sanasheikh@gmail.com"
                                    className="font-mono text-[13px] tracking-wider text-text hover:text-accent transition-colors block break-all"
                                >
                                    artiste.sanasheikh@gmail.com
                                </a>
                            </div>

                            {/* Socials */}
                            <div>
                                <span className="editorial-label block mb-3">Follow</span>
                                <div className="flex flex-col gap-3">
                                    {[
                                        { label: "Instagram", url: "https://www.instagram.com/ivysana03?igsh=aXJyZGYyYWIzaGI=" },
                                        { label: "LinkedIn", url: "https://www.linkedin.com/in/sana-sheikh-7a1b15345?utm_source=share_via&utm_content=profile&utm_medium=member_ios" },
                                        { label: "X (Twitter)", url: "https://x.com/ivysana03?s=21" },
                                    ].map((social) => (
                                        <a
                                            key={social.label}
                                            href={social.url}
                                            className="font-mono text-[12px] tracking-wider text-text-muted hover:text-accent transition-colors uppercase"
                                        >
                                            {social.label}
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* Response time */}
                            <p
                                className="text-[14px] max-w-[28ch] leading-relaxed"
                                style={{
                                    fontFamily: "var(--font-body)",
                                    fontStyle: "italic",
                                    color: "var(--text-muted)",
                                    opacity: 0.6,
                                }}
                            >
                                &ldquo;I respond within 48 hours to all project inquiries.&rdquo;
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
