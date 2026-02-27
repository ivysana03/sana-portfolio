import { motion } from 'framer-motion';

const steps = [
    { step: 1, title: 'Concept', description: 'Brainstorming narratives and mood boards.' },
    { step: 2, title: 'Prompting', description: 'Crafting precise text-to-image/video inputs.' },
    { step: 3, title: 'Generation', description: 'Iterating on visuals using Midjourney/Runway.' },
    { step: 4, title: 'Editing', description: 'Compositing, color grading, and VFX.' },
    { step: 5, title: 'Final Polish', description: 'Upscaling, sound design, and delivery.' },
];

const Process = () => {
    return (
        <section id="process" className="process-section">
            <div className="container">
                <motion.h2
                    className="section-title text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    Production Pipeline
                </motion.h2>

                <div className="timeline">
                    {steps.map((item, index) => (
                        <motion.div
                            key={item.step}
                            className="timeline-item"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.15 }}
                        >
                            <div className="timeline-number">{item.step}</div>

                            <div className="timeline-content">
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Process;
