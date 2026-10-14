"use client";

import React, { useEffect, useState, useRef } from "react";

export default function ArchitecturalCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch screens
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest("a, button, input, textarea, select, [role='button'], canvas");
      setIsHovered(!!interactive);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden transition-opacity duration-300"
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      {/* Precision Center Dot */}
      <div
        ref={cursorRef}
        className={`fixed w-1.5 h-1.5 rounded-full transition-transform duration-75 ease-out ${
          isHovered ? "bg-[#B88746] scale-150" : "bg-slate-900"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Architectural Outer Coordinate Ring with Crosshairs */}
      <div
        ref={ringRef}
        className={`fixed rounded-full border transition-all duration-200 ease-out flex items-center justify-center ${
          isHovered
            ? "w-10 h-10 border-[#B88746]/80 bg-[#B88746]/10 scale-110"
            : "w-7 h-7 border-slate-400/40"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Subtle Architectural Tick Marks */}
        <span className="absolute -top-1 w-[1px] h-1 bg-[#B88746]/60" />
        <span className="absolute -bottom-1 w-[1px] h-1 bg-[#B88746]/60" />
        <span className="absolute -left-1 w-1 h-[1px] bg-[#B88746]/60" />
        <span className="absolute -right-1 w-1 h-[1px] bg-[#B88746]/60" />
      </div>
    </div>
  );
}
