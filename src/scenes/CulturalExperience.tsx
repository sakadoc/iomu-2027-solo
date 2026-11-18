import React from 'react';
import { HotelConfig, LANDMARKS, LandmarkConfig, MAIN_HOTEL } from '../config/eventConfig';
import { HotspotPin } from '../components/three/ArchitecturalPrimitives';

interface CulturalExperienceProps {
  selectedLandmarkId: string | null;
  selectedHotelId: string | null;
  onSelectLandmark: (landmark: LandmarkConfig) => void;
  onSelectHotel: (hotel: HotelConfig) => void;
}

export const CulturalExperience: React.FC<CulturalExperienceProps> = ({
  selectedLandmarkId,
  selectedHotelId,
  onSelectLandmark,
  onSelectHotel,
}) => {
  const getLandmark = (id: string) => LANDMARKS.find((l) => l.id === id)!;

  return (
    <group>
      {/* MASJID RAYA SHEIKH ZAYED — Stylized Cream & Gold Grand Dome Mosque */}
      <group position={[-9.5, 0, -214]}>
        <mesh position={[0, 0.3, 0]} receiveShadow>
          <boxGeometry args={[9.2, 0.6, 9.2]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.55} />
        </mesh>
        <mesh position={[0, 1.85, 0]} castShadow>
          <boxGeometry args={[6.6, 2.5, 6.6]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.45} />
        </mesh>
        <mesh position={[0, 3.15, 0]}>
          <boxGeometry args={[6.8, 0.22, 6.8]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
        <mesh position={[0, 3.4, 0]} castShadow>
          <sphereGeometry args={[2.35, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.35} metalness={0.15} />
        </mesh>
        <mesh position={[0, 6.1, 0]}>
          <cylinderGeometry args={[0.05, 0.08, 0.8, 8]} />
          <meshStandardMaterial color="#C69C54" metalness={0.9} roughness={0.2} />
        </mesh>
        {[
          [-3.7, -3.7],
          [3.7, -3.7],
          [-3.7, 3.7],
          [3.7, 3.7],
        ].map(([mx, mz], idx) => (
          <group key={idx} position={[mx, 0, mz]}>
            <mesh position={[0, 3.5, 0]} castShadow>
              <cylinderGeometry args={[0.26, 0.36, 6.4, 12]} />
              <meshStandardMaterial color="#F4E9D7" roughness={0.45} />
            </mesh>
            <mesh position={[0, 6.85, 0]}>
              <coneGeometry args={[0.34, 0.9, 12]} />
              <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
            </mesh>
          </group>
        ))}

        <HotspotPin
          position={[0, 7.6, 0]}
          label="Masjid Raya Sheikh Zayed"
          sublabel="Cultural"
          isActive={selectedLandmarkId === 'masjid-raya-sheikh-zayed'}
          onClick={() => onSelectLandmark(getLandmark('masjid-raya-sheikh-zayed'))}
        />
      </group>

      {/* TUGU PAMANDENGAN — Historic Obelisk Monument */}
      <group position={[8.5, 0, -220]}>
        <mesh position={[0, 0.35, 0]} receiveShadow>
          <boxGeometry args={[3.4, 0.7, 3.4]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.65} />
        </mesh>
        <mesh position={[0, 1.0, 0]}>
          <boxGeometry args={[2.3, 0.6, 2.3]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.5} />
        </mesh>
        <mesh position={[0, 3.8, 0]} castShadow>
          <cylinderGeometry args={[0.28, 0.68, 5.0, 4]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.45} />
        </mesh>
        <mesh position={[0, 6.65, 0]} rotation={[0, Math.PI / 4, 0]}>
          <coneGeometry args={[0.32, 0.85, 4]} />
          <meshStandardMaterial
            color="#C69C54"
            emissive="#C69C54"
            emissiveIntensity={0.65}
            metalness={0.9}
          />
        </mesh>

        <HotspotPin
          position={[0, 7.8, 0]}
          label="Tugu Pamandengan"
          sublabel="Monument"
          isActive={selectedLandmarkId === 'tugu-pamandengan'}
          onClick={() => onSelectLandmark(getLandmark('tugu-pamandengan'))}
        />
      </group>

      {/* HOTEL ALILA SOLO — Stylized Modern Stepped High-Rise Accommodation Hub */}
      <group position={MAIN_HOTEL.position || [-8.5, 0, -236]}>
        {/* Podium & Grand Canopy */}
        <mesh position={[0, 0.6, 0]} receiveShadow castShadow>
          <boxGeometry args={[6.8, 1.2, 5.2]} />
          <meshStandardMaterial color="#1F4A42" roughness={0.5} metalness={0.2} />
        </mesh>
        <mesh position={[0, 1.28, 0]}>
          <boxGeometry args={[7.1, 0.14, 5.5]} />
          <meshStandardMaterial color="#C69C54" metalness={0.85} roughness={0.25} />
        </mesh>
        {/* Main Glass & Ivory Tower */}
        <mesh position={[-0.6, 4.9, 0]} castShadow>
          <boxGeometry args={[3.4, 7.2, 2.8]} />
          <meshStandardMaterial color="#F4E9D7" roughness={0.35} metalness={0.25} />
        </mesh>
        {/* Stepped Executive Wing */}
        <mesh position={[1.4, 3.8, 0.3]} castShadow>
          <boxGeometry args={[2.2, 5.0, 2.2]} />
          <meshStandardMaterial color="#14302B" roughness={0.35} metalness={0.4} />
        </mesh>
        {/* Golden Vertical Architectural Fins */}
        {[-1.8, -0.6, 0.6, 1.8].map((fx, idx) => (
          <mesh key={idx} position={[fx, 5.0, 1.44]}>
            <boxGeometry args={[0.1, 7.0, 0.12]} />
            <meshStandardMaterial color="#C69C54" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Rooftop Agra Crown */}
        <mesh position={[-0.6, 8.75, 0]}>
          <boxGeometry args={[3.6, 0.45, 3.0]} />
          <meshStandardMaterial
            color="#C69C54"
            emissive="#8A662C"
            emissiveIntensity={0.45}
            metalness={0.88}
          />
        </mesh>

        <HotspotPin
          position={[0, 10.0, 0]}
          label="Hotel Alila Solo"
          sublabel="Main Stay"
          isActive={selectedHotelId === MAIN_HOTEL.id}
          onClick={() => onSelectHotel(MAIN_HOTEL)}
        />
      </group>
    </group>
  );
};
