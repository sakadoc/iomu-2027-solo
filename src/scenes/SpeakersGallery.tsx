import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { CONFERENCE_SPEAKERS, WORKSHOP_SPEAKERS, SpeakerProfile } from '../data/programData';
import { HotspotPin } from '../components/three/ArchitecturalPrimitives';
import { createPlaqueTexture } from '../components/three/signageTexture';

interface SpeakersGalleryProps {
  selectedSpeakerId: string | null;
  onSelectSpeaker: (speaker: SpeakerProfile) => void;
}

const FLOATING_GALLERY_COORDS: [number, number, number][] = [
  [-9.2, 2.7, -138],
  [9.2, 3.4, -141],
  [-8.6, 3.1, -146],
  [8.6, 2.5, -149],
  [-9.4, 3.6, -154],
  [9.4, 2.8, -157],
  [-8.4, 2.4, -161],
  [8.4, 3.3, -164],
];

export const SpeakersGallery: React.FC<SpeakersGalleryProps> = ({
  selectedSpeakerId,
  onSelectSpeaker,
}) => {
  const groupRefs = useRef<(THREE.Group | null)[]>([]);

  const floatingSpeakers = useMemo<SpeakerProfile[]>(() => {
    const picked = [...CONFERENCE_SPEAKERS.slice(0, 5), ...WORKSHOP_SPEAKERS.slice(0, 3)];
    return picked.map((sp, idx) => {
      const coord = FLOATING_GALLERY_COORDS[idx % FLOATING_GALLERY_COORDS.length];
      const isLeft = coord[0] < 0;
      return {
        ...sp,
        position: coord,
        cameraFocusPos: [isLeft ? -3.2 : 3.2, coord[1] + 0.3, coord[2] + 6],
        cameraLookAt: [coord[0], coord[1], coord[2]],
      };
    });
  }, []);

  const plaqueTextures = useMemo(
    () =>
      floatingSpeakers.map((sp) => {
        const heading =
          sp.fullName === 'To Be Announced' ? sp.slotLabel.toUpperCase() : sp.fullName;
        const shortPos =
          sp.positionTitle.length > 26
            ? `${sp.positionTitle.slice(0, 26).trimEnd()}...`
            : sp.positionTitle;
        const subline =
          sp.fullName === 'To Be Announced'
            ? `${sp.fullName} · ${shortPos}`
            : `${sp.slotLabel} · ${shortPos}`;
        return createPlaqueTexture(heading, subline, 'dark');
      }),
    [floatingSpeakers]
  );

  useEffect(() => {
    return () => {
      plaqueTextures.forEach((tex) => tex.dispose());
    };
  }, [plaqueTextures]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    floatingSpeakers.forEach((sp, idx) => {
      const grp = groupRefs.current[idx];
      if (!grp) return;
      const baseY = sp.position?.[1] ?? 2.8;
      grp.position.y = baseY + Math.sin(t * 1.55 + idx * 0.85) * 0.22;
      grp.rotation.z = Math.sin(t * 0.9 + idx * 0.7) * 0.025;
    });
  });

  return (
    <group>
      {/* Reflection Walkway */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.025, -151]}>
        <planeGeometry args={[12, 34]} />
        <meshStandardMaterial color="#0D231F" roughness={0.18} metalness={0.65} />
      </mesh>

      {floatingSpeakers.map((speaker, idx) => {
        const coord = speaker.position ?? [0, 2.8, -145];
        const isLeft = coord[0] < 0;
        const rotY = isLeft ? Math.PI * 0.16 : -Math.PI * 0.16;
        const isSelected = selectedSpeakerId === speaker.id;

        return (
          <group
            key={speaker.id}
            ref={(el) => {
              groupRefs.current[idx] = el;
            }}
            position={coord}
            rotation={[0, rotY, 0]}
            onClick={(e) => {
              e.stopPropagation();
              onSelectSpeaker(speaker);
            }}
          >
            {/* Floating Rectangular Speaker Name Box (Styled by SilhouetteLineStyler) */}
            <mesh castShadow receiveShadow>
              <boxGeometry args={[3.4, 1.9, 0.44]} />
              <meshStandardMaterial
                color="#14302B"
                emissive={isSelected ? '#C69C54' : '#8A662C'}
                emissiveIntensity={isSelected ? 0.35 : 0.08}
                roughness={0.45}
              />
            </mesh>

            {/* Front Name Plaque */}
            <mesh position={[0, 0, 0.23]}>
              <planeGeometry args={[3.15, 1.65]} />
              <meshBasicMaterial map={plaqueTextures[idx]} />
            </mesh>

            {/* Back Name Plaque */}
            <mesh position={[0, 0, -0.23]} rotation={[0, Math.PI, 0]}>
              <planeGeometry args={[3.15, 1.65]} />
              <meshBasicMaterial map={plaqueTextures[idx]} />
            </mesh>

            <HotspotPin
              position={[0, 1.55, 0]}
              label={speaker.slotLabel}
              sublabel="TBA"
              isActive={isSelected}
              onClick={() => onSelectSpeaker(speaker)}
            />
          </group>
        );
      })}
    </group>
  );
};
