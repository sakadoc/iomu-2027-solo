import React, { useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CHAPTERS, HotelConfig, LandmarkConfig, SoloDestinationConfig } from './config/eventConfig';
import { SpeakerProfile, WorkshopPavilionConfig } from './data/programData';
import { ExperienceCanvas } from './components/three/ExperienceCanvas';
import { SelectedFocusItem } from './components/three/types';
import { Navbar } from './components/navigation/Navbar';
import { JourneyHUD } from './components/navigation/JourneyHUD';
import { ChapterOverlays } from './components/ui/ChapterOverlays';
import { DetailDrawer } from './components/ui/DetailDrawer';
import { Footer } from './components/layout/Footer';
import { Language } from './i18n/translations';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollProgressRef = useRef<number>(0);

  const [lang, setLang] = useState<Language>('id');
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeChapterIndex, setActiveChapterIndex] = useState(1);
  const [selectedItem, setSelectedItem] = useState<SelectedFocusItem>(null);
  const [activeDayId, setActiveDayId] = useState('day-1');
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [liteMode, setLiteMode] = useState(false);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          setProgressPercent(self.progress);

          const matched =
            CHAPTERS.find(
              (c) => self.progress >= c.progressStart && self.progress < c.progressEnd
            ) || CHAPTERS[CHAPTERS.length - 1];

          setActiveChapterIndex(matched.index);
        },
      });
    }, scrollContainerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const handleNavigateChapter = useCallback((chapterId: string) => {
    setSelectedItem(null);
    const el = document.getElementById(chapterId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const handleSelectLandmark = useCallback((landmark: LandmarkConfig) => {
    setSelectedItem({ kind: 'landmark', data: landmark });
  }, []);

  const handleSelectPavilion = useCallback((pavilion: WorkshopPavilionConfig) => {
    setSelectedItem({ kind: 'pavilion', data: pavilion });
  }, []);

  const handleSelectSpeaker = useCallback((speaker: SpeakerProfile) => {
    setSelectedItem({ kind: 'speaker', data: speaker });
  }, []);

  const handleSelectHotel = useCallback((hotel: HotelConfig) => {
    setSelectedItem({ kind: 'hotel', data: hotel });
  }, []);

  const handleSelectDestination = useCallback((destination: SoloDestinationConfig) => {
    setSelectedItem({ kind: 'destination', data: destination });
  }, []);

  const handleSelectDay = useCallback((dayId: string) => {
    setSelectedItem(null);
    setActiveDayId(dayId);
  }, []);

  const activeChapter =
    CHAPTERS.find((c) => c.index === activeChapterIndex) || CHAPTERS[0];

  return (
    <div className="relative min-h-screen bg-keraton text-ivory">
      <ExperienceCanvas
        scrollProgressRef={scrollProgressRef}
        selectedItem={selectedItem}
        onSelectLandmark={handleSelectLandmark}
        onSelectPavilion={handleSelectPavilion}
        onSelectSpeaker={handleSelectSpeaker}
        onSelectHotel={handleSelectHotel}
        activeDayId={activeDayId}
        onSelectDay={handleSelectDay}
        liteMode={liteMode}
      />

      <Navbar
        activeChapterIndex={activeChapterIndex}
        onNavigateChapter={handleNavigateChapter}
        onToggleMap={() => setIsMapOpen((prev) => !prev)}
        isMapOpen={isMapOpen}
        liteMode={liteMode}
        onToggleLiteMode={() => setLiteMode((prev) => !prev)}
        lang={lang}
        onChangeLang={setLang}
      />

      <main ref={scrollContainerRef} className="relative">
        <ChapterOverlays
          lang={lang}
          onNavigateChapter={handleNavigateChapter}
          onSelectLandmark={handleSelectLandmark}
          onSelectPavilion={handleSelectPavilion}
          onSelectSpeaker={handleSelectSpeaker}
          onSelectHotel={handleSelectHotel}
          onSelectDestination={handleSelectDestination}
          activeDayId={activeDayId}
          onSelectDay={handleSelectDay}
          isInspecting3D={selectedItem !== null}
        />
      </main>

      <Footer />

      <DetailDrawer selectedItem={selectedItem} onClose={() => setSelectedItem(null)} />

      <JourneyHUD
        activeChapter={activeChapter}
        progressPercent={progressPercent}
        onNavigateChapter={handleNavigateChapter}
        isMapOpen={isMapOpen}
        onCloseMap={() => setIsMapOpen(false)}
      />
    </div>
  );
};

export default App;
