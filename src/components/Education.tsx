import React from 'react';
import { motion } from 'motion/react';
import resumeData from '../data/resume.json';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-32 px-6 bg-white/5">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold mb-32 text-center uppercase tracking-tighter leading-tight">
          Education
        </h2>
        <div className="space-y-16">
          {resumeData.education.map((edu, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex gap-10 items-start group justify-end text-right"
            >
              <div className="order-2 text-blue-500 mt-2">
                <div className="w-5 h-5 rounded-full border-2 border-blue-500 group-hover:bg-blue-500 transition-all shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
              </div>
              <div className="order-1">
                <span className="text-xl text-blue-400 font-serif italic mb-3 block">{edu.dates}</span>
                <h3 className="text-3xl font-display font-bold mb-2 text-white uppercase tracking-tight">{edu.degree}</h3>
                <p className="text-white/60 text-xl font-serif italic">{edu.institution}</p>
                <p className="text-white/40 text-base mt-3 font-medium">{edu.field}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
