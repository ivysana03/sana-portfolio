"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

/**
 * A thin amber line that sweeps left-to-right across the viewport when a section enters view
 */
export default function SectionTransition() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });

    return (
        <div ref={ref} className="w-full relative h-px">
            <motion.div
                className="absolute top-0 left-0 bottom-0 bg-accent"
                initial={{ width: "0%", transformOrigin: "left" }}
                animate={isInView ? { width: "100%" } : { width: "0%" }}
                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
        </div>
    );
}
