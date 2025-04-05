import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Twitter, Terminal, Code2, Cloud, Database, Shield, Mail } from 'lucide-react';
import { Logo } from './Logo';

const navItems = [
  { name: 'Home', icon: <Terminal className="w-5 h-5" />, href: '#home' },
  { name: 'About', icon: <Code2 className="w-5 h-5" />, href: '#about' },
  { name: 'Projects', icon: <Cloud className="w-5 h-5" />, href: '#projects' },
  { name: 'Skills', icon: <Database className="w-5 h-5" />, href: '#skills' },
  { name: 'Certifications', icon: <Shield className="w-5 h-5" />, href: '#certifications' },
  { name: 'Contact', icon: <Mail className="w-5 h-5" />, href: '#contact' },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-4 bg-black/50 backdrop-blur-md' : 'py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <a href="#home" className="flex-shrink-0 -ml-3">
            <Logo />
          </a>

          {/* Center Container for Nav Links */}
          <div className="flex-1 flex justify-center">
            {/* Navigation Links */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="relative group px-3 py-2 rounded-lg"
                  onHoverStart={() => setHoveredItem(item.name)}
                  onHoverEnd={() => setHoveredItem(null)}
                >
                  {/* Hover Background Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredItem === item.name ? 1 : 0 }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-lg"
                    initial={{ boxShadow: '0 0 0 0 rgba(59, 130, 246, 0)' }}
                    animate={{
                      boxShadow: hoveredItem === item.name
                        ? '0 0 20px 5px rgba(59, 130, 246, 0.3)'
                        : '0 0 0 0 rgba(59, 130, 246, 0)'
                    }}
                    transition={{ duration: 0.2 }}
                  />

                  {/* Content */}
                  <div className="relative flex items-center gap-1.5">
                    <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
                      {item.icon}
                    </span>
                    <span className="text-gray-300 group-hover:text-white transition-colors">
                      {item.name}
                    </span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center gap-4">
            {[
              { icon: <Github className="w-5 h-5" />, href: 'https://github.com/mooazsayyed/', color: 'hover:text-purple-400' },
              { icon: <Linkedin className="w-5 h-5" />, href: 'https://www.linkedin.com/in/mooazsayyed/', color: 'hover:text-blue-400' },
              { icon: <Twitter className="w-5 h-5" />, href: 'https://x.com/MooazSayyed', color: 'hover:text-cyan-400' },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-colors`}
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-gray-300 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-4 space-y-4 bg-black/50 backdrop-blur-md rounded-lg p-4"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  whileHover={{ x: 10 }}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </motion.a>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                {[
                  { icon: <Github className="w-5 h-5" />, href: 'https://github.com', color: 'hover:text-purple-400' },
                  { icon: <Linkedin className="w-5 h-5" />, href: 'https://linkedin.com', color: 'hover:text-blue-400' },
                  { icon: <Twitter className="w-5 h-5" />, href: 'https://twitter.com', color: 'hover:text-cyan-400' },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-gray-400 ${social.color} transition-colors`}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}; 