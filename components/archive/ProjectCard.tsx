"use client";

import { motion } from "framer-motion";
import { Project } from "@/types/project";
import { fadeUpVariants } from "@/lib/animations";

interface ProjectCardProps {
    project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <motion.div
            layout
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover="hover"
            className="group flex flex-col gap-4 cursor-pointer"
            // Custom cursor hint
            data-cursor="play"
        >
            {/* Thumbnail Container (16:9) */}
            <div className="relative aspect-video w-full overflow-hidden bg-bg-surface border border-border">
                {/* Fallback image (if CMS has no image) */}
                {project.thumbnailUrl ? (
                    <motion.img
                        src={project.thumbnailUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-text-muted font-mono text-xs opacity-50">
                        [ MEDIA MISSING ]
                    </div>
                )}

                {/* Hover Video (Vimeo loop overlay) */}
                {project.vimeoId && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 pointer-events-none bg-bg">
                        <iframe
                            src={`https://player.vimeo.com/video/${project.vimeoId}?background=1&autoplay=1&loop=1&byline=0&title=0&muted=1`}
                            allow="autoplay; fullscreen"
                            className="absolute top-1/2 left-1/2 w-[150%] min-h-[150%] -translate-x-1/2 -translate-y-1/2"
                            style={{ pointerEvents: "none" }}
                        />
                    </div>
                )}
            </div>

            {/* Metadata */}
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-start">
                    <h3 className="text-[22px] leading-tight group-hover:text-accent transition-colors">
                        {project.title}
                    </h3>
                    <span className="font-mono text-[11px] text-text-muted mt-1">{project.year}</span>
                </div>

                <p className="font-mono text-[11px] uppercase tracking-wider text-text-muted m-0">
                    {project.client} · <span className="text-accent/70">{project.role}</span>
                </p>

                {/* Tools used tags */}
                {project.tools && project.tools.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                        {project.tools.slice(0, 3).map((tool) => (
                            <span key={tool} className="text-[9px] font-mono tracking-widest text-text-muted/60 uppercase border border-border/50 px-2 py-0.5">
                                {tool}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
