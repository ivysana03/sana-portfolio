import { motion } from 'framer-motion';

const Contact = () => {
    return (
        <section id="contact" className="contact-section">
            <div className="container">
                <motion.div
                    className="contact-inner left"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >

                    <h2 className="contact-title">
                        LET'S WORK <span className="highlight">TOGETHER</span>
                    </h2>

                    <p className="contact-text">
                        Whether you have a specific project in mind or just want to explore
                        the possibilities of AI cinema, I'm always open to new challenges.
                    </p>

                    <a href="mailto:artiste.sanasheikh@gmail.com" className="contact-btn">
                        Get In Touch
                    </a>

                    <div className="social-links">
                        <a href="https://www.instagram.com/ivysana03?igsh=Zm40NWp5dHVwZ2li&utm_source=qr" className="social-link">Instagram</a>
                        <a href="https://x.com/ivysana03?s=21" className="social-link">Twitter </a>
                        <a href="https://www.youtube.com/@ivysana03" className="social-link">YouTube</a>
                        <a href="https://www.linkedin.com/in/sana-sheikh-7a1b15345/" className="social-link">LinkedIn</a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
