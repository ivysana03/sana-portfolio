import { motion } from 'framer-motion';

// Import Videos
import partyVideo from '../assets/videos/Party.mp4';
import swissBeauty from '../assets/videos/Swiss beauty 4k.mp4';
import superMaka from '../assets/videos/Super maka teaser.mp4';
import mainFilm from '../assets/videos/MAIN FILM.mp4';
import kimiricaOne from '../assets/videos/Kimirica one.mp4';
import kimiricaSpeed from '../assets/videos/Kimirica_Precise_Speed.mp4';

const projects = [
    {
        id: 1,
        title: 'Party',
        role: 'Director & Editor',
        tools: ['Runway', 'Premiere Pro'],
        year: '2025',
        video: partyVideo,
    },
    {
        id: 2,
        title: 'Swiss Beauty 4K',
        role: 'Creative Director',
        tools: ['Runway', 'After Effects'],
        year: '2025',
        video: swissBeauty,
    },
    {
        id: 3,
        title: 'Super Maka Teaser',
        role: 'Director',
        tools: ['Midjourney', 'Premiere Pro'],
        year: '2024',
        video: superMaka,
    },
    {
        id: 4,
        title: 'Main Film',
        role: 'AI Filmmaker',
        tools: ['Stable Diffusion', 'DaVinci Resolve'],
        year: '2024',
        video: mainFilm,
    },
    {
        id: 5,
        title: 'Kimirica One',
        role: 'Creative Director',
        tools: ['Runway', 'Photoshop'],
        year: '2024',
        video: kimiricaOne,
    },
    {
        id: 6,
        title: 'Kimirica Precise Speed',
        role: 'Visual Director',
        tools: ['After Effects', 'AI Workflow'],
        year: '2025',
        video: kimiricaSpeed,
    },
];

const Projects = () => {
    return (
        <section id="projects" className="section">
            <div className="container">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    Film <span className="highlight">Archive</span>
                </motion.h2>

                <div className="projects-grid">
                    {projects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            className="project-card"
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-100px' }}
                            transition={{
                                delay: index * 0.1,
                                duration: 0.8,
                                ease: [0.16, 1, 0.3, 1],
                            }}
                        >
                            <div className="project-video-wrapper">
                                <video
                                    src={project.video}
                                    className="project-video"
                                    controls
                                    preload="metadata"
                                />
                            </div>

                            <div className="project-info">
                                <p className="role">{project.role}</p>
                                <h3>{project.title}</h3>
                                <p className="year">{project.year}</p>

                                <div className="tags">
                                    {project.tools.map((tool, i) => (
                                        <span key={i} className="tag">
                                            {tool}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
