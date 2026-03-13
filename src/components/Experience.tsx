import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp, Star } from 'lucide-react';
import { Timeline3D } from './Timeline3D';
import resumeData from '../data/resume.json';

export const Experience: React.FC = () => {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="experience" ref={sectionRef} className="relative py-48 px-6 overflow-hidden">
      <Timeline3D />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          style={{ y: prefersReducedMotion ? 0 : y, opacity }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-32 gap-8"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-6"
            >
              Professional Journey
            </motion.div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tighter leading-tight mb-12 uppercase">
              Career <span className="text-white/30 font-serif italic font-medium lowercase">Timeline</span>
            </h2>
          </div>
          
          <div className="hidden md:block text-right max-w-xs">
            <div className="text-white/50 text-xl font-serif leading-relaxed italic">
              A decade of crafting digital excellence and leading design innovation.
            </div>
          </div>
        </motion.div>

        <div className="space-y-10 relative">
          {/* Vertical Line Decoration */}
          <div className="absolute left-[2.25rem] top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/20 to-blue-500/0 hidden md:block" />

          {resumeData.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.1,
                type: 'spring',
                stiffness: 50
              }}
              className={`group relative rounded-[3rem] liquid-glass transition-all duration-700 overflow-hidden ${
                expandedIdx === idx 
                  ? 'bg-white/[0.08] border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.4)] scale-[1.02]' 
                  : 'hover:border-white/10 hover:bg-white/[0.06]'
              }`}
            >
              <button
                onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
                className="w-full p-10 md:p-12 flex flex-col md:flex-row md:items-center justify-between gap-8 text-left relative z-10"
              >
                <div className="flex items-start gap-8">
                  <div className={`p-6 rounded-[2rem] transition-all duration-500 shadow-2xl ${
                    expandedIdx === idx 
                      ? 'bg-blue-500 text-white rotate-12 scale-110 shadow-blue-500/40' 
                      : 'bg-white/5 text-white/40 group-hover:bg-white/10 group-hover:rotate-6'
                  }`}>
                    <Briefcase className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors">
                      {exp.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-6 text-base text-white/60 font-semibold">
                      <span className="flex items-center gap-2"><Star className="w-4 h-4 text-blue-400" /> {exp.company}</span>
                      <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {exp.dates}</span>
                      <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {exp.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden xl:flex gap-3">
                    {exp.metrics.map((m, i) => (
                      <span key={i} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-extrabold uppercase tracking-widest text-white/70 backdrop-blur-md">
                        {m}
                      </span>
                    ))}
                  </div>
                  <motion.div 
                    animate={{ rotate: expandedIdx === idx ? 180 : 0 }}
                    className="p-4 rounded-full bg-white/5 text-white/40 border border-white/10"
                  >
                    <ChevronDown className="w-6 h-6" />
                  </motion.div>
                </div>
              </button>

              <AnimatePresence>
                {expandedIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <div className="px-10 md:px-12 pb-12 pt-0 md:pl-40">
                      <div className="h-px w-full bg-white/10 mb-10" />
                      <ul className="space-y-6">
                        {exp.bullets.map((bullet, bIdx) => (
                          <motion.li
                            key={bIdx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + bIdx * 0.08 }}
                            className="flex items-start gap-5 text-white/70 text-lg leading-relaxed font-medium group/item"
                          >
                            <div className="mt-3 w-2 h-2 rounded-full bg-blue-500 shrink-0 group-hover/item:scale-150 transition-transform shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                            {bullet}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Decorative Background Element */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -z-10 pointer-events-none group-hover:bg-blue-500/10 transition-all duration-1000" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
