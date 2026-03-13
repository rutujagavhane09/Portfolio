import React, { useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, useMotionValue, useSpring } from 'motion/react';
import { ExternalLink, Layout, Monitor, Smartphone, ArrowUpRight, Zap, Mic, Home } from 'lucide-react';
import resumeData from '../data/resume.json';

const IconMap: Record<string, React.ComponentType<any>> = {
  Layout,
  Monitor,
  Smartphone,
  Zap,
  Mic,
  Home
};

const ProjectCard = ({ project, idx }: { project: any, idx: number }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const isLarge = idx === 0 || idx === 3;
  const ProjectIcon = IconMap[project.logo] || Layout;

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: idx * 0.1,
        type: 'spring',
        stiffness: 100,
        damping: 15
      }}
      className={`group relative block p-8 rounded-[3rem] liquid-glass hover:border-blue-500/40 transition-all duration-500 overflow-hidden shadow-2xl shadow-black/40 ${isLarge ? 'md:col-span-2 md:row-span-2' : ''}`}
    >
      <div 
        style={{ transform: "translateZ(100px)", transformStyle: "preserve-3d" }}
        className="absolute top-8 right-8 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0"
      >
        <div className="w-12 h-12 rounded-2xl bg-white text-black flex items-center justify-center shadow-xl">
          <ArrowUpRight className="w-6 h-6" />
        </div>
      </div>

      <div 
        style={{ transform: "translateZ(60px)" }}
        className={`relative mb-8 rounded-[2rem] overflow-hidden bg-zinc-900/80 border border-white/5 group-hover:shadow-2xl transition-all duration-700 ${isLarge ? 'h-[400px]' : 'h-[250px]'}`}
      >
        <motion.img 
          src={project.image} 
          alt={project.title}
          className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            if (!target.src.includes('picsum')) {
              target.src = `https://picsum.photos/seed/${encodeURIComponent(project.title)}/1200/800`;
            }
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-4 left-4 z-10">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-extrabold uppercase tracking-widest">
            <ProjectIcon className="w-3 h-3" />
            {project.category}
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h3 
          style={{ transform: "translateZ(40px)" }}
          className="text-4xl font-display font-bold text-white mb-4 group-hover:text-blue-400 transition-colors duration-500 leading-tight"
        >
          {project.title}
        </h3>
        
        <p 
          style={{ transform: "translateZ(30px)" }}
          className="text-white/60 text-base mb-6 line-clamp-2 leading-relaxed font-normal"
        >
          {project.description}
        </p>

        {project.useCase && (
          <div 
            style={{ transform: "translateZ(20px)" }}
            className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5"
          >
            <span className="text-[10px] uppercase tracking-widest text-blue-400 font-extrabold block mb-2">Use Case</span>
            <p className="text-white/60 text-sm leading-relaxed font-medium italic">
              "{project.useCase}"
            </p>
          </div>
        )}

        <div 
          style={{ transform: "translateZ(50px)" }}
          className="flex items-center gap-3 text-blue-400 text-sm font-bold opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
        >
          <span>Explore Case Study</span>
          <div className="w-8 h-px bg-blue-400 transition-all group-hover:w-12" />
        </div>
      </div>

      {/* Background Glows */}
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] group-hover:bg-blue-500/20 transition-all duration-1000" />
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] group-hover:bg-purple-500/20 transition-all duration-1000" />
    </motion.a>
  );
};

export const Projects: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <section id="projects" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          style={{ y: prefersReducedMotion ? 0 : y }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
        >
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-blue-500 font-mono text-xs mb-4 tracking-[0.3em] uppercase"
            >
              Selected Work
            </motion.div>
            <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold text-white mb-12 tracking-tighter leading-tight uppercase">
              Featured <span className="text-blue-400 font-serif italic font-medium lowercase">Projects</span>
            </h2>
            <p className="text-white/50 text-2xl font-serif italic leading-relaxed">
              A curated collection of digital experiences where design meets motion.
            </p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <a 
              href={resumeData.basics.links.find(l => l.label === 'Behance')?.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black transition-all duration-500"
            >
              <span className="font-bold">View All Projects</span>
              <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-black/10 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-5 h-5" />
              </div>
            </a>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 auto-rows-[minmax(300px,auto)]">
          {resumeData.projects.map((project, idx) => (
            <ProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};
