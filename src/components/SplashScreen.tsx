import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Logo3D from './Logo3D';

export const SplashScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 15);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#030014]"
    >
      <div className="w-full max-w-md px-12">
        <Logo3D />
        
        <div className="mt-12 h-1 w-full bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center font-mono text-[10px] uppercase tracking-widest text-indigo-300/50">
          <span>Initializing Experience</span>
          <span>{progress}%</span>
        </div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
