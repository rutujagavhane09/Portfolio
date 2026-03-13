import React from 'react';
import { motion } from 'motion/react';
import { Palette, Type, Box, Grid, MousePointer2, CheckCircle2 } from 'lucide-react';

const ColorCircle = ({ color, name, hex }: { color: string, name: string, hex: string }) => (
  <div className="flex flex-col items-center gap-4 group">
    <motion.div 
      whileHover={{ scale: 1.1, rotate: 5 }}
      className={`w-24 h-24 rounded-full shadow-2xl ${color} border border-white/10 relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
    </motion.div>
    <div className="text-center">
      <div className="text-white font-bold text-sm mb-1">{name}</div>
      <div className="text-white/40 font-mono text-[10px] uppercase tracking-widest">{hex}</div>
    </div>
  </div>
);

export const DesignSystem: React.FC = () => {
  return (
    <section id="design-system" className="relative py-48 px-6 overflow-hidden bg-[#080808]">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-32"
        >
          <div className="text-blue-500 font-mono text-xs uppercase tracking-[0.4em] mb-6">
            Foundations
          </div>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-display font-extrabold text-white tracking-tighter leading-tight mb-12 uppercase">
            Design <span className="text-white/30 font-serif italic font-medium lowercase">System</span>
          </h2>
          <p className="text-2xl text-white/50 font-serif max-w-2xl leading-relaxed italic">
            A cohesive visual language built on precision, balance, and the interplay of light and shadow.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Colors */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">Color Palette</h3>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <ColorCircle color="bg-brand-blue" name="Primary Blue" hex="#3B82F6" />
              <ColorCircle color="bg-brand-indigo" name="Indigo" hex="#6366F1" />
              <ColorCircle color="bg-brand-purple" name="Purple" hex="#A855F7" />
              <ColorCircle color="bg-[#050505]" name="Deep Black" hex="#050505" />
            </div>
            
            <p className="text-white/40 text-sm leading-relaxed max-w-md">
              Our palette is designed for high-contrast digital environments, utilizing deep blacks and vibrant, neon-inspired accents to create depth and focus.
            </p>
          </motion.div>

          {/* Typography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400">
                <Type className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">Typography</h3>
            </div>

            <div className="space-y-8">
              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Display / Syne</div>
                <div className="text-3xl md:text-5xl lg:text-6xl font-display font-extrabold text-white leading-none uppercase tracking-tighter">
                  The Art of Design
                </div>
              </div>
              
              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Serif / Cormorant Garamond</div>
                <div className="text-3xl md:text-4xl font-serif italic text-white/80 leading-relaxed">
                  Precision is the soul of every great digital experience.
                </div>
              </div>

              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Body / Plus Jakarta Sans</div>
                <div className="text-lg text-white/60 leading-relaxed font-medium">
                  We believe in clarity, accessibility, and aesthetic harmony.
                </div>
              </div>

              <div className="p-8 rounded-3xl liquid-glass border border-white/5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-4">Mono / JetBrains Mono</div>
                <div className="text-sm font-mono text-blue-400 tracking-wider">
                  SYSTEM_STATUS: OPTIMIZED_FOR_VISUAL_IMPACT
                </div>
              </div>
            </div>
          </motion.div>

          {/* Components */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-12"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Box className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-display font-bold text-white">UI Components</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Buttons */}
              <div className="p-10 rounded-[2.5rem] liquid-glass border border-white/5 flex flex-col items-center justify-center gap-8">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Interactive Elements</div>
                <button className="px-8 py-3 bg-white text-black font-bold rounded-full hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all">
                  Primary Action
                </button>
                <button className="px-8 py-3 border border-white/10 bg-white/5 text-white font-bold rounded-full hover:bg-white/10 transition-all">
                  Secondary
                </button>
                <button className="text-blue-400 font-bold text-sm hover:underline underline-offset-8">
                  Ghost Link
                </button>
              </div>

              {/* Cards */}
              <div className="p-10 rounded-[2.5rem] liquid-glass border border-white/5 flex flex-col gap-6">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-2">Surface Styles</div>
                <div className="p-6 rounded-2xl glass border border-white/10">
                  <div className="text-white font-bold mb-2">Glass Surface</div>
                  <div className="text-white/40 text-xs">Subtle blur and border.</div>
                </div>
                <div className="p-6 rounded-2xl glass-dark border border-white/5">
                  <div className="text-white font-bold mb-2">Deep Glass</div>
                  <div className="text-white/40 text-xs">Enhanced contrast for focus.</div>
                </div>
              </div>

              {/* Grid/Layout */}
              <div className="p-10 rounded-[2.5rem] liquid-glass border border-white/5">
                <div className="text-white/40 text-[10px] uppercase tracking-widest mb-8">Layout Principles</div>
                <div className="grid grid-cols-4 gap-2 h-32">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center">
                      <Grid className="w-3 h-3 text-blue-500/40" />
                    </div>
                  ))}
                </div>
                <div className="mt-6 text-white/40 text-xs text-center">
                  12-Column Fluid Grid System
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Brand Values */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 pt-20 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          <div className="space-y-4">
            <MousePointer2 className="w-8 h-8 text-blue-500" />
            <h4 className="text-xl font-display font-bold text-white">Precision</h4>
            <p className="text-white/40 text-sm leading-relaxed">Every pixel is intentional, every interaction is calculated for maximum clarity.</p>
          </div>
          <div className="space-y-4">
            <CheckCircle2 className="w-8 h-8 text-purple-500" />
            <h4 className="text-xl font-display font-bold text-white">Accessibility</h4>
            <p className="text-white/40 text-sm leading-relaxed">Design that works for everyone, prioritizing contrast and semantic structure.</p>
          </div>
          <div className="space-y-4">
            <Palette className="w-8 h-8 text-emerald-500" />
            <h4 className="text-xl font-display font-bold text-white">Aesthetics</h4>
            <p className="text-white/40 text-sm leading-relaxed">Beauty is functional. We create interfaces that are as pleasant to look at as they are to use.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
