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
  const lineRef = useRef<SVGPathElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const line = lineRef.current;
      
      // Draw the line as we scroll
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
          },
        });
      }

      // Reveal items
      itemsRef.current.forEach((item) => {
        if (item) {
          gsap.fromTo(
            item,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "bottom 60%",
                toggleActions: "play reverse play reverse",
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen py-32 bg-zinc-950 text-white overflow-hidden"
    >
      <div className="absolute top-10 left-10 md:left-20">
         <h2 className="text-gold text-sm tracking-[0.3em] uppercase">Journey</h2>
      </div>

      <div className="max-w-6xl mx-auto relative px-6 md:px-0">
        
        {/* SVG Curve Line Container */}
        <div className="absolute top-0 left-4 md:left-1/2 w-1 h-full -translate-x-1/2 hidden md:block z-0">
          <svg
            className="h-full w-[400px] -ml-[200px] overflow-visible"
            preserveAspectRatio="none"
          >
             {/* 
                Simplified path: straight line down the middle with some sine waves. 
                In a real SVG we'd calculate points dynamically or use a fixed curve.
                Here using a straight line for robustness in this prompt context, but styled as a "gold thread".
                Or a slight curve.
             */}
            <path
              ref={lineRef}
              d="M 200 0 Q 300 300 200 600 T 200 1200"
              fill="none"
              stroke="#FFD700"
              strokeWidth="2"
              className="drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            />
          </svg>
        </div>

        {/* Vertical Line for Mobile */}
        <div className="absolute top-0 left-6 bottom-0 w-[1px] bg-white/10 md:hidden"></div>

        <div className="space-y-32 md:space-y-48 relative z-10">
          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                 itemsRef.current[i] = el;
              }}
              className={`flex flex-col md:flex-row items-center ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Spacer/Connector Node */}
              <div className="hidden md:flex w-full md:w-1/2 justify-center items-center">
                 <div className="w-4 h-4 bg-black border-2 border-gold rounded-full relative shadow-[0_0_15px_rgba(255,165,0,0.8)]">
                    <div className="absolute inset-0 bg-gold animate-ping opacity-20 rounded-full"/>
                 </div>
              </div>

              {/* Content Card */}
              <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                  i % 2 === 0 ? "md:pr-20 md:text-right" : "md:pl-20 md:text-left"
              }`}>
                <span className="text-orange text-xs tracking-widest uppercase mb-2 block">{exp.period}</span>
                <h3 className="text-4xl md:text-5xl font-bold text-white mb-2">{exp.role}</h3>
                <h4 className="text-xl text-gray-400 mb-6 font-light">{exp.company}</h4>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed opacity-80">{exp.desc}</p>
                
                {/* Skills as "Earned" Tokens */}
                <div className={`flex flex-wrap gap-3 ${
                    i % 2 === 0 ? "md:justify-end" : "md:justify-start"
                }`}>
                  {exp.skills.map((skill, s) => (
                    <span key={s} className="px-3 py-1 border border-white/20 rounded-full text-xs text-gold uppercase tracking-wider hover:bg-gold hover:text-black transition-colors duration-300 cursor-default">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
