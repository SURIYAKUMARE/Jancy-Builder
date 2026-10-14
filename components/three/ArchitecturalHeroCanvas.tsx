"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { Play, Pause, RotateCcw, Eye, Sparkles, Layers, Box, FastForward } from "lucide-react";
import BuildingModel from "./BuildingModel";
import Hero3DFallback from "./Hero3DFallback";

// Camera Rig for automatic cinematic sweeping camera
function CameraRig({
  progress,
  isInteractive,
}: {
  progress: number;
  isInteractive: boolean;
}) {
  const { camera } = useThree();
  const targetLookAt = useRef(new THREE.Vector3(0, 2.5, 0));

  useFrame((_, delta) => {
    if (isInteractive) return;

    // Cinematic angle calculation based on progress (0 to 1 over 18 seconds)
    // 0.0 - 0.22: Low dramatic angle focusing on ground footings
    // 0.22 - 0.45: Ascending angle capturing column extrusion
    // 0.45 - 0.68: Orbiting to facade to reveal wall panels
    // 0.68 - 0.85: Wide angle looking up at cantilever roof
    // 0.85 - 1.00: Full smooth 360 panoramic glide

    let radius = 13.5;
    let angle = progress * Math.PI * 2 * 1.25 + 0.5;
    let height = 4.5;

    if (progress < 0.10) {
      radius = 11.5;
      height = 2.4;
      targetLookAt.current.lerp(new THREE.Vector3(0, 0.6, 0), delta * 2.2);
    } else if (progress < 0.20) {
      radius = 12.2;
      height = 2.9;
      targetLookAt.current.lerp(new THREE.Vector3(0, 1.2, 0), delta * 2.2);
    } else if (progress < 0.32) {
      radius = 13.0;
      height = 4.0;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.0, 0), delta * 2.2);
    } else if (progress < 0.44) {
      radius = 13.4;
      height = 4.6;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.6, 0), delta * 2.2);
    } else if (progress < 0.56) {
      radius = 13.8;
      height = 5.0;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.8, 0), delta * 2.2);
    } else if (progress < 0.68) {
      radius = 14.2;
      height = 5.8;
      targetLookAt.current.lerp(new THREE.Vector3(0, 3.4, 0), delta * 2.2);
    } else if (progress < 0.78) {
      radius = 13.2;
      height = 4.2;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.4, 0), delta * 2.2);
    } else if (progress < 0.88) {
      radius = 13.6;
      height = 4.8;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.8, 0), delta * 2.2);
    } else if (progress < 0.94) {
      radius = 14.5;
      height = 5.2;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.6, 0), delta * 2.2);
    } else {
      // Completed Luxury Villa 360 cinematic panoramic glide
      radius = 14.0;
      height = 4.6;
      targetLookAt.current.lerp(new THREE.Vector3(0, 2.5, 0), delta * 2.2);
    }

    const targetX = Math.sin(angle) * radius;
    const targetZ = Math.cos(angle) * radius;

    // Smooth exponential camera interpolation (lerp)
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, delta * 2.2);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, height, delta * 2.2);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, delta * 2.2);

    camera.lookAt(targetLookAt.current);
  });

  return null;
}

export default function ArchitecturalHeroCanvas() {
  const [progress, setProgress] = useState(0); // 0.0 to 1.0
  const [isInteractive, setIsInteractive] = useState(false);
  const [isWireframe, setIsWireframe] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // 18-second construction timeline loop
  const LOOP_DURATION_SECONDS = 18;

  useEffect(() => {
    // Check reduced-motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setProgress(1.0);
      setIsPlaying(false);
      return;
    }

    // Pause rendering when canvas is scrolled off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Automatic construction loop
  useEffect(() => {
    if (!isPlaying || !isVisible || isInteractive) return;

    let startTime = performance.now();

    const interval = setInterval(() => {
      const now = performance.now();
      const elapsed = (now - startTime) / 1000;
      const current = (elapsed % LOOP_DURATION_SECONDS) / LOOP_DURATION_SECONDS;
      setProgress(current);
    }, 30);

    return () => clearInterval(interval);
  }, [isPlaying, isVisible, isInteractive]);

  // 10-Stage description badge
  const getStageTitle = (p: number) => {
    if (p < 0.10) return { step: "01", name: "EMPTY ARCHITECTURAL SITE", sub: "Survey laser grid & boundary marking" };
    if (p < 0.20) return { step: "02", name: "FOOTINGS & PLINTH BEAMS", sub: "IS 456 isolated pad footings & substructure tie beams" };
    if (p < 0.32) return { step: "03", name: "Fe550D RCC COLUMNS RISING", sub: "Seismic column cages with needle vibrator compaction" };
    if (p < 0.44) return { step: "04", name: "CONNECTING BEAMS & SLAB", sub: "Ground level transfer beams & first floor slab" };
    if (p < 0.56) return { step: "05", name: "POROTHERM THERMAL BRICK WALLS", sub: "Wienerberger insulating clay blocks naturally 6°C cooler" };
    if (p < 0.68) return { step: "06", name: "CANTILEVER ROOF & PERGOLA", sub: "Overhanging roof canopy & bronze pergola louvers" };
    if (p < 0.78) return { step: "07", name: "ARCHITECTURAL GLAZING & DOORS", sub: "Low-iron panoramic curtain glass & Burma teakwood entrance" };
    if (p < 0.88) return { step: "08", name: "IVORY STUCCO & BRONZE LOUVERS", sub: "Textured architectural finishes & bronze sunshade screens" };
    if (p < 0.94) return { step: "09", name: "GRANITE PAVING & LANDSCAPING", sub: "Paved granite driveway & tropical manicured turf" };
    return { step: "10", name: "FINISHED ARCHITECTURAL MASTERPIECE", sub: "Completed luxury residence with warm dusk lighting" };
  };

  const currentStage = getStageTitle(progress);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[460px] sm:min-h-[520px] lg:min-h-[600px] rounded-3xl overflow-hidden bg-gradient-to-b from-[#060A12] via-[#090F1D] to-[#04070D] border border-white/10 shadow-2xl group select-none"
    >
      {/* 3D Canvas */}
      <Suspense fallback={<Hero3DFallback />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ position: [12, 4.5, 12], fov: 42 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.15,
          }}
        >
          {/* Lighting Rig */}
          <ambientLight intensity={0.7} color="#F1EDE6" />

          {/* Primary Sun Light casting crisp contact shadows */}
          <directionalLight
            position={[10, 18, 8]}
            intensity={1.8}
            castShadow
            shadow-mapSize={[1024, 1024]}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
            shadow-bias={-0.0001}
            color="#FFFBEB"
          />

          {/* Soft Blue Sky Fill Light */}
          <directionalLight
            position={[-10, 10, -10]}
            intensity={0.6}
            color="#38BDF8"
          />

          {/* Contact Shadows on ground */}
          <ContactShadows
            position={[0, -0.06, 0]}
            opacity={0.65}
            scale={18}
            blur={1.8}
            far={10}
            color="#000000"
          />

          {/* Procedural Building Model */}
          <BuildingModel progress={progress} isWireframeMode={isWireframe} />

          {/* Camera Rig & Orbit Controls */}
          {isInteractive ? (
            <OrbitControls
              enablePan={false}
              minDistance={8}
              maxDistance={22}
              maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera going below ground
              autoRotate={false}
            />
          ) : (
            <CameraRig progress={progress} isInteractive={isInteractive} />
          )}
        </Canvas>
      </Suspense>

      {/* Top HUD Stage Pill */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none z-10">
        <div className="bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/15 flex items-center gap-2 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-[#B88746] animate-ping" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-white">
            {currentStage.step} • {currentStage.name}
          </span>
        </div>

        {/* 3D Real-Time Badge */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#B88746]/90 backdrop-blur-md px-3 py-1 rounded-full text-slate-950 font-bold text-[10px] font-mono shadow-md">
          <Box className="w-3.5 h-3.5" />
          <span>REAL-TIME 3D</span>
        </div>
      </div>

      {/* Bottom Construction Progress Bar & Controls Strip */}
      <div className="absolute bottom-4 inset-x-4 z-10 flex flex-col gap-2">
        {/* Progress Bar */}
        <div className="w-full bg-black/60 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-xl flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#B88746] to-[#E8C59A] transition-all duration-100 rounded-full"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-[#E8C59A] font-bold min-w-[36px] text-right">
            {Math.round(progress * 100)}%
          </span>
        </div>

        {/* Interactive Mode & View Toggles */}
        <div className="flex items-center justify-between gap-2 text-xs">
          {/* Subtitle */}
          <span className="text-[11px] text-slate-400 font-mono hidden md:inline truncate max-w-[280px]">
            {currentStage.sub}
          </span>

          {/* Action Pills */}
          <div className="flex items-center gap-2 ml-auto">
            {/* Interactive 360 Orbit Toggle */}
            <button
              onClick={() => setIsInteractive((prev) => !prev)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold font-mono transition-all flex items-center gap-1.5 border ${
                isInteractive
                  ? "bg-[#B88746] text-slate-950 border-[#B88746] shadow-md"
                  : "bg-black/60 text-slate-300 hover:text-white border-white/15"
              }`}
              title="Toggle manual 360-degree orbit"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{isInteractive ? "360° Drag Active" : "Interactive 360°"}</span>
            </button>

            {/* Wireframe / Blueprint Toggle */}
            <button
              onClick={() => setIsWireframe((prev) => !prev)}
              className={`p-1.5 rounded-full text-[11px] font-bold transition-all border ${
                isWireframe
                  ? "bg-[#38BDF8] text-slate-950 border-[#38BDF8]"
                  : "bg-black/60 text-slate-300 hover:text-white border-white/15"
              }`}
              title="Toggle Blueprint Wireframe mode"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>

            {/* Play / Pause Toggle */}
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              className="p-1.5 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/15 transition-all"
              title={isPlaying ? "Pause 3D Construction" : "Play 3D Construction"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            {/* Skip to Finished Villa */}
            <button
              onClick={() => {
                setProgress(1.0);
                setIsInteractive(true);
              }}
              className="p-1.5 rounded-full bg-black/60 text-[#E8C59A] hover:text-white border border-white/15 transition-all"
              title="Skip to Completed Villa"
            >
              <FastForward className="w-3.5 h-3.5" />
            </button>

            {/* Reset / Replay */}
            <button
              onClick={() => {
                setProgress(0);
                setIsInteractive(false);
                setIsPlaying(true);
              }}
              className="p-1.5 rounded-full bg-black/60 text-slate-300 hover:text-white border border-white/15 transition-all"
              title="Restart 3D Construction Sequence"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
