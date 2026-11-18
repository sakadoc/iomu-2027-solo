import React, { useState } from 'react';
import { WORKSHOP_PAVILIONS, WorkshopPavilionConfig } from '../data/programData';
import { HotspotPin, JogloRoof } from '../components/three/ArchitecturalPrimitives';

interface WorkshopZoneProps {
  selectedPavilionId: string | null;
  onSelectPavilion: (pavilion: WorkshopPavilionConfig) => void;
}

export const WorkshopZone: React.FC<WorkshopZoneProps> = ({
  selectedPavilionId,
  onSelectPavilion,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <group>
      {WORKSHOP_PAVILIONS.map((pavilion) => {
        const isActive = selectedPavilionId === pavilion.id || hoveredId === pavilion.id;
        return (
          <group
            key={pavilion.id}
            position={pavilion.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectPavilion(pavilion);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredId(pavilion.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              setHoveredId(null);
              document.body.style.cursor = 'auto';
            }}
          >
            {/* Base Plinth */}
            <mesh position={[0, 0.25, 0]} receiveShadow>
              <cylinderGeometry args={[4.2, 4.6, 0.5, 8]} />
              <meshStandardMaterial color="#14302B" roughness={0.65} />
            </mesh>
            <mesh position={[0, 0.54, 0]}>
              <cylinderGeometry args={[4.0, 4.1, 0.08, 8]} />
              <meshStandardMaterial
                color="#C69C54"
                emissive={isActive ? '#C69C54' : '#8A662C'}
                emissiveIntensity={isActive ? 0.9 : 0.25}
                metalness={0.85}
                roughness={0.25}
              />
            </mesh>

            {/* Unique Architectural Silhouette per Pavilion Type */}
            {pavilion.accentStyle === 'tajug' && (
              <group>
                <mesh position={[0, 1.8, 0]} castShadow>
                  <boxGeometry args={[4.4, 2.4, 4.4]} />
                  <meshStandardMaterial color="#1F4A42" roughness={0.45} metalness={0.2} />
                </mesh>
                <JogloRoof width={5.6} depth={5.6} position={[0, 3.0, 0]} color="#1F4A42" />
              </group>
            )}

            {pavilion.accentStyle === 'studio' && (
              <group>
                <mesh position={[0, 1.5, 0]} castShadow>
                  <boxGeometry args={[5.0, 1.9, 3.6]} />
                  <meshStandardMaterial color="#F4E9D7" roughness={0.55} />
                </mesh>
                <mesh position={[0, 2.7, 0]} castShadow>
                  <boxGeometry args={[3.4, 1.1, 2.8]} />
                  <meshStandardMaterial color="#1F4A42" roughness={0.45} />
                </mesh>
                <mesh position={[0, 3.35, 0]}>
                  <boxGeometry args={[3.7, 0.14, 3.1]} />
                  <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.2} />
                </mesh>
              </group>
            )}

            {pavilion.accentStyle === 'rotunda' && (
              <group>
                <mesh position={[0, 1.85, 0]} castShadow>
                  <cylinderGeometry args={[2.5, 2.7, 2.6, 8]} />
                  <meshStandardMaterial color="#1F4A42" roughness={0.48} />
                </mesh>
                <mesh position={[0, 3.25, 0]}>
                  <sphereGeometry args={[2.2, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
                  <meshStandardMaterial color="#F4E9D7" roughness={0.45} metalness={0.2} />
                </mesh>
                <mesh position={[0, 5.55, 0]}>
                  <sphereGeometry args={[0.24, 12, 12]} />
                  <meshStandardMaterial color="#C69C54" metalness={0.9} roughness={0.2} />
                </mesh>
              </group>
            )}

            {pavilion.accentStyle === 'pendopo' && (
              <group>
                {[-1.7, 1.7].map((px) =>
                  [-1.7, 1.7].map((pz) => (
                    <mesh key={`${px}-${pz}`} position={[px, 1.7, pz]} castShadow>
                      <cylinderGeometry args={[0.14, 0.18, 2.3, 10]} />
                      <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
                    </mesh>
                  ))
                )}
                <JogloRoof width={5.2} depth={5.2} position={[0, 2.85, 0]} color="#14302B" />
              </group>
            )}

            <HotspotPin
              position={[0, 5.6, 0]}
              label={pavilion.shortTitle}
              sublabel="Explore"
              isActive={selectedPavilionId === pavilion.id}
              onClick={() => onSelectPavilion(pavilion)}
            />
          </group>
        );
      })}
    </group>
  );
};
