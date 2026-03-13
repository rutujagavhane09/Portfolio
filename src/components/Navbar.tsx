import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Design', href: '#design-system' },
    { name: 'Workflow', href: '#workflow' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-500 ${isScrolled ? 'py-4' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-3xl font-display font-black tracking-tighter text-white uppercase"
        >
          RG<span className="text-blue-500">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-2 p-1.5 rounded-full border border-white/5 bg-white/5 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
        </div>

        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:block px-6 py-2.5 rounded-full bg-white text-black text-sm font-bold hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all"
        >
          Hire Me
        </motion.button>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-2xl font-display font-extrabold text-white/60 hover:text-white transition-colors uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <button className="mt-4 w-full py-4 rounded-2xl bg-blue-600 text-white font-bold">
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
