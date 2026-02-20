import { motion } from 'framer-motion';

// 🔥 You can now paste FULL YouTube links here
const projects = [
    {
        id: 1,
        title: 'Party',
        role: 'Director & Editor',
        tools: ['Runway', 'Premiere Pro'],
        year: '2025',
        youtubeUrl: 'https://www.youtube.com/watch?v=bPLyEk-jUYs',
    },
    {
        id: 2,
        title: 'Swiss Beauty 4K',
        role: 'Creative Director',
        tools: ['Runway', 'After Effects'],
        year: '2025',
        youtubeUrl: 'https://www.youtube.com/shorts/WfN_M5P-Ik8',
    },
    {
        id: 3,
        title: 'Fashion Film',
        role: 'Director',
        tools: ['Midjourney', 'Premiere Pro'],
        year: '2024',
        youtubeUrl: 'https://youtu.be/dcjJ9Qw8Ch4',
    },
];

// 🔥 Function to extract video ID from ANY YouTube URL
const getYoutubeId = (url) => {
    const regExp =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
};

const Projects = () => {
    return (
        <section id="projects" style={{ padding: '100px 20px' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

                <h2 style={{ textAlign: 'center', marginBottom: '50px' }}>
                    Film <span style={{ color: '#7f5af0' }}>Archive</span>
                </h2>

                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px',
                    }}
                >
                    {projects.map((project, index) => {
                        const videoId = getYoutubeId(project.youtubeUrl);

                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                style={{
                                    background: '#111',
                                    padding: '20px',
                                    borderRadius: '16px',
                                }}
                            >
                                {videoId && (
                                    <div
                                        style={{
                                            position: 'relative',
                                            paddingTop: '56.25%',
                                            marginBottom: '20px',
                                        }}
                                    >
                                        <iframe
                                            src={`https://www.youtube.com/embed/${videoId}`}
                                            title={project.title}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '12px',
                                            }}
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                )}

                                <p style={{ color: '#aaa' }}>{project.role}</p>
                                <h3>{project.title}</h3>
                                <p style={{ color: '#666' }}>{project.year}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Projects;
