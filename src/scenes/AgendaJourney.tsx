import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { AGENDA_DAYS } from '../data/programData';
import { HotspotPin } from '../components/three/ArchitecturalPrimitives';
import { createPlaqueTexture } from '../components/three/signageTexture';

interface AgendaJourneyProps {
  activeDayId: string;
  onSelectDay: (dayId: string) => void;
  prefersReducedMotion: boolean;
}

export const AgendaJourney: React.FC<AgendaJourneyProps> = ({
  activeDayId,
  onSelectDay,
  prefersReducedMotion,
}) => {
  const dayTextures = useMemo(
    () =>
      AGENDA_DAYS.map((day) =>
        createPlaqueTexture(day.label.toUpperCase(), day.fullDate.toUpperCase(), 'cream')
      ),
    []
  );

  useEffect(() => {
    return () => {
      dayTextures.forEach((t) => t.dispose());
    };
  }, [dayTextures]);

  const orbRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(({ clock }) => {
    if (prefersReducedMotion) return;
    const t = clock.getElapsedTime();
    orbRefs.current.forEach((orb, idx) => {
      if (orb) {
        orb.position.y = 4.6 + Math.sin(t * 1.8 + idx * 1.2) * 0.16;
        orb.rotation.y = t * 0.6 + idx;
      }
    });
  });

  return (
    <group>
      {/* Elevated Golden Bridge Deck */}
      <mesh position={[0, 0.25, -184]} receiveShadow>
        <boxGeometry args={[14, 0.5, 28]} />
        <meshStandardMaterial color="#1F4A42" roughness={0.65} />
      </mesh>
      <mesh position={[0, 0.53, -184]}>
        <boxGeometry args={[14.3, 0.08, 28.3]} />
        <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
      </mesh>

      {AGENDA_DAYS.map((day, idx) => {
        const isActive = activeDayId === day.id;
        return (
          <group
            key={day.id}
            position={day.worldPosition}
            onClick={(e) => {
              e.stopPropagation();
              onSelectDay(day.id);
            }}
          >
            {/* Milestone Pillar */}
            <mesh position={[0, 1.8, 0]} castShadow>
              <cylinderGeometry args={[0.9, 1.2, 2.6, 8]} />
              <meshStandardMaterial color="#14302B" roughness={0.5} />
            </mesh>
            <mesh position={[0, 3.15, 0]}>
              <cylinderGeometry args={[1.05, 1.05, 0.15, 8]} />
              <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.22} />
            </mesh>

            {/* Illuminated Day Plaque */}
            <mesh position={[0, 2.2, 1.05]}>
              <planeGeometry args={[2.6, 1.05]} />
              <meshBasicMaterial map={dayTextures[idx]} />
            </mesh>

            {/* Floating Golden Time Orb */}
            <mesh
              ref={(el) => {
                orbRefs.current[idx] = el;
              }}
              position={[0, 4.6, 0]}
            >
              <icosahedronGeometry args={[0.45, 0]} />
              <meshStandardMaterial
                color={isActive ? '#F4E9D7' : '#C69C54'}
                emissive="#C69C54"
                emissiveIntensity={isActive ? 1.2 : 0.6}
                metalness={0.85}
                roughness={0.2}
              />
            </mesh>

            <HotspotPin
              position={[0, 5.7, 0]}
              label={day.label}
              sublabel={day.fullDate}
              isActive={isActive}
              onClick={() => onSelectDay(day.id)}
            />
          </group>
        );
      })}
    </group>
  );
};
