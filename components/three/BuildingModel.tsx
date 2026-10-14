"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BuildingModelProps {
  progress: number; // 0.0 to 1.0 representing the 10-stage construction sequence
  isWireframeMode?: boolean;
}

export default function BuildingModel({ progress, isWireframeMode = false }: BuildingModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Materials tuned for architectural realism with deep charcoal, warm ivory & bronze accents
  const materials = useMemo(() => {
    // 1. Technical Blueprint wireframe
    const blueprintMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#38BDF8"),
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });

    // 2. Concrete Substructure (Pad footings & plinth beams)
    const concreteMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#64748B"),
      roughness: 0.88,
      metalness: 0.1,
    });

    // 3. Structural RCC Columns & Beams
    const rccMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#475569"),
      roughness: 0.8,
      metalness: 0.15,
    });

    // 4. Porotherm Clay Hollow Bricks (warm terracotta / thermal clay)
    const porothermMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B45309"), // Wienerberger clay amber
      roughness: 0.85,
      metalness: 0.05,
    });

    // 5. Architectural Ivory Stucco Wall Finish (#F8F6F1)
    const wallStuccoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#F8F6F1"),
      roughness: 0.75,
      metalness: 0.04,
    });

    // 6. Deep Charcoal Architectural Cladding (#17191B)
    const charcoalAccentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#17191B"),
      roughness: 0.6,
      metalness: 0.25,
    });

    // 7. Architectural Bronze Louvers & Detailing (#B78A52)
    const bronzeMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#B78A52"),
      roughness: 0.35,
      metalness: 0.75,
    });

    // 8. Kiln-Dried Burma Teakwood Doors & Soffits
    const teakwoodMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#78350F"),
      roughness: 0.5,
      metalness: 0.05,
    });

    // 9. Low-Iron High-Transmission Architectural Glazing
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#E2E8F0"),
      transmission: 0.92,
      opacity: 0.85,
      transparent: true,
      roughness: 0.05,
      ior: 1.52,
      metalness: 0.1,
    });

    // 10. Warm Dusk Interior Light (Golden glow)
    const warmInteriorMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FEF08A"),
      emissive: new THREE.Color("#F59E0B"),
      emissiveIntensity: 0.9,
      roughness: 0.2,
    });

    // 11. Landscaping Granite Pavers & Base Ground
    const groundPavementMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#1E242B"),
      roughness: 0.9,
      metalness: 0.1,
    });

    // 12. Tropical Landscaping Turf / Lawn
    const lawnTurfMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#14532D"), // Rich deep architectural green
      roughness: 0.95,
      metalness: 0.0,
    });

    return {
      blueprintMat,
      concreteMat,
      rccMat,
      porothermMat,
      wallStuccoMat,
      charcoalAccentMat,
      bronzeMat,
      teakwoodMat,
      glassMat,
      warmInteriorMat,
      groundPavementMat,
      lawnTurfMat,
    };
  }, []);

  // Compute 10 distinct smooth progress factors (p1 through p10)
  // Stage 01: 0.00 – 0.10 (Empty Architectural Site & Survey Grid)
  // Stage 02: 0.10 – 0.20 (Footings & Substructure Plinth)
  // Stage 03: 0.20 – 0.32 (RCC Columns Rising)
  // Stage 04: 0.32 – 0.44 (Horizontal Connecting Beams)
  // Stage 05: 0.44 – 0.56 (Porotherm Hollow Clay Walls)
  // Stage 06: 0.56 – 0.68 (Cantilever Roof Slabs & Terrace)
  // Stage 07: 0.68 – 0.78 (Glazing & Burma Teak Doors)
  // Stage 08: 0.78 – 0.88 (Ivory Stucco & Bronze Louvers)
  // Stage 09: 0.88 – 0.94 (Granite Pavers & Landscaping)
  // Stage 10: 0.94 – 1.00 (Finished Luxury Residence with Dusk Lighting)

  const p1 = Math.min(Math.max((progress - 0.0) / 0.1, 0), 1);
  const p2 = Math.min(Math.max((progress - 0.1) / 0.1, 0), 1);
  const p3 = Math.min(Math.max((progress - 0.2) / 0.12, 0), 1);
  const p4 = Math.min(Math.max((progress - 0.32) / 0.12, 0), 1);
  const p5 = Math.min(Math.max((progress - 0.44) / 0.12, 0), 1);
  const p6 = Math.min(Math.max((progress - 0.56) / 0.12, 0), 1);
  const p7 = Math.min(Math.max((progress - 0.68) / 0.1, 0), 1);
  const p8 = Math.min(Math.max((progress - 0.78) / 0.1, 0), 1);
  const p9 = Math.min(Math.max((progress - 0.88) / 0.06, 0), 1);
  const p10 = Math.min(Math.max((progress - 0.94) / 0.06, 0), 1);

  // Subtle natural architectural breathing / floating when completed
  useFrame((state) => {
    if (groupRef.current) {
      if (p10 > 0.5) {
        groupRef.current.position.y = -0.55 + Math.sin(state.clock.elapsedTime * 0.7) * 0.035;
      } else {
        groupRef.current.position.y = -0.55;
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.55, 0]}>
      {/* ===================================================================== */}
      {/* 1. EMPTY ARCHITECTURAL SITE & SURVEY LASER GRID                       */}
      {/* ===================================================================== */}
      {/* Paved Site Base Platform */}
      <mesh position={[0, -0.06, 0]} receiveShadow>
        <boxGeometry args={[15, 0.12, 13]} />
        <primitive object={isWireframeMode ? materials.blueprintMat : materials.groundPavementMat} attach="material" />
      </mesh>

      {/* Laser Architectural Boundary Survey Grid */}
      {p8 < 0.95 && (
        <gridHelper
          args={[16, 16, "#B78A52", "#38BDF8"]}
          position={[0, 0.01, 0]}
        />
      )}

      {/* ===================================================================== */}
      {/* 2. FOUNDATION FOOTINGS & PLINTH TIE-BEAMS (p2)                        */}
      {/* ===================================================================== */}
      {p2 > 0 && (
        <group scale={[1, p2, 1]}>
          {/* 6 Isolated Reinforced Concrete Footings */}
          {[-3.5, 0, 3.5].map((x) =>
            [-3, 3].map((z) => (
              <mesh key={`footing-${x}-${z}`} position={[x, 0.16, z]} castShadow>
                <boxGeometry args={[1.3, 0.32, 1.3]} />
                <primitive object={isWireframeMode ? materials.blueprintMat : materials.concreteMat} attach="material" />
              </mesh>
            ))
          )}

          {/* Substructure Plinth Tie-Beams */}
          <mesh position={[0, 0.28, -3]}>
            <boxGeometry args={[8.4, 0.26, 0.4]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[0, 0.28, 3]}>
            <boxGeometry args={[8.4, 0.26, 0.4]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[-3.5, 0.28, 0]}>
            <boxGeometry args={[0.4, 0.26, 6.2]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.concreteMat} attach="material" />
          </mesh>
          <mesh position={[3.5, 0.28, 0]}>
            <boxGeometry args={[0.4, 0.26, 6.2]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.concreteMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 3. STRUCTURAL COLUMNS RISING (p3)                                     */}
      {/* ===================================================================== */}
      {p3 > 0 && (
        <group>
          {[-3.5, 0, 3.5].map((x) =>
            [-3, 3].map((z) => (
              <mesh
                key={`col-${x}-${z}`}
                position={[x, 0.4 + (p3 * 3.4) / 2, z]}
                scale={[1, p3, 1]}
                castShadow
              >
                <boxGeometry args={[0.45, 3.4, 0.45]} />
                <primitive object={isWireframeMode ? materials.blueprintMat : materials.rccMat} attach="material" />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* ===================================================================== */}
      {/* 4. CONNECTING STRUCTURAL BEAMS & FIRST FLOOR SLAB (p4)                */}
      {/* ===================================================================== */}
      {p4 > 0 && (
        <group scale={[p4, 1, p4]}>
          {/* Ground Floor Roof / Level 1 Floor Slab */}
          <mesh position={[0, 3.75, 0]} castShadow receiveShadow>
            <boxGeometry args={[8.8, 0.28, 7.8]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.rccMat} attach="material" />
          </mesh>

          {/* Level 1 Upper Columns */}
          {[-3.2, 0, 3.2].map((x) =>
            [-2.6, 2.6].map((z) => (
              <mesh key={`col-l1-${x}-${z}`} position={[x, 5.2, z]} castShadow>
                <boxGeometry args={[0.4, 2.7, 0.4]} />
                <primitive object={isWireframeMode ? materials.blueprintMat : materials.rccMat} attach="material" />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* ===================================================================== */}
      {/* 5. POROTHERM CLAY HOLLOW BRICK WALLS (p5)                             */}
      {/* ===================================================================== */}
      {p5 > 0 && (
        <group scale={[1, p5, 1]}>
          {/* Rear Ground Floor Porotherm Wall */}
          <mesh position={[0, 2.05, -2.8]} castShadow>
            <boxGeometry args={[6.8, 3.2, 0.25]} />
            <primitive
              object={
                isWireframeMode
                  ? materials.blueprintMat
                  : p8 > 0.5
                  ? materials.wallStuccoMat
                  : materials.porothermMat
              }
              attach="material"
            />
          </mesh>

          {/* Left Wing Porotherm Wall */}
          <mesh position={[-3.3, 2.05, 0]} castShadow>
            <boxGeometry args={[0.25, 3.2, 5.8]} />
            <primitive
              object={
                isWireframeMode
                  ? materials.blueprintMat
                  : p8 > 0.5
                  ? materials.wallStuccoMat
                  : materials.porothermMat
              }
              attach="material"
            />
          </mesh>

          {/* Right Wing Porotherm Wall */}
          <mesh position={[3.3, 2.05, 0]} castShadow>
            <boxGeometry args={[0.25, 3.2, 5.8]} />
            <primitive
              object={
                isWireframeMode
                  ? materials.blueprintMat
                  : p8 > 0.5
                  ? materials.wallStuccoMat
                  : materials.porothermMat
              }
              attach="material"
            />
          </mesh>

          {/* Upper Floor Porotherm Walls */}
          <mesh position={[-1.2, 5.15, -2.4]} castShadow>
            <boxGeometry args={[4.2, 2.6, 0.25]} />
            <primitive
              object={
                isWireframeMode
                  ? materials.blueprintMat
                  : p8 > 0.5
                  ? materials.wallStuccoMat
                  : materials.porothermMat
              }
              attach="material"
            />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 6. CANTILEVER ROOF SLABS & TERRACE PERGOLA (p6)                       */}
      {/* ===================================================================== */}
      {p6 > 0 && (
        <group scale={[1, 1, p6]}>
          {/* Main Dramatic Cantilever Overhang Roof Slab */}
          <mesh position={[0.2, 6.65, 0.3]} castShadow receiveShadow>
            <boxGeometry args={[9.6, 0.26, 8.4]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.charcoalAccentMat} attach="material" />
          </mesh>

          {/* Architectural Bronze Soffit Trim */}
          <mesh position={[0.2, 6.5, 0.3]}>
            <boxGeometry args={[9.65, 0.04, 8.45]} />
            <primitive object={materials.bronzeMat} attach="material" />
          </mesh>

          {/* Rooftop Pergola Canopy Louvers */}
          {[-2.5, -1.5, -0.5, 0.5, 1.5, 2.5].map((lx, idx) => (
            <mesh key={`pergola-${idx}`} position={[lx, 7.05, 2.2]} castShadow>
              <boxGeometry args={[0.08, 0.16, 3.2]} />
              <primitive object={materials.bronzeMat} attach="material" />
            </mesh>
          ))}
        </group>
      )}

      {/* ===================================================================== */}
      {/* 7. HIGH-TRANSMITTANCE GLAZING & BURMA TEAK ENTRANCE (p7)              */}
      {/* ===================================================================== */}
      {p7 > 0 && (
        <group scale={[p7, 1, 1]}>
          {/* Ground Floor Double-Height Panoramic Living Room Glass */}
          <mesh position={[1.4, 2.05, 2.85]}>
            <boxGeometry args={[3.8, 3.1, 0.06]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.glassMat} attach="material" />
          </mesh>

          {/* First Floor Balcony Glazing Curtain Wall */}
          <mesh position={[1.2, 5.15, 2.55]}>
            <boxGeometry args={[3.6, 2.4, 0.06]} />
            <primitive object={isWireframeMode ? materials.blueprintMat : materials.glassMat} attach="material" />
          </mesh>

          {/* Burma Teak Grand Entrance Pivot Door */}
          <mesh position={[-1.6, 1.85, 2.88]} castShadow>
            <boxGeometry args={[1.5, 2.8, 0.12]} />
            <primitive object={materials.teakwoodMat} attach="material" />
          </mesh>

          {/* Vertical Architectural Bronze Handle */}
          <mesh position={[-1.0, 1.85, 2.97]}>
            <cylinderGeometry args={[0.02, 0.02, 1.4, 16]} />
            <primitive object={materials.bronzeMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 8. ARCHITECTURAL EXTERIOR FINISHES & BRONZE LOUVERS (p8)              */}
      {/* ===================================================================== */}
      {p8 > 0 && (
        <group>
          {/* Vertical Bronze Solar Sunshade Screen Louvers on Master Suite */}
          {[-3.0, -2.7, -2.4, -2.1, -1.8, -1.5].map((lx, idx) => (
            <mesh key={`louver-${idx}`} position={[lx, 5.15, 2.65]} castShadow>
              <boxGeometry args={[0.06, 2.5, 0.22]} />
              <primitive object={materials.bronzeMat} attach="material" />
            </mesh>
          ))}

          {/* Deep Charcoal Textured Feature Portico Wall */}
          <mesh position={[-2.4, 2.05, 1.5]} castShadow>
            <boxGeometry args={[0.3, 3.2, 2.8]} />
            <primitive object={materials.charcoalAccentMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 9. PRECISION GRANITE PAVERS & LANDSCAPING TURF (p9)                   */}
      {/* ===================================================================== */}
      {p9 > 0 && (
        <group scale={[p9, 1, p9]}>
          {/* Left Manicured Green Lawn */}
          <mesh position={[-5.8, -0.04, 0]} receiveShadow>
            <boxGeometry args={[2.8, 0.1, 12]} />
            <primitive object={materials.lawnTurfMat} attach="material" />
          </mesh>

          {/* Right Tropical Garden Bed */}
          <mesh position={[5.8, -0.04, 0]} receiveShadow>
            <boxGeometry args={[2.8, 0.1, 12]} />
            <primitive object={materials.lawnTurfMat} attach="material" />
          </mesh>

          {/* Low Architectural Concrete Planter Boxes */}
          <mesh position={[-4.2, 0.25, 3.8]} castShadow>
            <boxGeometry args={[1.4, 0.45, 0.6]} />
            <primitive object={materials.charcoalAccentMat} attach="material" />
          </mesh>
          <mesh position={[4.2, 0.25, 3.8]} castShadow>
            <boxGeometry args={[1.4, 0.45, 0.6]} />
            <primitive object={materials.charcoalAccentMat} attach="material" />
          </mesh>
        </group>
      )}

      {/* ===================================================================== */}
      {/* 10. FINISHED RESIDENCE: DUSK INTERIOR LIGHTING & GLOW (p10)           */}
      {/* ===================================================================== */}
      {p10 > 0 && (
        <group>
          {/* Ground Floor Interior Dusk Glow Volume */}
          <mesh position={[1.4, 2.0, 1.0]}>
            <boxGeometry args={[3.2, 2.6, 2.4]} />
            <primitive object={materials.warmInteriorMat} attach="material" />
          </mesh>

          {/* First Floor Master Suite Glow Volume */}
          <mesh position={[1.2, 5.1, 1.0]}>
            <boxGeometry args={[3.0, 2.2, 2.2]} />
            <primitive object={materials.warmInteriorMat} attach="material" />
          </mesh>

          {/* Warm Emissive Point Light simulating cozy indoor illumination */}
          <pointLight
            color="#F59E0B"
            intensity={1.8 * p10}
            distance={8}
            position={[1.4, 2.4, 1.8]}
          />
          <pointLight
            color="#FEF08A"
            intensity={1.5 * p10}
            distance={7}
            position={[1.2, 5.2, 1.6]}
          />

          {/* Architectural Linear Facade Uplights */}
          <pointLight
            color="#B78A52"
            intensity={1.2 * p10}
            distance={5}
            position={[-1.6, 0.2, 3.2]}
          />
        </group>
      )}
    </group>
  );
}
