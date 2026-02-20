import { motion } from 'framer-motion';
import sanaImage from '../assets/image/sana.jpeg';


const About = () => {
    return (
        <section id="about" className="section bg-darker">
            <div className="container about-container">
                <motion.div
                    className="about-image-wrapper"
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="about-image">
                        <img src={sanaImage} alt="Sana Sheikh - AI Filmmaker" />
                    </div>


                </motion.div>

                <div className="about-content">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        CRAFTING THE <br />
                        <span className="highlight">FUTURE FRAME</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                    >
                        <p className="lead-text">
                            I am Sana Sheikh, a multidisciplinary filmmaker working at the intersection of performance, cinematic storytelling, and generative intelligence.
                        </p>
                        <p>
                            My creative philosophy is rooted in Human-Centered AI — using artificial intelligence not as a replacement for artistry, but as an expansion of creative possibility. With a foundation in acting and modeling, I bring an intuitive understanding of emotion, presence, and visual language into every frame I build.
                        </p>
                        <p>
                            From narrative-driven concept films to large-scale AI virtual productions, I serve as the bridge between imagination and high-fidelity execution.
                        </p>
                    </motion.div>

                    <motion.div
                        className="stats-row"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <div className="stat-item">
                            <span className="stat-number">50+</span>
                            <span className="stat-label">AI FILMS</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">1k</span>
                            <span className="stat-label">AUDIENCE</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">Quality</span>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
