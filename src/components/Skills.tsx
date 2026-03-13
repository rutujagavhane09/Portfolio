import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Code2, Palette, Layers, CheckCircle2, Cpu, Sparkles } from 'lucide-react';
import { Skill3D } from './Skill3D';
import resumeData from '../data/resume.json';

const SkillTag = ({ skill, idx }: { skill: string, idx: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ 
        scale: 1.1, 
        y: -5,
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "rgba(59, 130, 246, 0.4)"
      }}
      transition={{ 
        type: 'spring', 
        stiffness: 300, 
        damping: 15,
        delay: idx * 0.02
      }}
      className="px-5 py-2.5 rounded-2xl bg-white/5 border border-white/5 text-sm font-semibold text-white/70 hover:text-white transition-all cursor-default backdrop-blur-md"
    >
      {skill}
    </motion.span>
  );
};

export const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);

  const getIcon = (category: string) => {
    if (category.includes('Design Tools')) return <Palette className="w-6 h-6" />;
    if (category.includes('AI Tools')) return <Sparkles className="w-6 h-6" />;
    if (category.includes('Expertise')) return <Layers className="w-6 h-6" />;
    if (category.includes('Other')) return <CheckCircle2 className="w-6 h-6" />;
    return <Code2 className="w-6 h-6" />;
  };

  return (
    <section ref={sectionRef} className="py-40 px-6 relative overflow-hidden">
      {/* Background Decorative Element */}
      <motion.div 
        style={{ y, rotate, opacity: 0.1 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] border border-white/10 rounded-full -z-10"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-20 mb-32">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-6"
            >
              Technical Arsenal
            </motion.div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tighter leading-tight mb-12 uppercase">
              Expertise <span className="text-white/30 font-serif italic font-medium lowercase">& Tools</span>
            </h2>
            <p className="text-2xl text-white/50 font-serif max-w-xl leading-relaxed italic">
              Bridging the gap between aesthetic design and technical implementation with a robust set of modern tools.
            </p>
          </div>
          <div className="w-full lg:w-2/5 aspect-square relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-[120px] rounded-full" />
            <Skill3D />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {resumeData.skills.map((skillGroup, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
              className="p-10 rounded-[3rem] liquid-glass hover:border-blue-500/30 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-20 transition-opacity">
                <Cpu className="w-24 h-24" />
              </div>

              <div className="flex items-center gap-5 mb-10">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/0 group-hover:shadow-blue-500/20">
                  {getIcon(skillGroup.category)}
                </div>
                <h3 className="text-2xl font-display font-bold text-white">{skillGroup.category}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map((skill, sIdx) => (
                  <SkillTag key={sIdx} skill={skill} idx={sIdx} />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Strip */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-20 border-t border-white/10"
        >
          <div className="flex items-center justify-between mb-12">
            <h3 className="text-3xl font-bold text-white flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-blue-400" /> 
              Verified Certifications
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {resumeData.certifications.map((cert, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 text-sm font-medium text-white/50 hover:text-blue-400 transition-all flex items-center gap-3"
              >
                <div className="w-2 h-2 rounded-full bg-blue-500/50" />
                {cert}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
