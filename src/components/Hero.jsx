import { motion } from 'framer-motion';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="hero-section">
      <div className="bg-glow"></div>
      <div className="hero-background">
        <div className="hero-gradient"></div>
        <div className="hero-overlay"></div>
      </div>

      <div className="container hero-content">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 variants={itemVariants} className="hero-title">
            Sana Sheikh<br />
            <span className="highlight">AI Filmmaker</span>
          </motion.h1>

          <motion.p variants={itemVariants} className="hero-subtitle lead-text">
            Multidisciplinary Creative | AI Filmmaker | Visual Story Architect <br />

          </motion.p>

          <motion.div variants={itemVariants} className="hero-actions">
            <a href="#showreel" className="btn btn-primary">Watch Showreel</a>
            <a href="#projects" className="btn">Explore Works</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
