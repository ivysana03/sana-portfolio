"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { label: "about", href: "#about", id: "about" },
    { label: "showreel", href: "#showreel", id: "showreel" },
    { label: "archive", href: "#archive", id: "archive" },
    { label: "services", href: "#services", id: "services" },
    { label: "process", href: "#process", id: "process" },
    { label: "contact", href: "#contact", id: "contact" },
];

export default function Nav() {
    const [activeSection, setActiveSection] = useState("");
    const [scrolled, setScrolled] = useState(false);

    // Track scroll position for nav background blur
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Intersection Observer to track active section
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            {
                rootMargin: "-20% 0px -70% 0px", // Trigger when section is near top
            }
        );

        // Observe all sections
        NAV_LINKS.forEach((link) => {
            const el = document.getElementById(link.id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-bg/80 backdrop-blur-md py-4" : "bg-transparent py-6"
                }`}
            style={{ paddingLeft: "var(--section-px)", paddingRight: "var(--section-px)" }}
        >
            <div className="flex items-center justify-between">
                {/* Logo / Home Link */}
                <a href="#home" className="flex items-center gap-2 group">
                    <motion.div
                        className="w-1.5 h-1.5 rounded-full bg-accent-green"
                        animate={{ opacity: [1, 0.4, 1] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <span
                        className="font-ui text-[13px] tracking-[0.2em] uppercase text-text group-hover:text-accent transition-colors"
                    >
                        Sana Sheikh
                    </span>
                </a>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8 relative">
                    {NAV_LINKS.map((link) => {
                        const isActive = activeSection === link.id;

                        return (
                            <a
                                key={link.id}
                                href={link.href}
                                className={`font-ui text-[12px] tracking-[0.2em] relative px-1 py-2 transition-colors ${isActive ? "text-text" : "text-text-muted hover:text-text"
                                    }`}
                            >
                                {link.label}

                                {/* Sliding amber baseline indicator */}
                                {isActive && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute -bottom-1 left-0 right-0 h-[1px] bg-accent"
                                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>
            </div>
        </motion.header>
    );
}
