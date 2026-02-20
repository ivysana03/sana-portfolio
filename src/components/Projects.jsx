import { motion } from 'framer-motion';

const projects = [
    {
        id: 1,
        title: 'Party',
        role: 'Director & Editor',
        tools: ['Runway', 'Premiere Pro'],
        year: '2025',
        youtubeId: 'https://www.youtube.com/watch?v=bPLyEk-jUYs', // Replace with actual ID
    },
    {
        id: 2,
        title: 'Swiss Beauty 4K',
        role: 'Creative Director',
        tools: ['Runway', 'After Effects'],
        year: '2025',
        youtubeId: 'https://www.youtube.com/shorts/WfN_M5P-Ik8', // Replace with actual ID
    },
    {
        id: 3,
        title: 'Fashion Film',
        role: 'Director',
        tools: ['Midjourney', 'Premiere Pro'],
        year: '2024',
        youtubeId: 'https://www.youtube.com/watch?v=dcjJ9Qw8Ch4', // Replace with actual ID
    },
    {
        id: 4,
        title: 'Main Film',
        role: 'AI Filmmaker',
        tools: ['Stable Diffusion', 'DaVinci Resolve'],
        year: '2024',
        youtubeId: 'https://www.youtube.com/watch?v=aPwjEe9B_Sk', // Replace with actual ID
    },
    {
        id: 5,
        title: 'Kimirica One',
        role: 'Creative Director',
        tools: ['Runway', 'Photoshop'],
        year: '2024',
        youtubeId: 'https://www.youtube.com/shorts/C5I8jFre5Ys', // Replace with actual ID
    },
    {
        id: 6,
        title: 'Melting Clock',
        role: 'Visual Director',
        tools: ['After Effects', 'AI Workflow'],
        year: '2025',
        youtubeId: 'https://www.youtube.com/watch?v=ljX3thxOhUU', // Replace with actual ID
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
                                <iframe
                                    src={`https://www.youtube.com/embed/${project.youtubeId}`}
                                    title={project.title}
                                    className="project-video"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
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
