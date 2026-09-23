"use client";

import React, { useEffect, useRef } from "react";

interface BlueprintCanvasProps {
  currentStageNumber: number; // 1 to 12
  isBlueprintMode?: boolean;
}

export default function BlueprintCanvas({
  currentStageNumber,
  isBlueprintMode = false,
}: BlueprintCanvasProps) {
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
    const maxParticles = isBlueprintMode ? 80 : 50;

    const createParticle = (): Particle => {
      let type: "dust" | "spark" | "bokeh" | "grid" = "dust";
      let color = "rgba(180, 210, 255, ";
      let vy = -0.3 - Math.random() * 0.4;
      let vx = (Math.random() - 0.5) * 0.5;
      let size = 1.5 + Math.random() * 2;
      let maxAlpha = 0.2 + Math.random() * 0.3;

      if (currentStageNumber >= 3 && currentStageNumber <= 5) {
        // Welding sparks & steel particles (Brand Red & Amber)
        if (Math.random() > 0.35) {
          type = "spark";
          color = Math.random() > 0.5 ? "rgba(229, 9, 20, " : "rgba(255, 180, 40, ";
          vy = 1.2 + Math.random() * 2.8;
          vx = (Math.random() - 0.5) * 3.5;
          size = 1 + Math.random() * 2.5;
          maxAlpha = 0.75 + Math.random() * 0.25;
        }
      } else if (currentStageNumber >= 10) {
        // Luxury golden twilight bokeh
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

    for (let i = 0; i < maxParticles; i++) {
      const p = createParticle();
      p.life = Math.random() * p.maxLife;
      particles.push(p);
    }

    let scanlineY = 0;
    let scanlineDir = 1;
    let tickCount = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      tickCount++;

      // 1. Full Holographic CAD Blueprint Mode (if active)
      if (isBlueprintMode) {
        ctx.strokeStyle = "rgba(2, 132, 199, 0.25)";
        ctx.lineWidth = 1;
        const gridSize = 48;
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

        // Concentric radar circles in center
        ctx.strokeStyle = "rgba(229, 9, 20, 0.35)";
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, 120, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = "rgba(56, 189, 248, 0.3)";
        ctx.beginPath();
        ctx.arc(width * 0.5, height * 0.5, 240, 0, Math.PI * 2);
        ctx.stroke();

        // Architectural Dimension Labels
        ctx.font = "10px 'JetBrains Mono', monospace";
        ctx.fillStyle = "rgba(56, 189, 248, 0.7)";
        ctx.fillText("AXIS-X: 24,850mm [TOLERANCE ±0.5mm]", width * 0.2, height * 0.25);
        ctx.fillText("AXIS-Y: 18,200mm [BEARING 240kN/m²]", width * 0.65, height * 0.35);
        ctx.fillText("DATUM LEVEL: +12.450m AMSL", width * 0.15, height * 0.75);
      }

      // 2. High-Tech Precision Laser Level Line
      scanlineY += 1.4 * scanlineDir;
      if (scanlineY > height * 0.8) scanlineDir = -1;
      if (scanlineY < height * 0.2) scanlineDir = 1;

      const grad = ctx.createLinearGradient(0, scanlineY, width, scanlineY);
      grad.addColorStop(0, "rgba(229, 9, 20, 0)");
      grad.addColorStop(0.3, "rgba(229, 9, 20, 0.25)");
      grad.addColorStop(0.5, "rgba(56, 189, 248, 0.45)");
      grad.addColorStop(0.7, "rgba(229, 9, 20, 0.25)");
      grad.addColorStop(1, "rgba(229, 9, 20, 0)");

      ctx.fillStyle = grad;
      ctx.fillRect(0, scanlineY - 1, width, 2);

      // 3. Render Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        p.x += p.vx;
        p.y += p.vy;

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
  }, [currentStageNumber, isBlueprintMode]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-10 h-full w-full transition-opacity duration-500 ${
        isBlueprintMode ? "opacity-95" : "opacity-75"
      }`}
    />
  );
}
