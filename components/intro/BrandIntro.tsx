"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface BrandIntroProps {
  onComplete?: () => void;
}

export default function BrandIntro({ onComplete }: BrandIntroProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Check if user already saw the intro in this session
    const hasSeenIntro = sessionStorage.getItem("jb_intro_viewed");

    if (prefersReducedMotion || hasSeenIntro) {
      setShouldRender(false);
      onComplete?.();
      return;
    }

    // Start intro sequence
    setIsVisible(true);

    // After 1.9s, smoothly fade and slide out
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("jb_intro_viewed", "true");
      setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 700); // Wait for exit animation
    }, 1900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!shouldRender) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="brand-splash"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -40,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F4EE] select-none pointer-events-auto"
        >
          {/* Subtle Architectural Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#E8DFD1_1px,transparent_1px),linear-gradient(to_bottom,#E8DFD1_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Center Logo Container */}
          <div className="relative z-10 flex flex-col items-center justify-center p-8">
            
            {/* Architectural Frame Line-Drawing Animation */}
            <svg
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none"
              viewBox="0 0 340 180"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Outer architectural framing box */}
              <motion.rect
                x="4"
                y="4"
                width="332"
                height="172"
                rx="16"
                stroke="#B88746"
                strokeWidth="1.2"
                strokeDasharray="8 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              />
              
              {/* Precision corner marks */}
              <motion.path
                d="M 12 24 L 12 12 L 24 12"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <motion.path
                d="M 328 24 L 328 12 L 316 12"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <motion.path
                d="M 12 156 L 12 168 L 24 168"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
              <motion.path
                d="M 328 156 L 328 168 L 316 168"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
              />
            </svg>

            {/* Logo scaling 96% -> 100% with subtle opacity */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-56 sm:w-64 h-16 sm:h-20"
            >
              <Image
                src="/logo/jancy-official-logo.png"
                alt="Jancy Builders Logo"
                fill
                priority
                className="object-contain"
              />
            </motion.div>

            {/* Tagline Reveal: BUILD YOUR WORLD */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7, ease: "easeOut" }}
              className="mt-4 flex items-center gap-3"
            >
              <span className="h-[1px] w-6 bg-[#B88746]/60 block" />
              <span className="text-[11px] sm:text-xs font-mono font-bold tracking-[0.35em] text-[#B88746] uppercase">
                BUILD YOUR WORLD
              </span>
              <span className="h-[1px] w-6 bg-[#B88746]/60 block" />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
