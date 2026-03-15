"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types/project";
import ProjectCard from "./ProjectCard";
import SectionTransition from "../layout/SectionTransition";

interface ArchiveProps {
    initialProjects: Project[];
}

export default function Archive({ initialProjects }: ArchiveProps) {
    const [activeCategory, setActiveCategory] = useState<string>("All");

    // Extract unique categories from projects
    const categories = ["All", ...Array.from(new Set(initialProjects.map((p) => p.categoryTitle)))].filter(Boolean) as string[];

    // Filter projects
    const filteredProjects = activeCategory === "All"
        ? initialProjects
        : initialProjects.filter((p) => p.categoryTitle === activeCategory);

    return (
        <section id="archive" className="relative min-h-screen">
            <SectionTransition />

            <div className="mx-auto">
                {/* Header & Filters */}
                <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div>
                        <span className="section-label mb-4 block">002 / ARCHIVE</span>
                        <h2 className="text-text">Selected Works</h2>
                    </div>

                    {/* Category Filter Pills */}
                    <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setActiveCategory(category)}
                                className={`tag transition-colors hover:text-accent-bright cursor-pointer ${activeCategory === category ? "text-accent-bright border-accent-bright/50 bg-accent-bright/5" : ""
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Project Grid */}
                <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <ProjectCard key={project._id} project={project} />
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Empty State */}
                {filteredProjects.length === 0 && (
                    <div className="py-24 text-center">
                        <p className="mx-auto opacity-50">No projects found in this category.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
