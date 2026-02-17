import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Showreel from './components/Showreel';
import About from './components/About';
import Projects from './components/Projects';
import Services from './components/Services';
import Process from './components/Process';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { motion, useScroll, useSpring } from 'framer-motion';

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="portfolio-app">
      <Navbar />
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ scaleX }} />

      <Hero />
      <Showreel />
      <About />
      <Projects />
      <Services />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
