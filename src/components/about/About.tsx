"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal lines
      const lines = textRef.current?.children;
      if (lines) {
         gsap.fromTo(lines,
            { y: 50, opacity: 0, rotationX: 20 },
            {
               y: 0,
               opacity: 1,
               rotationX: 0,
               stagger: 0.2,
               duration: 1.5,
               ease: "power3.out",
               scrollTrigger: {
                  trigger: containerRef.current,
                  start: "top 60%",
                  toggleActions: "play none none reverse"
               }
            }
         );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-black text-white flex flex-col items-center justify-center py-20 px-6 md:px-0 overflow-hidden"
    >
      {/* Background - Subtle animated gradient orb */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] animate-pulse pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px] animate-pulse delay-1000 pointer-events-none" />

      <div className="max-w-4xl w-full relative z-10 perspective-[1000px]">
        <h2 className="text-gold text-xs md:text-sm tracking-[0.5em] uppercase mb-12 pl-2 border-l border-gold/30">Philosophy</h2>
        
        <div ref={textRef} className="space-y-12 md:space-y-16 text-3xl md:text-5xl lg:text-6xl font-light leading-[1.2] tracking-tight transform-style-3d">
          <p className="about-line opacity-0 will-change-transform transform-origin-bottom">
            Code is not just syntax.
          </p>
          <p className="about-line opacity-0 will-change-transform transform-origin-bottom">
            It is the <span className="text-white font-semibold">architecture</span> of a sovereign mind.
          </p>
          <p className="about-line opacity-0 will-change-transform transform-origin-bottom">
            I craft systems that <span className="text-gold italic font-serif">breathe</span> efficiency.
          </p>
          <p className="about-line opacity-0 will-change-transform transform-origin-bottom">
            Where every pixel has a <span className="text-orange">purpose</span>.
          </p>
          <p className="about-line opacity-0 will-change-transform transform-origin-bottom text-xl md:text-2xl text-zinc-500 pt-8 font-mono tracking-widest uppercase">
             {"// Ram Sharma • 2026"}
          </p>
        </div>
      </div>
    </section>
  );
}
