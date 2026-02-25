"use client";

import { useEffect, useRef } from "react";

export default function GrainOverlay() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d", { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        let lastDrawTime = 0;
        const fps = 12; // Adjusted to 12fps for performance (compromise between static & 24fps)
        const interval = 1000 / fps;

        // Fixed internal resolution, scaled up via CSS to prevent fuzzy scaling
        const size = 256;
        canvas.width = size;
        canvas.height = size;

        const generateNoise = () => {
            const imageData = ctx.createImageData(size, size);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                // Generate monochromatic noise (black/white)
                const value = Math.random() < 0.5 ? 0 : 255;
                data[i] = value;     // R
                data[i + 1] = value; // G
                data[i + 2] = value; // B
                data[i + 3] = 12;    // A
            }
            ctx.putImageData(imageData, 0, 0);
        };

        const draw = (timestamp: number) => {
            if (timestamp - lastDrawTime > interval) {
                generateNoise();
                lastDrawTime = timestamp;
            }
            animationFrameId = requestAnimationFrame(draw);
        };

        animationFrameId = requestAnimationFrame(draw);

        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 h-full w-full opacity-[0.045] mix-blend-overlay">
            <canvas
                ref={canvasRef}
                className="h-full w-full animate-grain bg-repeat"
                style={{ imageRendering: "pixelated" }}
            />
        </div>
    );
}
