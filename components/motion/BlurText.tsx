"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";

interface BlurTextProps {
  text: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "span" | "div";
  className?: string;
  delay?: number;
  stagger?: number;
  italic?: boolean;
  isTamil?: boolean;
}

export default function BlurText({
  text,
  as: Component = "h1",
  className = "",
  delay = 0,
  stagger = 0.09,
  italic = false,
  isTamil = false,
}: BlurTextProps) {
  // Unicode-safe word segmentation for Tamil and English
  const words = useMemo(() => {
    if (!text) return [];
    if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
      try {
        const segmenter = new (Intl as any).Segmenter(isTamil ? "ta" : "en", {
          granularity: "word",
        });
        const segments = Array.from(segmenter.segment(text)) as {
          segment: string;
          isWordLike?: boolean;
        }[];
        return segments
          .filter((s) => s.isWordLike || s.segment.trim().length > 0)
          .map((s) => s.segment);
      } catch {
        // Fallback to whitespace split
      }
    }
    return text.split(/\s+/).filter(Boolean);
  }, [text, isTamil]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1], // Natural easeOut curve
      },
    },
  };

  return (
    <Component
      className={`inline-block ${italic ? "italic" : ""} ${className}`}
      aria-label={text}
    >
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            className="inline-block transform-gpu will-change-[transform,filter,opacity]"
          >
            {word}
          </motion.span>
        ))}
      </motion.span>
    </Component>
  );
}
