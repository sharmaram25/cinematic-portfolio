"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Gentle reveal
      gsap.fromTo(".contact-line",
         { y: 50, opacity: 0 },
         {
            y: 0, 
            opacity: 1, 
            duration: 1.2, 
            stagger: 0.1, 
            ease: "power3.out",
            scrollTrigger: {
               trigger: containerRef.current,
               start: "top 70%"
            }
         }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="min-h-[80vh] w-full bg-black flex flex-col items-center justify-center relative overflow-hidden py-24">
       
       {/* Subtle background grain/gradient - Classy touch */}
       <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.03),transparent_70%)]" />
       </div>

       <div className="relative z-10 max-w-5xl w-full px-8 md:px-0 flex flex-col md:flex-row justify-between items-start md:items-center gap-16 md:gap-0">
          
          {/* Left: Heading/Invitation */}
          <div className="flex-1">
             <h2 className="contact-line text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
                LET'S <br/>
                <span className="text-gold italic font-serif">CREATE</span> <br/>
                TOGETHER.
             </h2>
             <p className="contact-line text-zinc-500 text-lg md:text-xl font-light tracking-wide max-w-md mt-4">
                Open for engineering leadership roles and ambitious projects.
             </p>
          </div>

          {/* Right: Classy Links List */}
          <div className="flex-1 w-full md:w-auto flex flex-col items-start md:items-end gap-6 md:gap-8">
             {[
                { label: "Email", value: "ram@example.com", href: "mailto:ram@example.com" },
                { label: "LinkedIn", value: "/in/ramsharma", href: "https://linkedin.com" },
                { label: "GitHub", value: "@ramsharma", href: "https://github.com" },
                { label: "Twitter", value: "@ram_dev", href: "https://twitter.com" }
             ].map((link, i) => (
                <a 
                   key={link.label}
                   href={link.href}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="contact-line group flex items-baseline gap-4 text-2xl md:text-3xl font-light text-zinc-400 hover:text-white transition-colors duration-500"
                >
                   <span className="text-sm text-gold tracking-widest uppercase opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                      {link.label}
                   </span>
                   <span className="relative">
                      {link.value}
                      <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-500 ease-out" />
                   </span>
                </a>
             ))}
          </div>
       </div>

       {/* Minimal Footer */}
       <div className="absolute bottom-12 left-0 w-full text-center contact-line opacity-0">
          <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-800">
             © 2026 Ram Sharma • Engineering
          </span>
       </div>

    </section>
  );
}
