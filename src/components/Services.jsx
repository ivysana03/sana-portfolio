import { motion } from 'framer-motion';
import { Video, Music, Film, Tv, Monitor, Share2 } from 'lucide-react';

const services = [
    { id: 1, icon: Tv, title: 'Cinematic AI Ads', description: 'High-impact commercials generated with bleeding-edge AI models, tailored for brand storytelling.' },
    { id: 2, icon: Music, title: 'Music Videos', description: 'Surreal, rhythm-synced visuals that react to audio, creating an unforgettable sensory experience.' },
    { id: 3, icon: Film, title: 'Short Films', description: 'Complete narrative production from script to screen, utilizing AI for every shot.' },
    { id: 4, icon: Tv, title: 'Concept Trailers', description: 'Rapid visualization of movie or game concepts to pitch ideas and secure funding.' },
    { id: 5, icon: Monitor, title: 'Virtual Production', description: 'Real-time background generation and environment design for LED volume stages.' },
    { id: 6, icon: Video, title: 'Branded Content', description: 'Unique social media assets that stop the scroll and drive engagement.' },
];

const Services = () => {
    return (
        <section id="services" className="section bg-darker">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Core <span className="highlight">Expertise</span>
                </motion.h2>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            className="service-card"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="service-icon">
                                <service.icon size={32} color="var(--accent-color)" />
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Services;
