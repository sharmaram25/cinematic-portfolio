"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useScramble } from "@/hooks/useScramble";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const title1 = useScramble("RAM", 35, 0.2, true);
  const title2 = useScramble("SHARMA", 35, 0.2, true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 2;
        const y = (e.clientY / innerHeight - 0.5) * 2;

        gsap.to(".parallax-bg", {
           x: x * 40,
           y: y * 40,
           duration: 1.5,
           ease: "power2.out"
        });
        
        // Image Subtle Tilt
        if (imageRef.current) {
            gsap.to(imageRef.current, {
                rotationY: x * 3, 
                x: -x * 15,
                duration: 2,
                ease: "power3.out"
            });
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-950 perspective-[1000px]">
      
      {/* Background Ambience */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[20%] left-[20%] w-[600px] h-[600px] bg-gold/10 blur-[120px] rounded-full mix-blend-screen animate-pulse parallax-bg" />
          <div className="absolute top-[40%] -right-[10%] w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full mix-blend-screen animate-pulse delay-700 parallax-bg" />
      </div>

      {/* Grid Floor */}
      <div className="absolute bottom-0 w-full h-[50vh] opacity-20 pointer-events-none"
           style={{
               background: 'linear-gradient(to bottom, transparent, black), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
               backgroundSize: '100% 100%, 40px 100%',
               transform: 'perspective(500px) rotateX(60deg) translateY(100px)'
           }}
      />

      {/* MAIN LAYOUT: Split into two distinct zones to prevent overlap */}
      <div className="relative z-10 w-full h-screen max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-0 md:gap-8 px-6 md:px-12 pt-20 md:pt-0">
         
         {/* LEFT ZONE: Typography (Spans 7 cols) */}
         <div className="md:col-span-7 h-full flex flex-col justify-center items-start relative order-2 md:order-1">
             <div className="relative z-20 flex flex-col leading-[0.85]">
                 <h1 className="text-[15vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-zinc-800/80 md:text-zinc-800 whitespace-nowrap parallax-text">
                    {title1}
                 </h1>
                 <h1 className="text-[15vw] md:text-[9rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-gold via-yellow-600 to-transparent whitespace-nowrap pb-4 md:pb-10 parallax-text">
                    {title2}
                 </h1>
             </div>

             {/* Subtext - Positioned below name, clearly separated */}
             <div className="mt-8 md:mt-12 pl-2 md:pl-4 border-l-2 border-gold/30">
                <h2 className="text-sm md:text-xl font-mono tracking-[0.3em] uppercase text-zinc-300 mb-2">
                   Software Engineer
                </h2>
                <h2 className="text-xs md:text-lg font-mono tracking-[0.3em] uppercase text-zinc-500">
                   & Full Stack Developer
                </h2>
             </div>
         </div>

         {/* RIGHT ZONE: Image (Spans 5 cols) */}
         <div className="md:col-span-5 h-[50vh] md:h-full relative flex items-end justify-center md:justify-end order-1 md:order-2 pointer-events-none">
             <div 
                ref={imageRef}
                className="relative w-full h-full md:h-[90%] flex items-end justify-center md:justify-end"
             >
                 <div className="relative w-full h-full max-w-[600px] aspect-[3/4]">
                     <Image 
                        src="/ram.webp" 
                        alt="Ram Sharma"
                        fill
                        className="object-contain object-bottom drop-shadow-[0_0_80px_rgba(0,0,0,0.8)]"
                        priority
                        sizes="(max-width: 768px) 100vw, 600px"
                     />
                     
                     {/* Cinematic Integration */}
                     <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                     <div className="absolute inset-0 bg-gold/5 mix-blend-overlay" />
                 </div>
             </div>
         </div>

      </div>

      {/* Decorative Footer Element */}
      <div className="absolute bottom-10 left-10 md:left-20 z-20 hidden md:flex items-center gap-2 opacity-50">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-[10px] font-mono text-zinc-600">SYS.ONLINE.V4</span>
      </div>

    </section>
  );
}
