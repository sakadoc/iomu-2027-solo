import React, { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useProgress } from '@react-three/drei';
import { HotelConfig, LandmarkConfig, EVENT_CONFIG } from '../../config/eventConfig';
import { SpeakerProfile, WorkshopPavilionConfig } from '../../data/programData';
import { useMediaCapabilities } from '../../hooks/useMediaCapabilities';
import { CameraRig } from './CameraRig';
import { WorldEnvironment } from './WorldEnvironment';
import { SilhouetteLineStyler } from './SilhouetteLineStyler';
import { SelectedFocusItem } from './types';
import { WebGLErrorBoundary, isWebGLAvailable } from './WebGLErrorBoundary';
import { IntroScene } from '../../scenes/IntroScene';
import { SoloWorld } from '../../scenes/SoloWorld';
import { ConferencePavilion } from '../../scenes/ConferencePavilion';
import { WorkshopZone } from '../../scenes/WorkshopZone';
import { SpeakersGallery } from '../../scenes/SpeakersGallery';
import { AgendaJourney } from '../../scenes/AgendaJourney';
import { CulturalExperience } from '../../scenes/CulturalExperience';
import { RegistrationPortal } from '../../scenes/RegistrationPortal';

interface ExperienceCanvasProps {
  scrollProgressRef: React.MutableRefObject<number>;
  selectedItem: SelectedFocusItem;
  onSelectLandmark: (landmark: LandmarkConfig) => void;
  onSelectPavilion: (pavilion: WorkshopPavilionConfig) => void;
  onSelectSpeaker: (speaker: SpeakerProfile) => void;
  onSelectHotel: (hotel: HotelConfig) => void;
  activeDayId: string;
  onSelectDay: (dayId: string) => void;
  liteMode: boolean;
}

const LoadingOverlay: React.FC = () => {
  const { active, progress } = useProgress();
  if (!active) return null;

  return (
    <div
      aria-live="polite"
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-keraton text-ivory transition-opacity duration-500"
    >
      <div className="bg-kawung-gold-subtle pointer-events-none absolute inset-0 opacity-10" />
      <img
        src={EVENT_CONFIG.assets.logoDarkBg}
        alt={EVENT_CONFIG.shortName}
        className="relative z-10 mb-6 w-52 sm:w-64"
      />
      <p className="relative z-10 font-display text-sm font-bold tracking-[0.2em] text-light-gold uppercase">
        Preparing Surakarta 3D World
      </p>
      <div className="relative z-10 mt-4 h-1.5 w-56 overflow-hidden rounded-full bg-emerald">
        <div
          className="h-full bg-kawung-gold transition-all duration-300"
          style={{ width: `${Math.max(12, Math.round(progress))}%` }}
        />
      </div>
      <span className="relative z-10 mt-2 text-xs text-ivory/75">
        {Math.round(progress)}%
      </span>
    </div>
  );
};

const HeritageFallbackBackdrop: React.FC = () => (
  <div className="fixed inset-0 z-0 overflow-hidden bg-keraton">
    <div className="bg-kawung-gold-subtle absolute inset-0 opacity-10" />
    <div className="absolute inset-0 bg-gradient-to-b from-keraton/90 via-emerald/45 to-keraton" />
    <img
      src={EVENT_CONFIG.assets.gununganGold}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute right-[-6%] top-20 h-[70vh] opacity-15 object-contain"
    />
    <img
      src={EVENT_CONFIG.assets.skylineCream}
      alt=""
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 w-full opacity-20 object-cover"
    />
  </div>
);

export const ExperienceCanvas: React.FC<ExperienceCanvasProps> = ({
  scrollProgressRef,
  selectedItem,
  onSelectLandmark,
  onSelectPavilion,
  onSelectSpeaker,
  onSelectHotel,
  activeDayId,
  onSelectDay,
  liteMode,
}) => {
  const capabilities = useMediaCapabilities();
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    setWebglSupported(isWebGLAvailable());
  }, []);

  if (!webglSupported || liteMode) {
    return <HeritageFallbackBackdrop />;
  }

  const selectedLandmarkId =
    selectedItem?.kind === 'landmark' ? selectedItem.data.id : null;
  const selectedPavilionId =
    selectedItem?.kind === 'pavilion' ? selectedItem.data.id : null;
  const selectedSpeakerId =
    selectedItem?.kind === 'speaker' ? selectedItem.data.id : null;
  const selectedHotelId =
    selectedItem?.kind === 'hotel' ? selectedItem.data.id : null;

  return (
    <WebGLErrorBoundary fallback={<HeritageFallbackBackdrop />}>
      <div className="fixed inset-0 z-0">
        <LoadingOverlay />
        <Canvas
          dpr={capabilities.dpr}
          shadows={capabilities.shadowsEnabled}
          camera={{ position: [0, 3.2, 36.5], fov: 46, near: 0.1, far: 260 }}
          gl={{ antialias: true, powerPreference: 'high-performance' }}
        >
          <Suspense fallback={null}>
            <WorldEnvironment
              particleCount={capabilities.particleCount}
              shadowsEnabled={capabilities.shadowsEnabled}
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <CameraRig
              scrollProgressRef={scrollProgressRef}
              selectedItem={selectedItem}
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <IntroScene
              scrollProgressRef={scrollProgressRef}
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <SoloWorld
              selectedLandmarkId={selectedLandmarkId}
              onSelectLandmark={onSelectLandmark}
            />
            <ConferencePavilion
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <WorkshopZone
              selectedPavilionId={selectedPavilionId}
              onSelectPavilion={onSelectPavilion}
            />
            <SpeakersGallery
              selectedSpeakerId={selectedSpeakerId}
              onSelectSpeaker={onSelectSpeaker}
            />
            <AgendaJourney
              activeDayId={activeDayId}
              onSelectDay={onSelectDay}
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <CulturalExperience
              selectedLandmarkId={selectedLandmarkId}
              selectedHotelId={selectedHotelId}
              onSelectLandmark={onSelectLandmark}
              onSelectHotel={onSelectHotel}
            />
            <RegistrationPortal
              prefersReducedMotion={capabilities.prefersReducedMotion}
            />
            <SilhouetteLineStyler />
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
};
