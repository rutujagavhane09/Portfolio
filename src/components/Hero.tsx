import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Download, ArrowDown } from 'lucide-react';
import { Hero3D } from './Hero3D';
import { Magnetic } from './Magnetic';
import resumeData from '../data/resume.json';

export const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  const nameLetters = resumeData.basics.name.split('');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between px-6 pt-32 pb-12 overflow-hidden">
      <Hero3D />
      <div className="flex-1 flex flex-col items-center justify-center w-full">
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : y1, opacity, scale }}
          className="text-center max-w-4xl z-10 mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-medium tracking-widest uppercase"
          >
            Available for new opportunities
          </motion.div>

          <h1 className="w-full max-w-[90vw] text-[clamp(2rem,10vw,6rem)] font-display font-bold tracking-tighter text-white mb-8 leading-tight flex flex-nowrap justify-center whitespace-nowrap uppercase">
            {nameLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1, 
                  delay: 0.2 + i * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="inline-block"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="text-xl md:text-2xl text-white/80 font-serif italic font-medium mb-16 max-w-2xl mx-auto leading-relaxed tracking-tight"
          >
            {resumeData.basics.label}
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Magnetic>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative px-10 py-5 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(255,255,255,0.4)]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View Experience <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                </span>
              </motion.button>
            </Magnetic>

            <Magnetic>
              <motion.a
                href="https://drive.google.com/uc?export=download&id=14PH7xx4rfrgoVuTzVRsq5uFBO_e4Ne3m"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 border border-white/20 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all flex items-center gap-2 backdrop-blur-md cursor-pointer"
              >
                <Download className="w-5 h-5" /> Download Resume
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Stats/Impact Strip */}
      <motion.div
        style={{ y: prefersReducedMotion ? 0 : y2 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.4 }}
        className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 z-10"
      >
        {resumeData.achievements.slice(0, 3).map((achievement, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -5 }}
            className="p-8 rounded-[2rem] liquid-glass hover:border-blue-500/30 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/0 group-hover:bg-blue-500/50 transition-all" />
            <div className="text-blue-400 text-xs font-mono mb-3 uppercase tracking-widest opacity-50">Impact 0{idx + 1}</div>
            <div className="text-xl font-display font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">{achievement.title}</div>
            <div className="text-sm text-white/60 leading-relaxed font-normal">{achievement.context}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative elements */}
      <motion.div 
        style={{ y: prefersReducedMotion ? 0 : useTransform(scrollY, [0, 1000], [0, 200]) }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" 
      />
    </section>
  );
};
