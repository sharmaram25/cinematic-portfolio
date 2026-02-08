"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Enable high-performance GSAP ticker
    gsap.ticker.lagSmoothing(0);

    // Physics constants - TIGHTER AND SNAPPIER
    const pos = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };
    const speed = 0.2; // Higher = faster follow (less "lag")

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const xFollowerSet = gsap.quickSetter(follower, "x", "px");
    const yFollowerSet = gsap.quickSetter(follower, "y", "px");

    const moveCursor = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Main cursor is INSTANT
      xSet(mouse.x);
      ySet(mouse.y);
    };

    // Ticker for smooth follower interpolation
    const loop = () => {
      // Linear interpolation (Lerp) for smoothness but TIGHT control
      pos.x += (mouse.x - pos.x) * speed;
      pos.y += (mouse.y - pos.y) * speed;

      xFollowerSet(pos.x);
      yFollowerSet(pos.y);
      
      // Calculate velocity for stretch effect
      const deltaX = mouse.x - pos.x;
      const deltaY = mouse.y - pos.y;
      const velocity = Math.sqrt(deltaX**2 + deltaY**2);
      const scaleValue = Math.min(velocity * 0.005, 0.5); // Cap stretch
      const rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

      // Stretch the follower based on movement speed ("Cyber" feel)
      gsap.set(follower, { 
          rotation: rotation,
          scaleX: 1 + scaleValue,
          scaleY: 1 - scaleValue * 0.5,
          overwrite: "auto"
      });
    };

    gsap.ticker.add(loop);

    // Interactive States
    const handleHover = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const isInteractive = 
          target.closest("a") || 
          target.closest("button") || 
          target.closest(".interactive") ||
          ["a", "button", "input", "textarea"].includes(target.tagName.toLowerCase());
  
        if (isInteractive) {
          // LOCK ON STATE: Diamond expands, Follower snaps
          gsap.to(cursor, { scale: 1.5, rotate: 45, backgroundColor: "#FFD700", duration: 0.2 });
          gsap.to(follower, { 
              scale: 0.5, 
              opacity: 0,
              duration: 0.2 
          });
        } else {
          // RESET STATE
          gsap.to(cursor, { scale: 1, rotate: 0, backgroundColor: "#FFD700", duration: 0.2 });
          gsap.to(follower, { 
              scale: 1, 
              opacity: 1,
              duration: 0.2 
          });
        }
    };

    // Click Feedback
    const handleMouseDown = () => {
        gsap.to(cursor, { scale: 0.5, duration: 0.1 });
        gsap.to(follower, { scale: 1.5, opacity: 0.5, duration: 0.1 });
    };

    const handleMouseUp = () => {
        gsap.to(cursor, { scale: 1, duration: 0.1 });
        gsap.to(follower, { scale: 1, opacity: 1, duration: 0.1 });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      gsap.ticker.remove(loop);
    };
  }, []);

  return (
    <>
      {/* Main Cursor: Gold Diamond */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-3 h-3 bg-gold pointer-events-none z-[9999] hidden md:block"
        style={{ transform: 'translate(-50%, -50%) rotate(45deg)' }} 
      />
      
      {/* Follower: Tech Ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-white/30 rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{ transform: 'translate(-50%, -50%)' }}
      >
        {/* Decorative Tech Dashes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[2px] w-[2px] h-[4px] bg-gold" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-[2px] w-[2px] h-[4px] bg-gold" />
        <div className="absolute left-0 top-1/2 -translate-x-[2px] -translate-y-1/2 w-[4px] h-[2px] bg-gold" />
        <div className="absolute right-0 top-1/2 translate-x-[2px] -translate-y-1/2 w-[4px] h-[2px] bg-gold" />
      </div>
    </>
  );
}
