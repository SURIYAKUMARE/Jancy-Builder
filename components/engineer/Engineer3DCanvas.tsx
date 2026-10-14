"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface EngineerModelProps {
  isWelcoming?: boolean;
  gesture?: "welcome" | "point" | "tablet" | "idle";
}

function EngineerCharacter({ isWelcoming = true, gesture = "welcome" }: EngineerModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);
  const leftHandRef = useRef<THREE.Group>(null);
  const eyelidsRef = useRef<THREE.Mesh>(null);
  const tabletGlowRef = useRef<THREE.PointLight>(null);

  // Mouse cursor tracking target (normalized -1 to 1)
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Realistic materials for the civil engineer
  const materials = useMemo(() => {
    // 1. South Indian skin tone
    const skinMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#A86B42"), // Warm bronze skin tone
      roughness: 0.6,
      metalness: 0.05,
    });

    // 2. White engineering safety helmet (glossy fiberglass)
    const helmetMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFFFFF"),
      roughness: 0.2,
      metalness: 0.15,
    });

    // 3. High-visibility safety vest (neon orange-yellow)
    const vestMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FF7A00"), // Safety amber/orange
      roughness: 0.5,
      metalness: 0.05,
    });

    // 4. Reflective 3M silver stripes
    const reflectiveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F1F5F9"),
      roughness: 0.15,
      metalness: 0.85,
    });

    // 5. Formal navy engineering shirt
    const shirtMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0F172A"), // Architectural deep navy
      roughness: 0.75,
      metalness: 0.05,
    });

    // 6. Formal dark trousers
    const pantsMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E293B"), // Slate dark charcoal
      roughness: 0.8,
      metalness: 0.05,
    });

    // 7. Dark leather work boots
    const bootMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#271810"), // Deep leather brown
      roughness: 0.7,
      metalness: 0.1,
    });

    // 8. Eyes: dark brown iris
    const eyeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#2B1810"),
      roughness: 0.1,
    });

    // 9. Tablet glass & glowing cyan screen
    const tabletFrameMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0B0F19"),
      roughness: 0.3,
      metalness: 0.8,
    });

    const screenMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0284C7"), // Blueprint glow cyan
    });

    // 10. Gold Jancy Builders helmet emblem
    const goldEmblemMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#D4AF37"),
      roughness: 0.25,
      metalness: 0.9,
    });

    return {
      skinMat,
      helmetMat,
      vestMat,
      reflectiveMat,
      shirtMat,
      pantsMat,
      bootMat,
      eyeMat,
      tabletFrameMat,
      screenMat,
      goldEmblemMat,
    };
  }, []);

  // Animation frame loop: breathing, blinking, mouse tracking, and hand gestures
  useFrame((state) => {
    const t = state.clock.elapsedTime;

    // 1. Natural Sinusoidal Breathing
    if (groupRef.current) {
      // Subtle chest & shoulder elevation
      groupRef.current.position.y = -1.2 + Math.sin(t * 2.0) * 0.015;
    }

    // 2. Cursor awareness / Head Tracking (Smooth lerp)
    if (headRef.current) {
      const targetRotationY = THREE.MathUtils.clamp(mousePos.current.x * 0.45, -0.6, 0.6);
      const targetRotationX = THREE.MathUtils.clamp(-mousePos.current.y * 0.3, -0.3, 0.35);

      headRef.current.rotation.y = THREE.MathUtils.lerp(headRef.current.rotation.y, targetRotationY, 0.08);
      headRef.current.rotation.x = THREE.MathUtils.lerp(headRef.current.rotation.x, targetRotationX, 0.08);
      headRef.current.rotation.z = Math.sin(t * 1.2) * 0.02; // Micro subtle head tilt
    }

    // 3. Periodic Eye Blinking (every ~3.8 seconds)
    if (eyelidsRef.current) {
      const blinkCycle = t % 3.8;
      if (blinkCycle < 0.18) {
        // Close eyelid
        eyelidsRef.current.scale.y = THREE.MathUtils.lerp(eyelidsRef.current.scale.y, 1.0, 0.4);
      } else {
        // Open eyelid
        eyelidsRef.current.scale.y = THREE.MathUtils.lerp(eyelidsRef.current.scale.y, 0.01, 0.3);
      }
    }

    // 4. Tablet Screen Glow Pulsing
    if (tabletGlowRef.current) {
      tabletGlowRef.current.intensity = 1.2 + Math.sin(t * 3.5) * 0.3;
    }

    // 5. Left Arm Gesture Interpolation
    if (leftArmRef.current) {
      if (gesture === "welcome" || isWelcoming) {
        // Welcoming open gesture: arm raised gently outwards with open palm
        const wave = Math.sin(t * 1.5) * 0.08;
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -0.7 + wave, 0.08);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0.4, 0.08);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.6 + wave * 0.5, 0.08);
      } else if (gesture === "point") {
        // Pointing gesture towards site content
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, -1.2, 0.08);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, -0.3, 0.08);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.4, 0.08);
      } else {
        // Natural resting idle arm
        leftArmRef.current.rotation.x = THREE.MathUtils.lerp(leftArmRef.current.rotation.x, 0.1, 0.08);
        leftArmRef.current.rotation.y = THREE.MathUtils.lerp(leftArmRef.current.rotation.y, 0.0, 0.08);
        leftArmRef.current.rotation.z = THREE.MathUtils.lerp(leftArmRef.current.rotation.z, 0.15, 0.08);
      }
    }

    // 6. Right Arm Holding Tablet
    if (rightArmRef.current) {
      // Right arm holds tablet at chest height
      rightArmRef.current.rotation.x = THREE.MathUtils.lerp(rightArmRef.current.rotation.x, -0.9, 0.08);
      rightArmRef.current.rotation.y = THREE.MathUtils.lerp(rightArmRef.current.rotation.y, -0.35, 0.08);
      rightArmRef.current.rotation.z = THREE.MathUtils.lerp(rightArmRef.current.rotation.z, -0.3, 0.08);
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.2, 0]}>
      {/* =================================================================== */}
      {/* 1. LOWER BODY: SHOES & TROUSERS                                      */}
      {/* =================================================================== */}
      {/* Left & Right Work Boots */}
      <mesh position={[-0.22, 0.12, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.44]} />
        <primitive object={materials.bootMat} attach="material" />
      </mesh>
      <mesh position={[0.22, 0.12, 0.05]} castShadow>
        <boxGeometry args={[0.22, 0.22, 0.44]} />
        <primitive object={materials.bootMat} attach="material" />
      </mesh>

      {/* Left & Right Trouser Legs */}
      <mesh position={[-0.22, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 1.0, 16]} />
        <primitive object={materials.pantsMat} attach="material" />
      </mesh>
      <mesh position={[0.22, 0.72, 0]} castShadow>
        <cylinderGeometry args={[0.13, 0.15, 1.0, 16]} />
        <primitive object={materials.pantsMat} attach="material" />
      </mesh>

      {/* Pelvis & Belt */}
      <mesh position={[0, 1.25, 0]} castShadow>
        <boxGeometry args={[0.56, 0.25, 0.32]} />
        <primitive object={materials.pantsMat} attach="material" />
      </mesh>
      {/* Brass Belt Buckle */}
      <mesh position={[0, 1.34, 0.17]}>
        <boxGeometry args={[0.12, 0.07, 0.03]} />
        <primitive object={materials.goldEmblemMat} attach="material" />
      </mesh>

      {/* =================================================================== */}
      {/* 2. TORSO: NAVY SHIRT + HIGH-VISIBILITY SAFETY VEST                  */}
      {/* =================================================================== */}
      {/* Main Chest/Torso */}
      <mesh position={[0, 1.72, 0]} castShadow>
        <boxGeometry args={[0.62, 0.72, 0.34]} />
        <primitive object={materials.vestMat} attach="material" />
      </mesh>

      {/* Shirt Collar V-neck */}
      <mesh position={[0, 2.05, 0.14]}>
        <boxGeometry args={[0.22, 0.12, 0.08]} />
        <primitive object={materials.shirtMat} attach="material" />
      </mesh>

      {/* Reflective 3M Silver Stripes across Vest */}
      {/* Horizontal Upper Stripe */}
      <mesh position={[0, 1.82, 0.175]}>
        <boxGeometry args={[0.63, 0.06, 0.01]} />
        <primitive object={materials.reflectiveMat} attach="material" />
      </mesh>
      {/* Horizontal Lower Stripe */}
      <mesh position={[0, 1.55, 0.175]}>
        <boxGeometry args={[0.63, 0.06, 0.01]} />
        <primitive object={materials.reflectiveMat} attach="material" />
      </mesh>
      {/* Left Vertical Shoulder Stripe */}
      <mesh position={[-0.18, 1.9, 0.175]}>
        <boxGeometry args={[0.06, 0.28, 0.01]} />
        <primitive object={materials.reflectiveMat} attach="material" />
      </mesh>
      {/* Right Vertical Shoulder Stripe */}
      <mesh position={[0.18, 1.9, 0.175]}>
        <boxGeometry args={[0.06, 0.28, 0.01]} />
        <primitive object={materials.reflectiveMat} attach="material" />
      </mesh>

      {/* Company ID Card Lanyard Badge */}
      <mesh position={[-0.18, 1.62, 0.18]}>
        <boxGeometry args={[0.08, 0.11, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
      </mesh>

      {/* =================================================================== */}
      {/* 3. HEAD, FACE & SAFETY HELMET (Tracked by Mouse)                    */}
      {/* =================================================================== */}
      <group ref={headRef} position={[0, 2.18, 0]}>
        {/* Neck */}
        <mesh position={[0, -0.05, 0]}>
          <cylinderGeometry args={[0.09, 0.1, 0.14, 16]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* Head / Face */}
        <mesh position={[0, 0.12, 0]} castShadow>
          <sphereGeometry args={[0.19, 24, 24]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* Groomed Beard / Jaw definition */}
        <mesh position={[0, 0.06, 0.11]}>
          <boxGeometry args={[0.16, 0.14, 0.12]} />
          <meshStandardMaterial color="#221711" roughness={0.9} />
        </mesh>

        {/* Eyes (Left & Right) */}
        <mesh position={[-0.065, 0.14, 0.17]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <primitive object={materials.eyeMat} attach="material" />
        </mesh>
        <mesh position={[0.065, 0.14, 0.17]}>
          <sphereGeometry args={[0.022, 12, 12]} />
          <primitive object={materials.eyeMat} attach="material" />
        </mesh>

        {/* Blinking Eyelid Mesh overlay */}
        <mesh ref={eyelidsRef} position={[0, 0.155, 0.175]} scale={[1, 0.01, 1]}>
          <boxGeometry args={[0.18, 0.04, 0.02]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* =================================================================== */}
        {/* WHITE SAFETY HELMET                                                 */}
        {/* =================================================================== */}
        {/* Helmet Main Dome */}
        <mesh position={[0, 0.22, -0.01]} castShadow>
          <sphereGeometry args={[0.23, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <primitive object={materials.helmetMat} attach="material" />
        </mesh>

        {/* Helmet Rim / Visor Brim */}
        <mesh position={[0, 0.2, 0.03]} rotation={[0.15, 0, 0]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 32]} />
          <primitive object={materials.helmetMat} attach="material" />
        </mesh>

        {/* Jancy Golden Shield Badge on Helmet Front */}
        <mesh position={[0, 0.29, 0.21]} rotation={[-0.2, 0, 0]}>
          <boxGeometry args={[0.06, 0.06, 0.02]} />
          <primitive object={materials.goldEmblemMat} attach="material" />
        </mesh>

        {/* Helmet Chin Strap */}
        <mesh position={[0, 0.06, 0.08]} rotation={[0.4, 0, 0]}>
          <torusGeometry args={[0.16, 0.008, 8, 24, Math.PI]} />
          <meshBasicMaterial color="#1E293B" />
        </mesh>
      </group>

      {/* =================================================================== */}
      {/* 4. LEFT ARM: WELCOMING / POINTING HAND GESTURE                       */}
      {/* =================================================================== */}
      <group ref={leftArmRef} position={[-0.34, 1.98, 0]}>
        {/* Left Shoulder & Upper Arm */}
        <mesh position={[-0.1, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.38, 16]} />
          <primitive object={materials.shirtMat} attach="material" />
        </mesh>

        {/* Left Forearm */}
        <mesh position={[-0.1, -0.54, 0.05]} rotation={[-0.2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.36, 16]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* Left Hand with Welcoming Open Palm */}
        <group ref={leftHandRef} position={[-0.1, -0.74, 0.1]}>
          <mesh castShadow>
            <boxGeometry args={[0.11, 0.14, 0.04]} />
            <primitive object={materials.skinMat} attach="material" />
          </mesh>
          {/* Fingers */}
          {[-0.035, -0.012, 0.012, 0.035].map((fx, i) => (
            <mesh key={i} position={[fx, -0.09, 0]}>
              <cylinderGeometry args={[0.012, 0.01, 0.08, 8]} />
              <primitive object={materials.skinMat} attach="material" />
            </mesh>
          ))}
        </group>
      </group>

      {/* =================================================================== */}
      {/* 5. RIGHT ARM: HOLDING GLOWING DIGITAL BLUEPRINT TABLET               */}
      {/* =================================================================== */}
      <group ref={rightArmRef} position={[0.34, 1.98, 0]}>
        {/* Right Shoulder & Upper Arm */}
        <mesh position={[0.08, -0.22, 0]} castShadow>
          <cylinderGeometry args={[0.08, 0.07, 0.38, 16]} />
          <primitive object={materials.shirtMat} attach="material" />
        </mesh>

        {/* Right Forearm */}
        <mesh position={[0.06, -0.48, 0.18]} rotation={[0.8, 0, 0]} castShadow>
          <cylinderGeometry args={[0.07, 0.06, 0.34, 16]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* Right Hand gripping the tablet */}
        <mesh position={[0.06, -0.58, 0.35]}>
          <boxGeometry args={[0.09, 0.09, 0.06]} />
          <primitive object={materials.skinMat} attach="material" />
        </mesh>

        {/* Digital Architectural Tablet (iPad Pro) */}
        <group position={[0.06, -0.58, 0.42]} rotation={[-0.3, -0.3, 0.1]}>
          {/* Tablet Body */}
          <mesh castShadow>
            <boxGeometry args={[0.34, 0.24, 0.015]} />
            <primitive object={materials.tabletFrameMat} attach="material" />
          </mesh>

          {/* Glowing Blueprint Screen */}
          <mesh position={[0, 0, 0.009]}>
            <planeGeometry args={[0.31, 0.21]} />
            <primitive object={materials.screenMat} attach="material" />
          </mesh>

          {/* Emissive Point Light illuminating the Engineer's face and hands */}
          <pointLight
            ref={tabletGlowRef}
            color="#38BDF8"
            intensity={1.2}
            distance={2.5}
            position={[0, 0, 0.15]}
          />
        </group>
      </group>
    </group>
  );
}

export default function Engineer3DCanvas({
  isWelcoming = true,
  gesture = "welcome",
}: EngineerModelProps) {
  return (
    <div className="w-full h-full min-h-[380px] relative pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0.8, 2.7], fov: 42 }}
        shadows
        gl={{ antialias: true, alpha: true }}
      >
        {/* Studio Architectural Lighting */}
        <ambientLight intensity={0.8} />
        
        {/* Key Directional Sun/Studio Light */}
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        {/* Soft Rim Light highlighting the white helmet and shoulders */}
        <directionalLight
          position={[-3, 3, -3]}
          intensity={0.9}
          color="#38BDF8"
        />

        {/* Warm fill light */}
        <directionalLight
          position={[0, -2, 2]}
          intensity={0.4}
          color="#FEF3C7"
        />

        <EngineerCharacter isWelcoming={isWelcoming} gesture={gesture} />
      </Canvas>
    </div>
  );
}
