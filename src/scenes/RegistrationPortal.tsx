import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { EVENT_CONFIG } from '../config/eventConfig';
import { createPlaqueTexture } from '../components/three/signageTexture';

interface RegistrationPortalProps {
  prefersReducedMotion: boolean;
}

export const RegistrationPortal: React.FC<RegistrationPortalProps> = ({
  prefersReducedMotion,
}) => {
  const gununganTexture = useTexture(EVENT_CONFIG.assets.gununganGold);
  const logoFinal3dTexture = useTexture(EVENT_CONFIG.assets.logoFinal3d);
  const plaqueTexture = useMemo(
    () => createPlaqueTexture('BE PART OF IOMU 2027', 'HOTEL ALILA SOLO · MAY 7–9, 2027', 'dark'),
    []
  );

  useEffect(() => {
    return () => {
      plaqueTexture.dispose();
    };
  }, [plaqueTexture]);

  const crownRingRef = useRef<THREE.Mesh>(null);
  const logoTopRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (!prefersReducedMotion && crownRingRef.current) {
      crownRingRef.current.rotation.z = t * 0.25;
    }
    if (!prefersReducedMotion && logoTopRef.current) {
      logoTopRef.current.position.y = 6.65 + Math.sin(t * 1.4) * 0.14;
    }
  });

  return (
    <group position={[0, 0, -268]}>
      {/* Grand Ceremonial Plaza */}
      <mesh position={[0, 0.28, 0]} receiveShadow>
        <cylinderGeometry args={[9.2, 10.0, 0.56, 32]} />
        <meshStandardMaterial color="#1F4A42" roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.58, 0]}>
        <cylinderGeometry args={[8.8, 9.0, 0.1, 32]} />
        <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.22} />
      </mesh>

      {/* Ceremonial Gateway Twin Columns */}
      {[-4.2, 4.2].map((x) => (
        <group key={x} position={[x, 0, 0]}>
          <mesh position={[0, 3.0, 0]} castShadow>
            <boxGeometry args={[1.3, 5.2, 1.3]} />
            <meshStandardMaterial color="#14302B" roughness={0.45} />
          </mesh>
          <mesh position={[0, 5.75, 0]}>
            <boxGeometry args={[1.6, 0.3, 1.6]} />
            <meshStandardMaterial color="#C69C54" metalness={0.88} roughness={0.22} />
          </mesh>
        </group>
      ))}

      {/* Golden Arch Crown */}
      <mesh position={[0, 5.2, 0]}>
        <torusGeometry args={[4.2, 0.26, 14, 48, Math.PI]} />
        <meshStandardMaterial
          color="#C69C54"
          emissive="#C69C54"
          emissiveIntensity={0.5}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Gunungan Crest at Apex */}
      <mesh position={[0, 9.35, 0.2]}>
        <planeGeometry args={[2.2, 3.4]} />
        <meshBasicMaterial map={gununganTexture} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Rotating Halo Ring */}
      <mesh ref={crownRingRef} position={[0, 4.4, -0.4]}>
        <ringGeometry args={[3.2, 3.45, 48]} />
        <meshBasicMaterial color="#DDBE82" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Illuminated Gateway Sign */}
      <mesh position={[0, 4.75, 0.65]}>
        <planeGeometry args={[5.4, 2.0]} />
        <meshBasicMaterial map={plaqueTexture} />
      </mesh>

      {/* Upper 3D Floating IOMU Solo 2027 Logo Monument (Visible Above Registration Card) */}
      <group ref={logoTopRef} position={[0, 6.65, 0.85]}>
        <mesh>
          <boxGeometry args={[6.6, 2.95, 0.34]} />
          <meshStandardMaterial color="#14302B" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.19]}>
          <planeGeometry args={[6.1, 2.64]} />
          <meshBasicMaterial map={logoFinal3dTexture} transparent />
        </mesh>
        <mesh position={[0, 0, -0.19]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[6.1, 2.64]} />
          <meshBasicMaterial map={logoFinal3dTexture} transparent />
        </mesh>
      </group>

      {/* Archway Center 3D Logo Panel beneath BE PART OF IOMU 2027 sign */}
      <group position={[0, 2.65, 0.72]}>
        <mesh>
          <boxGeometry args={[5.2, 2.32, 0.26]} />
          <meshStandardMaterial color="#14302B" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0, 0.15]}>
          <planeGeometry args={[4.8, 2.08]} />
          <meshBasicMaterial map={logoFinal3dTexture} transparent />
        </mesh>
      </group>
    </group>
  );
};
