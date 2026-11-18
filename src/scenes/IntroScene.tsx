import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EVENT_CONFIG } from '../config/eventConfig';

interface IntroSceneProps {
  scrollProgressRef: React.MutableRefObject<number>;
  prefersReducedMotion: boolean;
}

export const IntroScene: React.FC<IntroSceneProps> = ({
  scrollProgressRef,
  prefersReducedMotion,
}) => {
  const gununganTexture = useTexture(EVENT_CONFIG.assets.gununganGold);
  const emblemTexture = useTexture(EVENT_CONFIG.assets.logoEmblem);

  const leftWingRef = useRef<THREE.Group>(null);
  const rightWingRef = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.Mesh>(null);
  const emblemRef = useRef<THREE.Mesh>(null);

  // Sculpted 3D Gunungan silhouette frame
  const gununganShape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 7.6);
    s.bezierCurveTo(1.7, 5.4, 3.1, 3.2, 3.2, 1.8);
    s.bezierCurveTo(3.3, 0.8, 2.5, 0.3, 2.7, 0);
    s.lineTo(-2.7, 0);
    s.bezierCurveTo(-2.5, 0.3, -3.3, 0.8, -3.2, 1.8);
    s.bezierCurveTo(-3.1, 3.2, -1.7, 5.4, 0, 7.6);
    return s;
  }, []);

  useFrame(({ clock }) => {
    const progress = THREE.MathUtils.clamp(scrollProgressRef.current / 0.14, 0, 1);
    const eased = progress * progress * (3 - 2 * progress);

    if (leftWingRef.current && rightWingRef.current) {
      const spreadX = eased * 5.2;
      const swingY = eased * 0.65;
      leftWingRef.current.position.x = -spreadX;
      leftWingRef.current.rotation.y = swingY;
      rightWingRef.current.position.x = spreadX;
      rightWingRef.current.rotation.y = -swingY;
    }

    if (!prefersReducedMotion) {
      const t = clock.getElapsedTime();
      if (haloRef.current) {
        haloRef.current.rotation.z = t * 0.14;
      }
      if (emblemRef.current) {
        emblemRef.current.position.y = 4.6 + Math.sin(t * 1.4) * 0.18;
      }
    }
  });

  return (
    <group position={[0, 0, 22]}>
      {/* Ceremonial Stepped Pedestal */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <cylinderGeometry args={[5.8, 6.4, 0.5, 8]} />
        <meshStandardMaterial color="#1F4A42" roughness={0.65} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[5.4, 5.6, 0.08, 8]} />
        <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Radiant Golden Ring Behind Gunungan */}
      <mesh ref={haloRef} position={[0, 4.3, -0.6]}>
        <ringGeometry args={[3.9, 4.18, 48]} />
        <meshBasicMaterial color="#DDBE82" transparent opacity={0.45} side={THREE.DoubleSide} />
      </mesh>

      {/* Left Parting Gunungan Wing */}
      <group ref={leftWingRef} position={[0, 0.55, 0]}>
        <mesh position={[-1.45, 3.7, 0.05]}>
          <planeGeometry args={[2.9, 7.3]} />
          <meshStandardMaterial
            map={gununganTexture}
            transparent
            alphaTest={0.15}
            emissive="#8A662C"
            emissiveIntensity={0.28}
            roughness={0.35}
            metalness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Flanking gold pillar */}
        <mesh position={[-3.35, 2.2, 0]}>
          <boxGeometry args={[0.36, 4.4, 0.36]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Right Parting Gunungan Wing */}
      <group ref={rightWingRef} position={[0, 0.55, 0]}>
        <mesh position={[1.45, 3.7, 0.08]}>
          <planeGeometry args={[2.9, 7.3]} />
          <meshStandardMaterial
            map={gununganTexture}
            transparent
            alphaTest={0.15}
            emissive="#8A662C"
            emissiveIntensity={0.28}
            roughness={0.35}
            metalness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Flanking gold pillar */}
        <mesh position={[3.35, 2.2, 0]}>
          <boxGeometry args={[0.36, 4.4, 0.36]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
      </group>

      {/* Sculpted Backlit Gunungan Arch Frame */}
      <mesh position={[0, 0.55, -0.35]}>
        <extrudeGeometry
          args={[
            gununganShape,
            {
              depth: 0.16,
              bevelEnabled: true,
              bevelThickness: 0.04,
              bevelSize: 0.04,
              bevelSegments: 2,
            },
          ]}
        />
        <meshStandardMaterial
          color="#14302B"
          emissive="#1F4A42"
          emissiveIntensity={0.3}
          metalness={0.4}
          roughness={0.5}
          wireframe
        />
      </mesh>

      {/* Floating IOMU Kawung Emblem Revealed Through the Portal */}
      <mesh ref={emblemRef} position={[0, 4.6, -2.5]}>
        <planeGeometry args={[2.4, 2.4]} />
        <meshBasicMaterial map={emblemTexture} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};
