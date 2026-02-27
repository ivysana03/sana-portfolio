import { motion } from 'framer-motion';

const Showreel = () => {
    return (
        <section id="showreel" className="showreel-section">
            <div className="container"><br></br><br></br><br></br>
                <motion.div
                    className="section-header text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                ><br></br>
                    <h2>Latest & Trending Reel</h2>
                    <p>A fast-paced journey through my latest works.</p>
                </motion.div>

                <motion.div
                    className="video-container"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        width="100%"
                        height="500"
                        src="https://www.youtube.com/embed/VMBmeIQrpjY"
                        title="Showreel"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>

                </motion.div>
            </div>
        </section>
    );
};

export default Showreel;
