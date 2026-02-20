"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "Architecting Systems",
    company: "Senior Engineering",
    period: "2023 - Present",
    desc: "Defining the digital infrastructure for enterprise-scale sovereignty.",
    skills: ["System Design", "Cloud Native", "Leadership"],
  },
  {
    role: "Forging Interfaces",
    company: "Lead Frontend",
    period: "2021 - 2023",
    desc: "Crafting pixel-perfect narratives that bridge human intent and machine logic.",
    skills: ["React Ecosystem", "Performance", "Motion"],
  },
  {
    role: "Engineering Core",
    company: "Full Stack Dev",
    period: "2019 - 2021",
    desc: "Building the engine rooms of data-heavy applications.",
    skills: ["Node.js", "Database Design", "API Security"],
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linePathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = linePathRef.current;
      
      // 1. The God Thread Animation
      if (line) {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });

        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top center",
            end: "bottom center",
            scrub: 1,
            // markers: true, // debug
          },
        });
      }

      // 2. Text & Beam Animation
      const items = gsap.utils.toArray(".experience-item");
      items.forEach((item: unknown, i) => {
        const el = item as HTMLElement;
        const content = el.querySelector(".content");
        const beam = el.querySelector(".beam");
        const dot = el.querySelector(".dot");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top 70%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Animate Dot
        tl.fromTo(dot, { scale: 0 }, { scale: 1, duration: 0.3, ease: "back.out(1.7)" })
        // Shoot Beam
          .fromTo(beam, { scaleX: 0 }, { scaleX: 1, duration: 0.4, ease: "power2.out" }, "-=0.2")
        // Reveal Text
          .fromTo(content, { opacity: 0, x: i % 2 === 0 ? -20 : 20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.3");
          
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 bg-zinc-950 text-white overflow-hidden"
    >
      <div className="absolute top-10 left-6 md:left-20 z-20">
         <h2 className="text-gold text-sm tracking-[0.5em] uppercase font-bold">Timeline</h2>
      </div>

      <div className="max-w-7xl mx-auto relative px-4 md:px-0">
        
        {/* SVG Curve Container - Full Screen Width for dramatic curves */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 hidden md:block overflow-visible">
            <svg 
                className="w-full h-full overflow-visible" 
                viewBox="0 0 1440 1800" 
                preserveAspectRatio="xMidYMin slice"
            >
                <defs>
                    <linearGradient id="line-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#FFD700" stopOpacity="0" />
                        <stop offset="15%" stopColor="#FFD700" stopOpacity="1" />
                        <stop offset="85%" stopColor="#FFD700" stopOpacity="1" />
                        <stop offset="100%" stopColor="#FFD700" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* 
                    Corrected Bezier:
                    Starts VERTICAL (Control point x=720) to avoid "abrupt" header cut.
                    Weaves left, then right, then ends VERTICAL.
                */}
                <path
                    ref={linePathRef}
                    d="M 720 0 C 720 300, 200 600, 720 1000 S 720 1700, 720 2000"
                    fill="none"
                    stroke="url(#line-gradient)"
                    strokeWidth="4"
                    className="drop-shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                    vectorEffect="non-scaling-stroke"
                />
            </svg>
        </div>
        
        {/* Straight Line for Mobile */}
        <div className="absolute top-0 left-6 bottom-0 w-[2px] bg-white/10 md:hidden" />

        <div className="space-y-32 relative z-10 pt-20">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`flex flex-col md:flex-row items-center experience-item relative ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
                {/* Center Anchor Point (Hidden on mobile, used for desktop alignment) */}
               <div className="hidden md:flex w-1/2 justify-center items-center relative">
                   {/* The Dot on the Line */}
                   <div className={`dot w-4 h-4 rounded-full bg-black border-2 border-gold absolute ${i % 2 === 0 ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2"}`} style={{ left: '50%', transform: 'translateX(-50%)' }}></div>
               </div>

              {/* Content Side */}
              <div className={`w-full md:w-1/2 relative ${
                  i % 2 === 0 ? "md:pr-24 md:text-right" : "md:pl-24 md:text-left text-left pl-12"
              }`}>
                
                {/* Connection Beam (Desktop) */}
                <div 
                    className={`beam hidden md:block absolute top-8 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent w-20 opacity-50
                    ${i % 2 === 0 ? "right-0 origin-right" : "left-0 origin-left"}
                    `}
                />

                <div className="content">
                    <span className="text-orange font-mono text-xs tracking-widest uppercase mb-3 block">
                        {exp.period}
                    </span>

                    <h3 className="text-5xl md:text-6xl font-black text-white mb-2 leading-tight uppercase hover:text-gold transition-colors duration-300">
                        {exp.role}
                    </h3>
                    
                    <h4 className="text-lg md:text-xl font-light text-zinc-400 mb-6 tracking-wide">
                        {exp.company}
                    </h4>

                    <p className="text-zinc-300 leading-relaxed max-w-md ml-auto mr-auto md:ml-0 md:mr-0 opacity-80">
                        {exp.desc}
                    </p>

                    {/* Minimal Skills - No borders, just clean text */}
                    <div className={`flex flex-wrap gap-x-6 gap-y-2 mt-6 ${
                        i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                    }`}>
                        {exp.skills.map((skill, s) => (
                            <span key={s} className="text-xs font-bold uppercase tracking-wider text-zinc-500 hover:text-white transition-colors cursor-default">
                                / {skill}
                            </span>
                        ))}
                    </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
