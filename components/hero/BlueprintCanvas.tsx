"use client";

import React, { useEffect, useRef } from "react";

interface BlueprintCanvasProps {
  currentStageNumber: number; // 1 to 12
  isHovered?: boolean;
}

export default function BlueprintCanvas({ currentStageNumber }: BlueprintCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Particle system
    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      maxAlpha: number;
      life: number;
      maxLife: number;
      color: string;
      type: "dust" | "spark" | "bokeh" | "grid";
    }

    const particles: Particle[] = [];
    const maxParticles = 60;

    const createParticle = (): Particle => {
      // Dust for early stages, sparks for steel/structure, bokeh for finished stages
      let type: "dust" | "spark" | "bokeh" | "grid" = "dust";
      let color = "rgba(200, 220, 255, ";
      let vy = -0.3 - Math.random() * 0.4;
      let vx = (Math.random() - 0.5) * 0.5;
      let size = 1.5 + Math.random() * 2;
      let maxAlpha = 0.2 + Math.random() * 0.3;

      if (currentStageNumber >= 3 && currentStageNumber <= 5) {
        // Welding sparks & steel particles
        if (Math.random() > 0.4) {
          type = "spark";
          color = "rgba(255, 180, 50, ";
          vy = 1 + Math.random() * 2.5;
          vx = (Math.random() - 0.5) * 3;
          size = 1 + Math.random() * 2;
          maxAlpha = 0.7 + Math.random() * 0.3;
        }
      } else if (currentStageNumber >= 10) {
        // Golden luxury bokeh for finished home
        type = "bokeh";
        color = "rgba(245, 200, 80, ";
        vy = -0.15 - Math.random() * 0.25;
        vx = (Math.random() - 0.5) * 0.3;
        size = 3 + Math.random() * 6;
        maxAlpha = 0.15 + Math.random() * 0.25;
      }

      return {
        x: Math.random() * width,
        y: type === "spark" ? height * 0.3 + Math.random() * (height * 0.3) : Math.random() * height,
        vx,
        vy,
        size,
        alpha: 0,
        maxAlpha,
        life: 0,
        maxLife: 80 + Math.random() * 120,
        color,
        type,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let scanlineY = 0;
    let scanlineDir = 1;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Subtle Laser Measurement Scanline (Stages 1-4)
      if (currentStageNumber <= 4) {
        scanlineY += 1.2 * scanlineDir;
        if (scanlineY > height * 0.75) scanlineDir = -1;
        if (scanlineY < height * 0.25) scanlineDir = 1;

        const grad = ctx.createLinearGradient(0, scanlineY, width, scanlineY);
        grad.addColorStop(0, "rgba(56, 189, 248, 0)");
        grad.addColorStop(0.3, "rgba(56, 189, 248, 0.18)");
        grad.addColorStop(0.5, "rgba(212, 175, 55, 0.35)");
        grad.addColorStop(0.7, "rgba(56, 189, 248, 0.18)");
        grad.addColorStop(1, "rgba(56, 189, 248, 0)");

        ctx.fillStyle = grad;
        ctx.fillRect(0, scanlineY - 1, width, 2);

        // Subtle crosshair at laser center
        ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(width * 0.5, scanlineY, 12, 0, Math.PI * 2);
        ctx.stroke();
      }

      // 2. Blueprint Architectural Grid Overlay (Subtle)
      if (currentStageNumber <= 5) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.04)";
        ctx.lineWidth = 1;
        const gridSize = 64;
        for (let x = 0; x < width; x += gridSize) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, height);
          ctx.stroke();
        }
        for (let y = 0; y < height; y += gridSize) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(width, y);
          ctx.stroke();
        }
      }

      // 3. Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

        // Fade in and out
        const progress = p.life / p.maxLife;
        if (progress < 0.2) {
          p.alpha = (progress / 0.2) * p.maxAlpha;
        } else if (progress > 0.8) {
          p.alpha = ((1 - progress) / 0.2) * p.maxAlpha;
        } else {
          p.alpha = p.maxAlpha;
        }

        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.life >= p.maxLife || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          particles[i] = createParticle();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentStageNumber]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-10 h-full w-full opacity-80"
    />
  );
}
