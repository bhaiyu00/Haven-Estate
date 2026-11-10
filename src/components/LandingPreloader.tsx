import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface LandingPreloaderProps {
  onComplete: () => void;
}

export const LandingPreloader: React.FC<LandingPreloaderProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const percentTextRef = useRef<HTMLSpanElement>(null);
  const statusTextRef = useRef<HTMLParagraphElement>(null);

  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onComplete();
      return;
    }

    const statuses = [
      'Connecting to verified property registry...',
      'Calibrating architectural portfolios...',
      'Curating Indore, Mumbai & Bengaluru collections...',
      'Welcome to Haven Estates'
    ];

    const ctx = gsap.context(() => {
      // Counter proxy object for GSAP to animate from 0 to 100
      const counterProxy = { val: 0 };

      const tl = gsap.timeline({
        onComplete: () => {
          // Exit curtain animation
          gsap.to(containerRef.current, {
            yPercent: -100,
            duration: 0.75,
            ease: 'power3.inOut',
            onComplete: () => {
              onComplete();
            }
          });
        }
      });

      // Initial Brand reveal
      tl.fromTo(brandRef.current, 
        { opacity: 0, y: 16, letterSpacing: '0.25em' },
        { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.6, ease: 'power2.out' }
      );

      // Animate progress line and counter together
      tl.to(counterProxy, {
        val: 100,
        duration: 1.5,
        ease: 'power2.inOut',
        onUpdate: () => {
          const current = Math.round(counterProxy.val);
          setCounter(current);

          // Update status message dynamically based on progress
          if (statusTextRef.current) {
            if (current < 35) {
              statusTextRef.current.innerText = statuses[0];
            } else if (current < 70) {
              statusTextRef.current.innerText = statuses[1];
            } else if (current < 95) {
              statusTextRef.current.innerText = statuses[2];
            } else {
              statusTextRef.current.innerText = statuses[3];
            }
          }
        }
      }, '-=0.2');

      if (progressLineRef.current) {
        tl.to(progressLineRef.current, {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.inOut',
        }, '<');
      }

      // Small pause at 100% for human eye to register
      tl.to({}, { duration: 0.2 });

    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-500 bg-white flex flex-col justify-between p-6 sm:p-12 text-neutral-900 pointer-events-auto select-none"
      role="dialog"
      aria-modal="true"
      aria-label="Loading Haven Estates"
    >
      {/* Top Bar with coordinates and skip */}
      <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
        <span className="tracking-widest uppercase text-[10px]">IN · ARCHITECTURAL REAL ESTATE</span>
        <button
          onClick={onComplete}
          className="text-neutral-500 hover:text-neutral-900 underline text-xs tracking-wider cursor-pointer font-sans"
        >
          Skip Intro →
        </button>
      </div>

      {/* Center Brand Identity */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <div ref={brandRef} className="mb-6">
          <h1 className="font-display text-4xl sm:text-6xl font-extrabold tracking-widest text-neutral-900">
            HAVEN
          </h1>
          <p className="text-xs sm:text-sm font-medium tracking-[0.3em] uppercase text-neutral-400 mt-2">
            ESTATES & RESIDENCES
          </p>
        </div>

        {/* Minimal Progress Bar */}
        <div className="w-48 sm:w-64 h-[2px] bg-neutral-100 rounded-full overflow-hidden relative mb-4">
          <div
            ref={progressLineRef}
            className="w-full h-full bg-neutral-900 origin-left scale-x-0"
          />
        </div>

        {/* Numeric Progress Counter */}
        <div className="flex items-center gap-2 text-xs font-mono font-medium text-neutral-500 tabular-nums">
          <span ref={percentTextRef} className="font-bold text-neutral-900 text-sm">
            {counter < 10 ? `0${counter}` : counter}%
          </span>
          <span className="text-neutral-300">/</span>
          <span>100</span>
        </div>

        {/* Dynamic Status message */}
        <p
          ref={statusTextRef}
          className="text-xs text-neutral-400 mt-4 tracking-wide transition-opacity duration-300 font-sans"
        >
          Connecting to verified property registry...
        </p>
      </div>

      {/* Bottom Legal & Cities Footnote */}
      <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 pt-6 border-t border-neutral-100 gap-2">
        <span>Indore · Jabalpur · Bhopal · Mumbai · Pune · Bengaluru</span>
        <span className="font-mono text-[10px]">VERIFIED TITLE ARCHITECTURE</span>
      </div>
    </div>
  );
};
