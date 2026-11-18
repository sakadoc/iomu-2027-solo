import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EVENT_CONFIG } from '../config/eventConfig';
import { JogloRoof } from '../components/three/ArchitecturalPrimitives';
import { createPlaqueTexture } from '../components/three/signageTexture';

interface ConferencePavilionProps {
  prefersReducedMotion: boolean;
}

export const ConferencePavilion: React.FC<ConferencePavilionProps> = ({
  prefersReducedMotion,
}) => {
  const emblemTexture = useTexture(EVENT_CONFIG.assets.logoEmblem);
  const plaqueTexture = useMemo(
    () => createPlaqueTexture('IOMU 2027', 'HOTEL ALILA SOLO · SURAKARTA', 'dark'),
    []
  );

  useEffect(() => {
    return () => {
      plaqueTexture.dispose();
    };
  }, [plaqueTexture]);

  const crystalRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!prefersReducedMotion && crystalRef.current) {
      const t = clock.getElapsedTime();
      crystalRef.current.rotation.y = t * 0.45;
      crystalRef.current.position.y = 6.9 + Math.sin(t * 1.5) * 0.16;
    }
  });

  return (
    <group position={[0, 0, -66]}>
      {/* Grand Circular Emerald & Gold Base */}
      <mesh position={[0, 0.3, 0]} receiveShadow>
        <cylinderGeometry args={[10.5, 11.4, 0.6, 32]} />
        <meshStandardMaterial color="#1F4A42" roughness={0.6} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[9.8, 10.1, 0.12, 32]} />
        <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Modern Javanese Glass-and-Emerald Rotunda Hall */}
      <mesh position={[0, 2.35, 0]} castShadow>
        <cylinderGeometry args={[6.4, 6.8, 3.3, 16]} />
        <meshStandardMaterial
          color="#14302B"
          metalness={0.4}
          roughness={0.25}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* 8 Golden Structural Ribs Around the Pavilion */}
      {Array.from({ length: 8 }).map((_, idx) => {
        const angle = (idx / 8) * Math.PI * 2;
        const x = Math.cos(angle) * 6.85;
        const z = Math.sin(angle) * 6.85;
        return (
          <mesh key={idx} position={[x, 2.35, z]} rotation={[0, -angle, 0]} castShadow>
            <boxGeometry args={[0.28, 3.6, 0.45]} />
            <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.22} />
          </mesh>
        );
      })}

      {/* Flanking Modern Wing Canopies */}
      {[-8.4, 8.4].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 1.8, 0]} castShadow>
            <boxGeometry args={[4.2, 2.4, 5.4]} />
            <meshStandardMaterial color="#1F4A42" roughness={0.5} metalness={0.2} />
          </mesh>
          <mesh position={[0, 3.1, 0]}>
            <boxGeometry args={[4.5, 0.18, 5.7]} />
            <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.22} />
          </mesh>
        </group>
      ))}

      {/* Crown Joglo Heritage Roof */}
      <JogloRoof width={9.6} depth={9.6} position={[0, 4.0, 0]} color="#1F4A42" />

      {/* Illuminated IOMU 2027 Architectural Signage */}
      <mesh position={[0, 2.75, 6.95]}>
        <planeGeometry args={[5.8, 2.15]} />
        <meshBasicMaterial map={plaqueTexture} />
      </mesh>

      {/* Floating Occupational Medicine Kawung Sculpture */}
      <group ref={crystalRef} position={[0, 6.9, 0]}>
        <mesh>
          <planeGeometry args={[2.0, 2.0]} />
          <meshBasicMaterial map={emblemTexture} transparent side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.35, 0.05, 12, 36]} />
          <meshStandardMaterial
            color="#DDBE82"
            emissive="#C69C54"
            emissiveIntensity={0.8}
            metalness={0.9}
          />
        </mesh>
      </group>
    </group>
  );
};
