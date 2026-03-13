import React from 'react';
import { motion } from 'motion/react';
import resumeData from '../data/resume.json';

export const Workflow: React.FC = () => {
  return (
    <section id="workflow" className="relative py-48 px-6 bg-[#050505] overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 -right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-blue-500 font-mono text-xs mb-6 tracking-[0.4em] uppercase">
              Methodology
            </div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-tight mb-12 text-white uppercase">
              Design <span className="text-white/30 font-serif italic font-medium lowercase">Workflow</span>
            </h2>
            <p className="text-white/50 text-2xl font-serif max-w-md leading-relaxed italic">
              A systematic approach to solving complex problems through research, strategy, and high-fidelity execution.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20">
            {resumeData.workflow.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
              >
                <div className="text-9xl font-black text-white/[0.02] group-hover:text-blue-500/[0.05] transition-colors duration-700 mb-[-3rem] font-display select-none">
                  {item.step}
                </div>
                <div className="relative z-10 pl-6 border-l border-white/10 group-hover:border-blue-500 transition-all duration-500">
                  <h3 className="text-2xl font-display font-extrabold mb-4 text-white tracking-tight group-hover:text-blue-400 transition-colors uppercase">
                    {item.title}
                  </h3>
                  <p className="text-white/40 text-base leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
