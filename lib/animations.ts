import type { Variants, Transition } from "framer-motion";

/* ========================================
   SHARED ANIMATION VARIANTS
   Reused across all section components
   ======================================== */

/** Fade up from below — default scroll reveal */
export const fadeUpVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.08,
            duration: 0.6,
            ease: [0.25, 0.1, 0.25, 1],
        },
    }),
};

/** Slide in from the left */
export const slideRightVariants: Variants = {
    hidden: { opacity: 0, x: -24 },
    visible: (i: number = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.6,
            ease: "easeOut",
        },
    }),
};

/** Blur to sharp — used for hero text */
export const blurClearVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

/** Letter-by-letter blur reveal for hero name */
export const letterVariants: Variants = {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: (i: number) => ({
        opacity: 1,
        filter: "blur(0px)",
        transition: {
            delay: 1.0 + i * 0.06,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

/** Container that staggers children */
export const staggerContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3,
        },
    },
};

/** Smooth spring transition */
export const springTransition: Transition = {
    type: "spring",
    stiffness: 400,
    damping: 28,
};
