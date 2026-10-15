"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface FadingVideoProps {
  src?: string | string[];
  className?: string;
  style?: React.CSSProperties;
  poster?: string;
  overlayGradient?: boolean;
}

export default function FadingVideo({
  src,
  className = "",
  style,
  poster = "/images/hero-sunset-villa.jpg",
  overlayGradient = true,
}: FadingVideoProps) {
  const videoSources = Array.isArray(src) ? src : src ? [src] : [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const [hasVideoError, setHasVideoError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Check reduced motion
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);

      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    }
  }, []);

  const activeSrc = videoSources[currentIdx] || "";

  // Play video whenever index or src changes
  useEffect(() => {
    if (prefersReducedMotion || !activeSrc) {
      setHasVideoError(true);
      return;
    }

    const video = videoRef.current;
    if (!video) return;

    setOpacity(0);
    setHasVideoError(false);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn("FadingVideo autoplay restricted, falling back to cinematic poster:", err);
        setHasVideoError(true);
      });
    }
  }, [currentIdx, activeSrc, prefersReducedMotion]);

  const handleCanPlay = () => {
    // Fade in smoothly when ready
    setOpacity(1);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const remaining = video.duration - video.currentTime;
    // Smoothly fade out 0.8 seconds before the video ends
    if (remaining < 0.8) {
      const fadeProgress = Math.max(0, remaining / 0.8);
      setOpacity(fadeProgress);
    } else if (opacity < 1) {
      setOpacity(1);
    }
  };

  const handleEnded = () => {
    if (videoSources.length > 1) {
      // Cycle through multiple video sources smoothly
      setCurrentIdx((prev) => (prev + 1) % videoSources.length);
    } else if (videoRef.current) {
      // Loop single video
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => setHasVideoError(true));
      setOpacity(1);
    }
  };

  return (
    <div
      className={`relative w-full h-full overflow-hidden bg-black ${className}`}
      style={style}
    >
      {/* 1. CINEMATIC POSTER / FALLBACK (Always present underneath with subtle Ken Burns drift) */}
      <div className="absolute inset-0 z-0">
        <Image
          src={poster}
          alt="Jancy Builders Construction Portfolio"
          fill
          priority
          className="object-cover object-center transform scale-105 transition-transform duration-[12000ms] ease-out hover:scale-100"
          sizes="100vw"
        />
      </div>

      {/* 2. REAL HTML5 VIDEO (If supported and not disabled by reduced-motion) */}
      {!hasVideoError && activeSrc && (
        <video
          ref={videoRef}
          src={activeSrc}
          poster={poster}
          autoPlay
          muted
          playsInline
          loop={videoSources.length === 1}
          onCanPlay={handleCanPlay}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          onError={() => setHasVideoError(true)}
          className="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-700 ease-in-out pointer-events-none"
          style={{ opacity }}
        />
      )}

      {/* 3. ATMOSPHERIC BLACK GRADIENT OVERLAY (Guarantees high contrast for white Instrument Serif typography) */}
      {overlayGradient && (
        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-t from-black via-black/60 to-black/40" />
      )}
    </div>
  );
}
