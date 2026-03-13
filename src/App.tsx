/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { SplashScreen } from './components/SplashScreen';
import { CustomCursor } from './components/CustomCursor';
import { Scene3D } from './components/Scene3D';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { DesignSystem } from './components/DesignSystem';
import { Workflow } from './components/Workflow';
import { Skills } from './components/Skills';
import { Education } from './components/Education';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-blue-200 cursor-none">
      <CustomCursor />
      <AnimatePresence mode="wait">
        {showSplash ? (
          <SplashScreen key="splash" onComplete={() => setShowSplash(false)} />
        ) : (
          <main key="content" className="relative">
            <Scene3D />
            <Navbar />
            
            <div className="relative z-10">
              <Hero />
              
              <div id="experience">
                <Experience />
              </div>

              <div id="projects">
                <Projects />
              </div>

              <div id="design-system">
                <DesignSystem />
              </div>

              <Workflow />
              
              <div id="skills">
                <Skills />
              </div>
              
              <div id="education">
                <Education />
              </div>

              <footer id="contact" className="py-20 px-6 text-center border-t border-white/5">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-2xl font-bold tracking-tighter">
                    RG<span className="text-blue-500">.</span>
                  </div>
                  <div className="text-white/40 text-sm">
                    © 2024 Rutuja Gavhane. Built with precision and passion.
                  </div>
                  <div className="flex gap-6">
                    <a href="#" className="text-white/40 hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="text-white/40 hover:text-white transition-colors">Terms</a>
                  </div>
                </div>
              </footer>
            </div>
          </main>
        )}
      </AnimatePresence>
    </div>
  );
}
