"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DigitalPresence() {
  const svgRef = useRef<SVGSVGElement>(null);
  const ringsRef = useRef<SVGGElement>(null);
  const coreRef = useRef<SVGGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Rotate the outer rings
      gsap.to(ringsRef.current, {
        rotation: 360,
        transformOrigin: "center center",
        duration: 20,
        repeat: -1,
        ease: "none",
      });

      // 2. Pulse the core
      gsap.to(coreRef.current, {
        scale: 1.05,
        transformOrigin: "center center",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 3. Floating effect for the whole SVG
      gsap.to(svgRef.current, {
        y: -15,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center pointer-events-none select-none">
      <svg
        ref={svgRef}
        viewBox="0 0 500 500"
        className="w-full h-full max-w-[600px] opacity-80 mix-blend-screen"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <radialGradient id="gold-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFD700" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <filter id="glow-filter">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Glow */}
        <circle cx="250" cy="250" r="200" fill="url(#gold-glow)" opacity="0.2" />

        {/* ROTATING RINGS */}
        <g ref={ringsRef}>
          {/* Tech Ring 1 */}
          <circle
            cx="250"
            cy="250"
            r="180"
            fill="none"
            stroke="#b45309" /* Orange-700 */
            strokeWidth="1"
            strokeDasharray="10 20"
            opacity="0.5"
          />
          {/* Tech Ring 2 */}
          <circle
            cx="250"
            cy="250"
            r="200"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            strokeDasharray="4 8"
            opacity="0.3"
          />
           {/* Tech Ring 3 - Asymmetrical */}
           <path 
             d="M 250 30 A 220 220 0 0 1 470 250"
             fill="none"
             stroke="#FFD700"
             strokeWidth="1"
             opacity="0.4"
           />
           <path 
             d="M 250 470 A 220 220 0 0 1 30 250"
             fill="none"
             stroke="#b45309"
             strokeWidth="1"
             opacity="0.4"
           />
           {/* Scanning Beam */}
           <rect x="250" y="50" width="2" height="400" fill="url(#gold-glow)" opacity="0.5" className="animate-spin-slow origin-center" style={{ animationDuration: '8s' }} />
        </g>

        {/* CENTRAL CORE - Abstract Silhouette / Brain */}
        <g ref={coreRef} filter="url(#glow-filter)">
          {/* Abstract Head Shape */}
          <path
            d="M 250 150 C 200 150 180 200 180 240 C 180 300 200 350 250 350 C 300 350 320 300 320 240 C 320 200 300 150 250 150 Z"
            fill="none"
            stroke="#FFD700"
            strokeWidth="2"
            opacity="0.8"
          />
          
          {/* Neural/Data Connections within Head */}
          <path d="M 250 160 L 250 340" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <path d="M 200 240 L 300 240" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <path d="M 215 200 L 285 280" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>
          <path d="M 285 200 L 215 280" stroke="#FFD700" strokeWidth="0.5" opacity="0.3"/>

          {/* New: Data Stream Particles */}
          <circle cx="250" cy="150" r="2" fill="#FFF" className="animate-ping" style={{ animationDuration: '3s' }} />
          
          {/* Shoulders / Base */}
          <path
             d="M 120 400 L 150 350 H 350 L 380 400"
             fill="none"
             stroke="#b45309"
             strokeWidth="2"
             strokeDasharray="5 5"
          />
        </g>
        
        {/* Floating Data Nodes */}
        <circle cx="200" cy="200" r="3" fill="#FFF" className="animate-pulse" />
        <circle cx="300" cy="180" r="2" fill="#FFD700" className="animate-pulse" style={{animationDelay: "0.5s"}}/>
        <circle cx="250" cy="280" r="4" fill="#b45309" className="animate-pulse" style={{animationDelay: "1s"}}/>

      </svg>
    </div>
  );
}
