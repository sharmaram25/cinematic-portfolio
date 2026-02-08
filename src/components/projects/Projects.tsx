"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectVisual from "./ProjectVisual";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "Smart Agriculture AI",
    category: "AI / IoT",
    description: "Autonomous drone mapping & soil analysis system for Indian farmlands.",
    year: "2025",
  },
  {
    id: 2,
    title: "Student Productivity",
    category: "SaaS Platform",
    description: "Focus-enhancement ecosystem built for absolute academic sovereignty.",
    year: "2024",
  },
  {
    id: 3,
    title: "Demographic Data",
    category: "Data Visualization",
    description: "Real-time population analytics dashboard for policy makers.",
    year: "2023",
  },
  {
    id: 4,
    title: "EdTech Scale",
    category: "Cloud Infrastructure",
    description: "High-concurrency learning platform serving 1M+ daily active users.",
    year: "2024",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const scrollContainer = scrollContainerRef.current;
      const container = containerRef.current;
      
      if (!scrollContainer || !container) return;

      // Use matchMedia for robust mobile/desktop splitting
      ScrollTrigger.matchMedia({
        // Desktop
        "(min-width: 768px)": function() {
          const totalWidth = scrollContainer.scrollWidth;
          const viewportWidth = window.innerWidth;

          gsap.to(scrollContainer, {
            x: () => -(totalWidth - viewportWidth),
            ease: "none",
            scrollTrigger: {
              trigger: container,
              start: "top top",
              end: () => `+=${totalWidth}`,
              pin: true,
              scrub: 1,
              invalidateOnRefresh: true,
            },
          });
        },
        // Mobile - Clean up or specific mobile interactions could go here if needed
        "(max-width: 767px)": function() {
           // Ensure no pinning/horizontal scroll happens here
           // The CSS layout handles the stacking
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-black overflow-hidden py-10 md:py-0">
      
      <div className="md:hidden px-6 mb-10">
         <h2 className="text-gold text-sm tracking-[0.3em] uppercase">Selected Works</h2>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-col md:flex-row h-auto md:h-screen w-full md:w-fit gap-16 md:gap-0"
      >
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="group relative w-full md:w-[70vw] h-[60vh] md:h-screen flex flex-col justify-center px-6 md:px-16 border-r border-white/5 bg-black shrink-0 transition-colors duration-500 hover:bg-zinc-950"
          >
            {/* Project Number */}
            <span className="absolute top-4 right-6 md:top-16 md:right-16 text-5xl md:text-8xl font-bold text-white/5 select-none group-hover:text-gold/10 transition-colors duration-500">
              0{index + 1}
            </span>

            <div className="relative z-10 transform transition-transform duration-700 group-hover:-translate-y-2 max-w-4xl mx-auto w-full">
                <div className="relative aspect-[16/9] md:aspect-[21/9] bg-zinc-900/50 overflow-hidden border border-white/5 mb-6 group-hover:border-gold/30 transition-colors duration-500 w-full rounded-sm">
                   {/* Project Visual */}
                   <ProjectVisual type={project.category.includes("AI") ? "ai" : project.category.includes("SaaS") ? "saas" : "mobile"} />
                   
                   {/* Overlay - Always visible on mobile, hover on desktop */}
                   <div className="absolute inset-0 flex flex-col items-center justify-center opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 gap-4 bg-black/60 backdrop-blur-sm p-4">
                      
                      {/* Prominent GitHub Button */}
                      <a 
                        href="https://github.com" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 bg-gold text-black px-6 py-2 md:px-8 md:py-3 rounded-full font-bold uppercase tracking-wider hover:bg-orange hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:shadow-[0_0_30px_rgba(255,165,0,0.5)] cursor-pointer"
                      >
                         <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                         </svg>
                         Source Code
                      </a>
                   </div>
                </div>

              <span className="text-orange text-xs md:text-sm tracking-widest uppercase mb-2 block group-hover:translate-x-2 transition-transform duration-300">
                {project.category} — {project.year}
              </span>
              
              <h3 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-4 uppercase leading-[0.9] tracking-tighter w-full break-words">
                {project.title}
              </h3>
              
              <p className="max-w-xl text-gray-400 text-sm md:text-lg font-light">
                {project.description}
              </p>
            </div>

            {/* Decorative Lines */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10 group-hover:bg-orange/50 transition-colors duration-500 md:block hidden" />
          </div>
        ))}
        
        {/* End Spacer for Scrolling Feel - Desktop Only */}
        <div className="hidden md:flex w-[20vw] h-screen bg-black items-center justify-center shrink-0 border-r border-white/5">
           <h3 className="text-white/20 text-4xl font-light transform -rotate-90 whitespace-nowrap">Next &rarr; Experience</h3>
        </div>
      </div>
    </section>
  );
}
