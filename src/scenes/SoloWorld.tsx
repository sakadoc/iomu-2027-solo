import React from 'react';
import { LANDMARKS, LandmarkConfig } from '../config/eventConfig';
import { HotspotPin, JogloRoof } from '../components/three/ArchitecturalPrimitives';

interface SoloWorldProps {
  selectedLandmarkId: string | null;
  onSelectLandmark: (landmark: LandmarkConfig) => void;
}

export const SoloWorld: React.FC<SoloWorldProps> = ({
  selectedLandmarkId,
  onSelectLandmark,
}) => {
  const getLandmark = (id: string) => LANDMARKS.find((l) => l.id === id)!;

  return (
    <group>
      {/* 1. GAPURA GLADAG — Ceremonial Entrance Archway spanning the Golden Avenue */}
      <group position={[0, 0, 4]}>
        {[-4.2, 4.2].map((x) => (
          <group key={x} position={[x, 0, 0]}>
            <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.6, 0.7, 1.6]} />
              <meshStandardMaterial color="#F4E9D7" roughness={0.6} />
            </mesh>
            <mesh position={[0, 2.4, 0]} castShadow receiveShadow>
              <boxGeometry args={[1.15, 3.6, 1.15]} />
              <meshStandardMaterial color="#1F4A42" roughness={0.5} metalness={0.15} />
            </mesh>
            {/* Gold pilaster bands */}
            <mesh position={[0, 4.3, 0]}>
              <boxGeometry args={[1.38, 0.25, 1.38]} />
              <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
            </mesh>
            {/* Javanese pyramidal finial */}
            <mesh position={[0, 5.1, 0]} rotation={[0, Math.PI / 4, 0]}>
              <coneGeometry args={[0.85, 1.35, 4]} />
              <meshStandardMaterial color="#F4E9D7" roughness={0.45} />
            </mesh>
            <mesh position={[0, 5.95, 0]}>
              <sphereGeometry args={[0.16, 12, 12]} />
              <meshStandardMaterial
                color="#C69C54"
                emissive="#C69C54"
                emissiveIntensity={0.6}
                metalness={0.9}
              />
            </mesh>
          </group>
        ))}

        {/* Overhead Javanese Arch Beam */}
        <mesh position={[0, 4.45, 0]} castShadow>
          <boxGeometry args={[8.8, 0.65, 0.9]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.5} />
        </mesh>
        <mesh position={[0, 5.05, 0]}>
          <boxGeometry args={[4.4, 0.55, 0.75]} />
          <meshStandardMaterial color="#14302B" roughness={0.45} />
        </mesh>
        <mesh position={[0, 5.45, 0]}>
          <boxGeometry args={[4.6, 0.14, 0.84]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 5.85, 0]}>
          <torusGeometry args={[0.42, 0.08, 12, 24]} />
          <meshStandardMaterial
            color="#C69C54"
            emissive="#C69C54"
            emissiveIntensity={0.65}
            metalness={0.85}
          />
        </mesh>

        <HotspotPin
          position={[0, 6.9, 0]}
          label="Gapura Gladag"
          sublabel="Gateway"
          isActive={selectedLandmarkId === 'gapura-gladag'}
          onClick={() => onSelectLandmark(getLandmark('gapura-gladag'))}
        />
      </group>

      {/* 2. TUGU JAM PASAR GEDE — Iconic Heritage Clock Tower */}
      <group position={[-9.5, 0, -10]}>
        {/* Stepped plinth */}
        <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
          <boxGeometry args={[3.2, 0.7, 3.2]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.7} />
        </mesh>
        <mesh position={[0, 0.95, 0]} castShadow>
          <boxGeometry args={[2.3, 0.6, 2.3]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.55} />
        </mesh>
        {/* Main shaft */}
        <mesh position={[0, 3.3, 0]} castShadow>
          <boxGeometry args={[1.35, 4.2, 1.35]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.5} />
        </mesh>
        {/* Gold ring collar */}
        <mesh position={[0, 5.45, 0]}>
          <boxGeometry args={[1.65, 0.22, 1.65]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Clock face housing */}
        <mesh position={[0, 6.2, 0]} castShadow>
          <boxGeometry args={[1.55, 1.3, 1.55]} />
          <meshStandardMaterial color="#14302B" roughness={0.45} />
        </mesh>
        {/* Four illuminated clock dials */}
        {[
          [0, 6.2, 0.8, 0],
          [0, 6.2, -0.8, Math.PI],
          [0.8, 6.2, 0, Math.PI / 2],
          [-0.8, 6.2, 0, -Math.PI / 2],
        ].map(([cx, cy, cz, ry], idx) => (
          <mesh key={idx} position={[cx, cy, cz]} rotation={[0, ry, 0]}>
            <circleGeometry args={[0.42, 24]} />
            <meshStandardMaterial
              color="#F4E9D7"
              emissive="#DDBE82"
              emissiveIntensity={0.45}
            />
          </mesh>
        ))}
        {/* Pitched roof + finial */}
        <mesh position={[0, 7.45, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[1.3, 1.4, 4]} />
          <meshStandardMaterial color="#C69C54" metalness={0.8} roughness={0.3} />
        </mesh>

        <HotspotPin
          position={[0, 8.8, 0]}
          label="Tugu Jam Pasar Gede"
          sublabel="Landmark"
          isActive={selectedLandmarkId === 'tugu-jam-pasar-gede'}
          onClick={() => onSelectLandmark(getLandmark('tugu-jam-pasar-gede'))}
        />
      </group>

      {/* 3. KERATON SURAKARTA-INSPIRED COURTYARD ARCHITECTURE */}
      <group position={[9.5, 0, -22]}>
        <mesh position={[0, 0.25, 0]} receiveShadow>
          <boxGeometry args={[8.5, 0.5, 7.5]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.75} />
        </mesh>
        <mesh position={[0, 0.54, 0]}>
          <boxGeometry args={[8.7, 0.08, 7.7]} />
          <meshStandardMaterial color="#C69C54" metalness={0.8} roughness={0.25} />
        </mesh>
        {/* Colonnade pillars */}
        {[
          [-2.8, -2.2],
          [0, -2.2],
          [2.8, -2.2],
          [-2.8, 2.2],
          [0, 2.2],
          [2.8, 2.2],
        ].map(([px, pz], idx) => (
          <mesh key={idx} position={[px, 1.6, pz]} castShadow>
            <cylinderGeometry args={[0.14, 0.18, 2.2, 10]} />
            <meshStandardMaterial color="#C69C54" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        {/* Inner royal sanctum walls */}
        <mesh position={[0, 1.5, 0]} castShadow>
          <boxGeometry args={[4.2, 2.0, 3.4]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.6} />
        </mesh>
        <JogloRoof width={7.2} depth={6.2} position={[0, 2.65, 0]} color="#1F4A42" />

        <HotspotPin
          position={[0, 5.4, 0]}
          label="Keraton Surakarta"
          sublabel="Palace Heritage"
          isActive={selectedLandmarkId === 'keraton-surakarta'}
          onClick={() => onSelectLandmark(getLandmark('keraton-surakarta'))}
        />
      </group>

      {/* 4. PANGGUNG SANGGA BUWANA — Octagonal Royal Observation Tower */}
      <group position={[10.5, 0, -34]}>
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <cylinderGeometry args={[2.9, 3.2, 0.7, 8]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.7} />
        </mesh>
        {/* Lower octagonal tower */}
        <mesh position={[0, 2.1, 0]} castShadow>
          <cylinderGeometry args={[2.0, 2.15, 2.8, 8]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.55} />
        </mesh>
        {/* First balcony overhang */}
        <mesh position={[0, 3.6, 0]}>
          <cylinderGeometry args={[2.45, 2.45, 0.22, 8]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.28} />
        </mesh>
        {/* Upper octagonal watchtower */}
        <mesh position={[0, 4.75, 0]} castShadow>
          <cylinderGeometry args={[1.65, 1.75, 2.1, 8]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.5} />
        </mesh>
        {/* Second balcony */}
        <mesh position={[0, 5.9, 0]}>
          <cylinderGeometry args={[2.1, 2.1, 0.18, 8]} />
          <meshStandardMaterial color="#DDBE82" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Steep octagonal roof + spire */}
        <mesh position={[0, 7.1, 0]} castShadow>
          <coneGeometry args={[2.25, 2.3, 8]} />
          <meshStandardMaterial color="#14302B" roughness={0.48} metalness={0.2} />
        </mesh>
        <mesh position={[0, 8.65, 0]}>
          <cylinderGeometry args={[0.04, 0.08, 1.2, 8]} />
          <meshStandardMaterial color="#C69C54" metalness={0.9} roughness={0.2} />
        </mesh>

        <HotspotPin
          position={[0, 9.7, 0]}
          label="Panggung Sangga Buwana"
          sublabel="Photo Available"
          isActive={selectedLandmarkId === 'panggung-sangga-buwana'}
          onClick={() => onSelectLandmark(getLandmark('panggung-sangga-buwana'))}
        />
      </group>

      {/* 5. PENDOPO MANGKUNEGARAN — Grand Open Javanese Royal Pavilion */}
      <group position={[-9.5, 0, -36]}>
        <mesh position={[0, 0.28, 0]} receiveShadow>
          <boxGeometry args={[8.4, 0.56, 7.2]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.65} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <boxGeometry args={[8.0, 0.1, 6.8]} />
          <meshStandardMaterial color="#C69C54" metalness={0.82} roughness={0.28} />
        </mesh>
        {/* Open-plan golden saka guru columns */}
        {[-3.0, -1.0, 1.0, 3.0].map((px) =>
          [-2.3, 0, 2.3].map((pz) => (
            <mesh key={`${px}-${pz}`} position={[px, 1.85, pz]} castShadow>
              <cylinderGeometry args={[0.12, 0.15, 2.4, 10]} />
              <meshStandardMaterial color="#C69C54" metalness={0.82} roughness={0.25} />
            </mesh>
          ))
        )}
        {/* Warm interior chandelier glow */}
        <pointLight position={[0, 2.6, 0]} intensity={16} distance={14} color="#DDBE82" />
        <JogloRoof width={8.6} depth={7.4} position={[0, 3.05, 0]} color="#14302B" />

        <HotspotPin
          position={[0, 5.9, 0]}
          label="Pendopo Mangkunegaran"
          sublabel="Royal Pavilion"
          isActive={selectedLandmarkId === 'pendopo-mangkunegaran'}
          onClick={() => onSelectLandmark(getLandmark('pendopo-mangkunegaran'))}
        />
      </group>
    </group>
  );
};
