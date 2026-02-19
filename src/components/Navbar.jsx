import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Showreel', href: '#showreel' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container nav-container">

                {/* Logo */}
                <motion.div
                    className="nav-logo"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <a href="#home">
                        SANA<span className="highlight">SHEIKH</span>
                    </a>
                </motion.div>

                {/* Desktop Menu */}
                <div className="nav-desktop">
                    {navLinks.map((link, index) => (
                        <motion.a
                            key={link.name}
                            href={link.href}
                            className="nav-link"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {link.name}
                        </motion.a>
                    ))}
                </div>

                {/* Mobile Toggle */}
                <div
                    className="nav-mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="nav-mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="mobile-link"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
