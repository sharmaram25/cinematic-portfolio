"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const techCategories = [
  {
    title: "Command Languages",
    items: ["TypeScript", "Python", "Dart", "SQL", "Go"],
  },
  {
    title: "Core Frameworks",
    items: ["Next.js 14", "React Native", "Flutter", "Node.js", "Express"],
  },
  {
    title: "Infrastructure",
    items: ["Docker", "AWS Lambda", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    title: "Visual Engineering",
    items: ["GSAP", "Three.js", "Tailwind v4", "Figma", "Blender"],
  },
];

export default function TechArsenal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered Reveal of Grid Items
      gsap.fromTo(
        ".arsenal-item",
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.05,
          duration: 0.8,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-black text-white relative border-t border-zinc-900">
        
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-16">
           <span className="text-gold text-xs tracking-[0.4em] uppercase block mb-2">System Loadout</span>
           <h2 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">Tech Arsenal</h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {techCategories.map((cat, i) => (
            <div key={i} className="space-y-6">
              <h3 className="text-xl font-light text-zinc-500 border-b border-zinc-800 pb-2 flex items-center gap-2">
                 <span className="w-2 h-2 bg-orange rounded-full" />
                 {cat.title}
              </h3>
              <div className="grid grid-cols-1 gap-3">
                 {cat.items.map((item, j) => (
                   <div 
                      key={j} 
                      className="arsenal-item group relative bg-zinc-900/40 border border-white/5 p-4 hover:bg-zinc-800/60 transition-colors duration-300"
                   >
                      {/* Corner Accents */}
                      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-gold/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex items-center justify-between">
                         <span className="font-mono text-sm tracking-wide group-hover:text-gold transition-colors">{item}</span>
                         <span className="text-[10px] text-zinc-600 group-hover:text-orange">Lvl.MAX</span>
                      </div>
                      
                      {/* Hover Progress Bar effect */}
                      <div className="absolute bottom-0 left-0 h-[1px] bg-gold/50 w-0 group-hover:w-full transition-all duration-700 ease-in-out" />
                   </div>
                 ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
