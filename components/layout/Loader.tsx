"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Artificial delay to ensure minimum showing time (1.5s total)
        // In a real app this would tie into next/router or suspense boundaries
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    key="loader"
                    className="fixed inset-0 z-[1000] flex items-center justify-center bg-bg"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} // Projector fade out
                >
                    {/* Branded "S.S." initials */}
                    <motion.div
                        initial={{ filter: "blur(12px)", opacity: 0 }}
                        animate={{ filter: "blur(0px)", opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-[16px] text-accent tracking-[0.2em]"
                    >
                        S.S.
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
