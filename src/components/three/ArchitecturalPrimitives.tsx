import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface HotspotPinProps {
  position: [number, number, number];
  label: string;
  sublabel?: string;
  isActive?: boolean;
  onClick: () => void;
}

export const HotspotPin: React.FC<HotspotPinProps> = ({
  position,
  label,
  sublabel,
  isActive = false,
  onClick,
}) => {
  const [hovered, setHovered] = useState(false);
  const beaconRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (beaconRef.current) {
      beaconRef.current.position.y = Math.sin(t * 2.4) * 0.14;
      beaconRef.current.rotation.y = t * 0.9;
    }
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 2.8) * 0.14 + (hovered || isActive ? 0.25 : 0);
      ringRef.current.scale.set(s, s, 1);
    }
  });

  return (
    <group position={position}>
      {/* Interactive 3D Octahedron Marker */}
      <mesh
        ref={beaconRef}
        userData={{ skipSilhouette: true }}
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <octahedronGeometry args={[0.32, 0]} />
        <meshStandardMaterial
          color={isActive || hovered ? '#F4E9D7' : '#C69C54'}
          emissive="#C69C54"
          emissiveIntensity={isActive || hovered ? 1.4 : 0.7}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Halo Ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.35, 0]} userData={{ skipSilhouette: true }}>
        <ringGeometry args={[0.38, 0.52, 24]} />
        <meshBasicMaterial
          color="#DDBE82"
          transparent
          opacity={isActive || hovered ? 0.95 : 0.5}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Accessible Floating Pill Label */}
      <Html center distanceFactor={18} position={[0, 0.9, 0]} zIndexRange={[10, 0]}>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClick();
          }}
          className={`group flex items-center gap-2 rounded-full border px-3 py-1 text-left shadow-lg transition-all duration-200 whitespace-nowrap ${
            isActive
              ? 'border-[#F4E9D7] bg-[#C69C54] text-[#14302B] scale-105'
              : 'border-[#C69C54]/80 bg-[#14302B]/90 text-[#F4E9D7] hover:bg-[#1F4A42] hover:border-[#DDBE82]'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              isActive ? 'bg-[#14302B]' : 'bg-[#C69C54] animate-pulse'
            }`}
          />
          <span className="font-display text-[11px] font-bold tracking-wide">{label}</span>
          {sublabel && (
            <span
              className={`hidden sm:inline text-[10px] ${
                isActive ? 'text-[#14302B]/80' : 'text-[#DDBE82]'
              }`}
            >
              · {sublabel}
            </span>
          )}
        </button>
      </Html>
    </group>
  );
};

interface JogloRoofProps {
  width?: number;
  depth?: number;
  color?: string;
  trimColor?: string;
  position?: [number, number, number];
}

export const JogloRoof: React.FC<JogloRoofProps> = ({
  width = 5.4,
  depth = 5.4,
  color = '#1F4A42',
  trimColor = '#C69C54',
  position = [0, 0, 0],
}) => {
  const lowerRadius = Math.max(width, depth) * 0.65;
  return (
    <group position={position}>
      {/* Lower sweeping eaves */}
      <mesh position={[0, 0.45, 0]} rotation={[0, Math.PI / 4, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[lowerRadius * 0.42, lowerRadius, 0.9, 4]} />
        <meshStandardMaterial color={color} roughness={0.55} metalness={0.2} />
      </mesh>
      {/* Golden eave trim */}
      <mesh position={[0, 0.04, 0]} rotation={[0, Math.PI / 4, 0]}>
        <cylinderGeometry args={[lowerRadius * 1.01, lowerRadius * 1.03, 0.08, 4]} />
        <meshStandardMaterial color={trimColor} metalness={0.82} roughness={0.28} />
      </mesh>
      {/* Upper steeper Brunjung crown */}
      <mesh position={[0, 1.45, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
        <cylinderGeometry args={[lowerRadius * 0.1, lowerRadius * 0.43, 1.25, 4]} />
        <meshStandardMaterial color="#14302B" roughness={0.45} metalness={0.3} />
      </mesh>
      {/* Top golden ridge bar */}
      <mesh position={[0, 2.1, 0]}>
        <boxGeometry args={[width * 0.16, 0.14, 0.18]} />
        <meshStandardMaterial color={trimColor} metalness={0.9} roughness={0.2} />
      </mesh>
    </group>
  );
};
