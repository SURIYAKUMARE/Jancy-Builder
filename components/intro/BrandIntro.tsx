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

    // Step 1: Start intro sequence
    setIsVisible(true);

    // After 1.85s, smoothly glide logo upward and curtain-wipe reveal hero underneath
    const timer = setTimeout(() => {
      setIsVisible(false);
      sessionStorage.setItem("jb_intro_viewed", "true");
      setTimeout(() => {
        setShouldRender(false);
        onComplete?.();
      }, 700); // Wait for exit upward transition
    }, 1850);

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
            y: "-100%",
            transition: {
              duration: 0.75,
              ease: [0.16, 1, 0.3, 1], // Luxury architectural cubic-bezier
            },
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#F7F4EE] select-none pointer-events-auto"
        >
          {/* Step 1: Subtle Architectural CAD Grid Lines */}
          <div className="absolute inset-0 pointer-events-none opacity-40 bg-[linear-gradient(to_right,#E8DFD1_1px,transparent_1px),linear-gradient(to_bottom,#E8DFD1_1px,transparent_1px)] bg-[size:4rem_4rem]" />

          {/* Center Logo Container - Moves upward at end of intro */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: [0, 0, -35] }}
            transition={{
              times: [0, 0.75, 1],
              duration: 1.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="relative z-10 flex flex-col items-center justify-center p-8 sm:p-12"
          >
            {/* Step 4: Architectural Frame Line-Drawing Animation */}
            <svg
              className="absolute -inset-4 w-[calc(100%+2rem)] h-[calc(100%+2rem)] pointer-events-none"
              viewBox="0 0 360 200"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Outer architectural framing box */}
              <motion.rect
                x="4"
                y="4"
                width="352"
                height="192"
                rx="16"
                stroke="#B88746"
                strokeWidth="1.2"
                strokeDasharray="8 6"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ delay: 0.25, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              />
              
              {/* Precision corner marks */}
              <motion.path
                d="M 14 26 L 14 14 L 26 14"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              <motion.path
                d="M 346 26 L 346 14 L 334 14"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              <motion.path
                d="M 14 174 L 14 186 L 26 186"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
              <motion.path
                d="M 346 174 L 346 186 L 334 186"
                stroke="#B88746"
                strokeWidth="2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              />
            </svg>

            {/* Step 2 & 3: Logo starts opacity:0, scale:0.92 -> opacity:1, scale:1 */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
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

            {/* Step 5: BUILD YOUR WORLD with subtle letter-spacing animation */}
            <motion.div
              initial={{ opacity: 0, y: 8, letterSpacing: "0.2em" }}
              animate={{ opacity: 1, y: 0, letterSpacing: "0.38em" }}
              transition={{ delay: 0.55, duration: 0.8, ease: "easeOut" }}
              className="mt-4 flex items-center gap-3"
            >
              <span className="h-[1px] w-6 bg-[#B88746]/60 block" />
              <span className="text-[11px] sm:text-xs font-mono font-bold text-[#B88746] uppercase">
                BUILD YOUR WORLD
              </span>
              <span className="h-[1px] w-6 bg-[#B88746]/60 block" />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
