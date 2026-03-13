import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scrollY = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = window.innerWidth < 768 ? 40 : 80;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      parallaxFactor: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.parallaxFactor = Math.random() * 0.5 + 0.1; // Different layers of depth
      }

      update() {
        if (!prefersReducedMotion) {
          this.x += this.vx;
          this.y += this.vy;
        }

        if (this.x < 0) this.x = canvas!.width;
        if (this.x > canvas!.width) this.x = 0;
        if (this.y < 0) this.y = canvas!.height;
        if (this.y > canvas!.height) this.y = 0;
      }

      draw(offsetY: number) {
        if (!ctx) return;
        const drawY = (this.y - offsetY * this.parallaxFactor) % canvas!.height;
        const finalY = drawY < 0 ? drawY + canvas!.height : drawY;

        ctx.beginPath();
        ctx.arc(this.x, finalY, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(147, 197, 253, 0.3)';
        ctx.fill();
        return { x: this.x, y: finalY };
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw mesh gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width
      );
      gradient.addColorStop(0, '#0a0a0a');
      gradient.addColorStop(1, '#020617');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const renderedPositions: { x: number, y: number }[] = [];

      particles.forEach((p) => {
        p.update();
        renderedPositions.push(p.draw(scrollY.current));
      });

      // Draw connections based on rendered positions (parallax-aware)
      if (!prefersReducedMotion) {
        for (let i = 0; i < renderedPositions.length; i++) {
          for (let j = i + 1; j < renderedPositions.length; j++) {
            const p1 = renderedPositions[i];
            const p2 = renderedPositions[j];
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 150) {
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(147, 197, 253, ${0.1 * (1 - dist / 150)})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      init();
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      style={{ background: '#0a0a0a' }}
    />
  );
};
