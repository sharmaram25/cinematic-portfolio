"use client";

import { useRef } from "react";

interface ProjectVisualProps {
  type: "ai" | "saas" | "mobile" | "default";
}

export default function ProjectVisual({ type }: ProjectVisualProps) {
  return (
    <div className="w-full h-full bg-zinc-900 border border-white/10 overflow-hidden relative group">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-black opacity-50" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: "radial-gradient(#FFF 1px, transparent 1px)", 
             backgroundSize: "20px 20px" 
           }} 
      />

      <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-700 ease-out">
        {type === "ai" && (
           /* Abstract AI / Drone Eye */
           <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-gold fill-none stroke-[0.5]">
             <circle cx="50" cy="50" r="30" />
             <path d="M 50 20 L 50 80 M 20 50 L 80 50" />
             <rect x="35" y="35" width="30" height="30" transform="rotate(45 50 50)" />
             <circle cx="50" cy="50" r="10" fill="#FFD700" className="opacity-50" />
           </svg>
        )}

        {type === "saas" && (
            /* Abstract Dashboard / Lattice */
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-orange stroke-[0.5] fill-none">
              <rect x="20" y="20" width="60" height="40" rx="2" />
              <line x1="20" y1="35" x2="80" y2="35" />
              <rect x="25" y="45" width="20" height="10" fill="#b45309" className="opacity-50" />
              <rect x="55" y="45" width="20" height="10" />
              <path d="M 20 80 L 80 80 L 90 90 L 10 90 Z" opacity="0.5" />
            </svg>
        )}

        {type === "mobile" && (
            /* Abstract App Interface */
            <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-white stroke-[0.5] fill-none">
               <rect x="35" y="15" width="30" height="70" rx="4" />
               <circle cx="50" cy="75" r="2" />
               <rect x="40" y="25" width="20" height="30" fill="#FFF" className="opacity-20" />
            </svg>
        )}

        {type === "default" && (
             /* Generic Code / Brackets */
             <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-gray-500 stroke-[0.5] fill-none">
               <polyline points="30,30 10,50 30,70" />
               <polyline points="70,30 90,50 70,70" />
               <line x1="45" y1="80" x2="55" y2="20" />
             </svg>
        )}
      </div>

      {/* Overlay Glow on Hover */}
      <div className="absolute inset-0 bg-gold/5 group-hover:bg-gold/10 transition-colors duration-500" />
    </div>
  );
}
