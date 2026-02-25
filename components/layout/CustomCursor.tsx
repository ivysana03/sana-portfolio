"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
    const [isHoveringLink, setIsHoveringLink] = useState(false);
    const [isHoveringVideo, setIsHoveringVideo] = useState(false);
    const [isHoveringText, setIsHoveringText] = useState(false);

    // Disable on touch devices
    const [isTouch, setIsTouch] = useState(true);

    // Smooth springs for position
    const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
    const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });

    useEffect(() => {
        // Only enable on non-touch devices
        if (window.matchMedia("(pointer: fine)").matches) {
            setIsTouch(false);
        }

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;

            // Update states based on element type
            const isLink = target.closest("a") || target.closest("button") || target.classList.contains("clickable");
            const isVideo = target.closest(".video-player-container") || target.dataset.cursor === "play";
            const isText = target.tagName === "INPUT" || target.tagName === "TEXTAREA";

            setIsHoveringLink(!!isLink);
            setIsHoveringVideo(!!isVideo);
            setIsHoveringText(!!isText);
        };

        window.addEventListener("mousemove", moveCursor);
        window.addEventListener("mouseover", handleMouseOver);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            window.removeEventListener("mouseover", handleMouseOver);
        };
    }, [cursorX, cursorY]);

    if (isTouch) return null;

    return (
        <>
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full mix-blend-difference"
                style={{
                    x: cursorX,
                    y: cursorY,
                    /* Default state: 16px outline circle */
                    width: 16,
                    height: 16,
                    marginLeft: -8,
                    marginTop: -8,
                }}
            >
                <motion.div
                    className="relative flex items-center justify-center rounded-full"
                    animate={{
                        width: isHoveringVideo ? 72 : isHoveringLink ? 8 : isHoveringText ? 2 : 16,
                        height: isHoveringVideo ? 72 : isHoveringLink ? 8 : isHoveringText ? 24 : 16,
                        backgroundColor: isHoveringVideo ? "var(--accent)" : isHoveringLink ? "var(--text)" : isHoveringText ? "var(--text)" : "transparent",
                        border: isHoveringVideo ? "none" : isHoveringLink || isHoveringText ? "none" : "1px solid var(--text)",
                        borderRadius: isHoveringText ? "0px" : "9999px",
                        opacity: 1
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 28 }}
                >
                    {/* "PLAY" text only shows when hovering valid video containers */}
                    <motion.span
                        className="font-ui text-[12px] font-bold text-bg tracking-widest absolute"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                            opacity: isHoveringVideo ? 1 : 0,
                            scale: isHoveringVideo ? 1 : 0.5,
                        }}
                        transition={{ duration: 0.2 }}
                    >
                        PLAY
                    </motion.span>
                </motion.div>
            </motion.div>

            {/* Hide default cursor universally when custom cursor is active */}
            <style dangerouslySetInnerHTML={{
                __html: `
        * { cursor: none !important; }
      `}} />
        </>
    );
}
