"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BuildingModelProps {
  progress: number; // 0.0 to 1.0 representing the 18s construction cycle
  isWireframeMode?: boolean;
}

export default function BuildingModel({ progress, isWireframeMode = false }: BuildingModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Materials designed for high visual realism and smooth stage transitions
  const materials = useMemo(() => {
    // 1. Blueprint wireframe material
    const blueprintMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    // 2. Concrete foundation material
    const concreteMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#64748B"),
      roughness: 0.85,
      metalness: 0.1,
    });

    // 3. Porotherm / structural wall material
    const wallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F1EDE6"), // Warm architectural ivory
      roughness: 0.7,
      metalness: 0.05,
    });

    // 4. Accent wall (charcoal architectural finish)
    const accentWallMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E293B"),
      roughness: 0.6,
      metalness: 0.2,
    });

    // 5. Teakwood louvers and soffit
    const woodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#8B5A2B"), // Warm Burma teak
      roughness: 0.45,
      metalness: 0.05,
    });

    // 6. Architectural glazing / glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E0F2FE"),
      transmission: 0.9,
      opacity: 0.85,
      transparent: true,
      roughness: 0.05,
      ior: 1.5,
      metalness: 0.1,
    });

    // 7. Warm glowing interior light mesh
    const glowMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FEF08A"),
      emissive: new THREE.Color("#F59E0B"),
      emissiveIntensity: 0.8,
      roughness: 0.2,
    });

    // 8. Base ground / terrace slab
    const groundMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#0F172A"),
      roughness: 0.9,
      metalness: 0.1,
    });

    const grassMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#15803D"),
      roughness: 0.95,
      metalness: 0.0,
    });

    return {
      blueprintMat,
      concreteMat,
      wallMat,
      accentWallMat,
      woodMat,
      glassMat,
      glowMat,
      groundMat,
      grassMat,
    };
  }, []);

  // Compute sub-stage visibility and scaling based on continuous progress (0 to 1)
  // Stage 1: 0.00 - 0.22 (Footings, Ground & Rebars)
  // Stage 2: 0.22 - 0.45 (Columns & First Floor Slab)
  // Stage 3: 0.45 - 0.68 (Walls & Partitions)
  // Stage 4: 0.68 - 0.85 (Roof Slab & Glass Balconies)
  // Stage 5: 0.85 - 1.00 (Finished luxury lighting & 360 orbit)

  const s1 = Math.min(Math.max((progress - 0.0) / 0.2, 0), 1);
  const s2 = Math.min(Math.max((progress - 0.2) / 0.25, 0), 1);
  const s3 = Math.min(Math.max((progress - 0.45) / 0.23, 0), 1);
  const s4 = Math.min(Math.max((progress - 0.68) / 0.17, 0), 1);
  const s5 = Math.min(Math.max((progress - 0.85) / 0.15, 0), 1);

  // Subtle floating idle motion during finished state
  useFrame((state) => {
    if (groupRef.current) {
      if (s5 > 0.5) {
        groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.04;
      } else {
        groupRef.current.position.y = 0;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.6, 0]}>
      {/* ===================================================================== */}
      {/* 0. GROUND PLINTH & BLUEPRINT GRID                                     */}
      {/* ===================================================================== */}
      {/* Paved Terrace Base */}
      <mesh position={[0, -0.05, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 12]} />
        <primitive object={materials.groundMat} attach="material" />
      </mesh>

      {/* Landscaped Green Lawn Borders */}
      <mesh position={[-5.5, -0.04, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.11, 11]} />
        <primitive object={materials.grassMat} attach="material" />
      </mesh>
      <mesh position={[5.5, -0.04, 0]} receiveShadow>
        <boxGeometry args={[2.5, 0.11, 11]} />
        <primitive object={materials.grassMat} attach="material" />
      </mesh>

      {/* Blueprint Laser Marking Grid (Fades out as building finishes) */}
      {s1 < 0.95 && (
        <gridHelper
          args={[16, 16, "#38BDF8", "#0284C7"]}
          position={[0, 0.01, 0]}
        />
      )}

      {/* ===================================================================== */}
      {/* 1. FOUNDATION FOOTINGS & PLINTH BEAMS (Phase 1)                       */}
      {/* ===================================================================== */}
      {s1 > 0 && (
        <group scale={[1, s1, 1]}>
          {/* Main 4 Isolated Footings */}
          {[-3, 3].map((x) =>
            [-3, 3].map((z) => (
              <mesh key={`footing-${x}-${z}`} position={[x, 0.15, z]} castShadow>
                <boxGeometry args={[1.2, 0.3, 1.2]} />
                <primitive
                  object={isWireframeMode || s1 < 0.5 ? materials.blueprintMat : materials.concreteMat}
                  attach="material"
                />
              </mesh>
            ))
          )}

          {/* Plinth Tie Beams */}
          <mesh position={[0, 0.25, -3]} castShadow>
            <boxGeometry args={[6.4, 0.25, 0.4]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.25, 3]} castShadow>
            <boxGeometry args={[6.4, 0.25, 0.4]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[-3, 0.25, 0]} castShadow>
            <boxGeometry args={[0.4, 0.25, 6]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[3, 0.25, 0]} castShadow>
            <boxGeometry args={[0.4, 0.25, 6]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>

          {/* Ground Floor Slab Base */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[6.8, 0.2, 6.8]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 2. GROUND FLOOR RCC COLUMNS & LEVEL 1 SLAB (Phase 2)                  */}
      {/* ===================================================================== */}
      {s2 > 0 && (
        <group>
          {/* 6 Structural Columns */}
          {[-3, 0, 3].map((x) =>
            [-3, 3].map((z) => (
              <mesh
                key={`col-${x}-${z}`}
                position={[x, 0.45 + (1.35 * s2), z]}
                scale={[1, s2, 1]}
                castShadow
              >
                <boxGeometry args={[0.35, 2.7, 0.35]} />
                <primitive
                  object={s2 < 0.4 ? materials.blueprintMat : materials.concreteMat}
                  attach="material"
                />
              </mesh>
            ))
          )}

          {/* Entrance Portico Twin Pillars */}
          <mesh position={[-1.2, 0.45 + (1.35 * s2), 4.5]} scale={[1, s2, 1]} castShadow>
            <boxGeometry args={[0.3, 2.7, 0.3]} />
            <primitive object={materials.woodMat} attach="material" />
          </mesh>
          <mesh position={[1.2, 0.45 + (1.35 * s2), 4.5]} scale={[1, s2, 1]} castShadow>
            <boxGeometry args={[0.3, 2.7, 0.3]} />
            <primitive object={materials.woodMat} attach="material" />
          </mesh>

          {/* First Floor Cantilevered Slab (Drops into place when s2 > 0.7) */}
          {s2 > 0.5 && (
            <mesh
              position={[0, 3.2 - (1 - s2) * 1.5, 0.4]}
              castShadow
              receiveShadow
            >
              {/* Overhanging cantilever extending forward */}
              <boxGeometry args={[7.6, 0.28, 8.2]} />
              <primitive object={materials.concreteMat} attach="material" />
            </mesh>
          )}
        </group>
      )}

      {/* ===================================================================== */}
      {/* 3. POROTHERM WALLS & RESIDENTIAL ROOM VOLUMES (Phase 3)               */}
      {/* ===================================================================== */}
      {s3 > 0 && (
        <group scale={[1, s3, 1]}>
          {/* Ground Floor Rear Main Wall */}
          <mesh position={[0, 1.75, -2.9]} castShadow>
            <boxGeometry args={[5.8, 2.6, 0.25]} />
            <primitive object={materials.wallMat} attach="material" />
          </mesh>

          {/* Ground Floor Left Wall */}
          <mesh position={[-2.9, 1.75, 0]} castShadow>
            <boxGeometry args={[0.25, 2.6, 5.8]} />
            <primitive object={materials.wallMat} attach="material" />
          </mesh>

          {/* Ground Floor Right Wall with Accent Dark Panel */}
          <mesh position={[2.9, 1.75, 0]} castShadow>
            <boxGeometry args={[0.25, 2.6, 5.8]} />
            <primitive object={materials.accentWallMat} attach="material" />
          </mesh>

          {/* Teakwood Entrance Door */}
          <mesh position={[0, 1.4, 3.05]} castShadow>
            <boxGeometry args={[1.4, 2.2, 0.1]} />
            <primitive object={materials.woodMat} attach="material" />
          </mesh>

          {/* Ground Floor Panoramic Living Room Glass Wall */}
          <mesh position={[-1.7, 1.75, 2.95]} castShadow>
            <boxGeometry args={[2.0, 2.5, 0.05]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>
          <mesh position={[1.7, 1.75, 2.95]} castShadow>
            <boxGeometry args={[2.0, 2.5, 0.05]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>

          {/* Level 1 Upper Duplex Bedroom Walls */}
          <mesh position={[0, 4.6, -2.9]} castShadow>
            <boxGeometry args={[6.6, 2.5, 0.25]} />
            <primitive object={materials.wallMat} attach="material" />
          </mesh>
          <mesh position={[-3.3, 4.6, 0]} castShadow>
            <boxGeometry args={[0.25, 2.5, 6.2]} />
            <primitive object={materials.wallMat} attach="material" />
          </mesh>
          <mesh position={[3.3, 4.6, -0.8]} castShadow>
            <boxGeometry args={[0.25, 2.5, 4.6]} />
            <primitive object={materials.accentWallMat} attach="material" />
          </mesh>

          {/* Upper Floor Master Bedroom Panoramic Window */}
          <mesh position={[0, 4.6, 3.4]} castShadow>
            <boxGeometry args={[4.2, 2.3, 0.05]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 4. CANTILEVERED ROOF SLAB, LOUVERS & BALCONIES (Phase 4)              */}
      {/* ===================================================================== */}
      {s4 > 0 && (
        <group>
          {/* Main Floating Cantilevered Roof Slab (Descending smoothly) */}
          <mesh
            position={[0, 6.0 + (1 - s4) * 2, 0.3]}
            castShadow
            receiveShadow
          >
            {/* Deep architectural overhang protecting from harsh sun */}
            <boxGeometry args={[8.4, 0.32, 9.0]} />
            <primitive object={materials.concreteMat} attach="material" />
          </mesh>

          {/* Roof Underside Teakwood Soffit */}
          <mesh position={[0, 5.82 + (1 - s4) * 2, 0.3]}>
            <boxGeometry args={[8.2, 0.04, 8.8]} />
            <primitive object={materials.woodMat} attach="material" />
          </mesh>

          {/* Vertical Timber Sunshade Louvers along East Facade */}
          {[-1.8, -1.4, -1.0, -0.6, 0.6, 1.0, 1.4, 1.8].map((lx) => (
            <mesh key={`louver-${lx}`} position={[lx, 4.6, 4.0]} castShadow>
              <boxGeometry args={[0.08, 2.4, 0.35]} />
              <primitive object={materials.woodMat} attach="material" />
            </mesh>
          ))}

          {/* Master Balcony Frameless Glass Railing */}
          <mesh position={[0, 3.8, 4.35]}>
            <boxGeometry args={[4.8, 0.9, 0.05]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>
          <mesh position={[-2.4, 3.8, 3.8]}>
            <boxGeometry args={[0.05, 0.9, 1.1]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>
          <mesh position={[2.4, 3.8, 3.8]}>
            <boxGeometry args={[0.05, 0.9, 1.1]} />
            <primitive object={materials.glassMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 5. FINISHED LUXURY LIGHTING & ARCHITECTURAL ILLUMINATION (Phase 5)    */}
      {/* ===================================================================== */}
      {s5 > 0 && (
        <group>
          {/* Interior Warm Dusk Illumination Glow Boxes */}
          <mesh position={[0, 1.6, 0]}>
            <boxGeometry args={[4.5, 2.0, 4.5]} />
            <primitive object={materials.glowMat} attach="material" />
          </mesh>
          <mesh position={[0, 4.5, 0]}>
            <boxGeometry args={[5.0, 2.0, 5.0]} />
            <primitive object={materials.glowMat} attach="material" />
          </mesh>

          {/* Soft Downlight Spot Emissives under Roof Cantilever */}
          {[-2.5, 0, 2.5].map((sx) => (
            <mesh key={`spot-${sx}`} position={[sx, 5.8, 3.8]}>
              <cylinderGeometry args={[0.12, 0.12, 0.05, 12]} />
              <meshBasicMaterial color="#FEF08A" />
            </mesh>
          ))}

          {/* Warm Point Light Casting Dusk Shadow */}
          <pointLight
            position={[0, 2.0, 2.0]}
            color="#F59E0B"
            intensity={1.2 * s5}
            distance={8}
            decay={2}
          />
          <pointLight
            position={[0, 5.0, 2.0]}
            color="#FEF08A"
            intensity={1.0 * s5}
            distance={8}
            decay={2}
          />
        </group>
      )}
    </group>
  );
}
