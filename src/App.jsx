import React, { useState, useMemo } from 'react';
import { useParallax } from './hooks/useParallax';
import { useAudioAmbience } from './hooks/useAudioAmbience';
import { ZONES } from './data/oceanData';

import Header from './components/Header';
import DepthTracker from './components/DepthTracker';
import ThreeCanvas from './components/ThreeCanvas';
import OrganismScannerModal from './components/OrganismScannerModal';

import SunlightZone from './components/sections/SunlightZone';
import TwilightZone from './components/sections/TwilightZone';
import MidnightZone from './components/sections/MidnightZone';
import AbyssalZone from './components/sections/AbyssalZone';
import HadalZone from './components/sections/HadalZone';
import ExplorationFooter from './components/ExplorationFooter';

export default function App() {
  const {
    scrollY,
    scrollProgress,
    currentDepthMeters,
    parallaxIntensity,
    setParallaxIntensity,
    showLayerBadges,
    setShowLayerBadges,
    getLayerStyle,
  } = useParallax();

  const {
    isPlaying: isPlayingAudio,
    toggleAmbience,
    playSonarPing,
  } = useAudioAmbience();

  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [is3DSubVisible, setIs3DSubVisible] = useState(true);

  // Compute active zone based on current depth
  const activeZoneId = useMemo(() => {
    if (currentDepthMeters < 200) return 'sunlight';
    if (currentDepthMeters < 1000) return 'twilight';
    if (currentDepthMeters < 4000) return 'midnight';
    if (currentDepthMeters < 6000) return 'abyssal';
    return 'hadal';
  }, [currentDepthMeters]);

  return (
    <div className="relative min-h-screen bg-black text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Three.js 3D Background Canvas — full viewport, behind everything */}
      <ThreeCanvas
        scrollProgress={scrollProgress}
        currentDepth={currentDepthMeters}
        is3DSubVisible={is3DSubVisible}
      />

      {/* Global Header Navigation with Depth Telemetry & Audio Synthesizer */}
      <Header
        currentDepth={currentDepthMeters}
        parallaxIntensity={parallaxIntensity}
        setParallaxIntensity={setParallaxIntensity}
        showLayerBadges={showLayerBadges}
        setShowLayerBadges={setShowLayerBadges}
        isPlayingAudio={isPlayingAudio}
        toggleAudio={toggleAmbience}
        playSonarPing={playSonarPing}
        activeZoneId={activeZoneId}
        is3DSubVisible={is3DSubVisible}
        setIs3DSubVisible={setIs3DSubVisible}
      />

      {/* Floating Vertical Depth Tracker HUD */}
      <DepthTracker
        scrollProgress={scrollProgress}
        currentDepth={currentDepthMeters}
        activeZoneId={activeZoneId}
      />

      {/* Main Oceanic Depth Sections (The 5 Parallax Realms) */}
      <main className="relative z-10">
        {/* Section 1: Epipelagic Zone (0m - 200m) */}
        <SunlightZone
          getLayerStyle={getLayerStyle}
          showLayerBadges={showLayerBadges}
          onSelectSpecimen={setSelectedSpecimen}
        />

        {/* Section 2: Mesopelagic Zone (200m - 1,000m) */}
        <TwilightZone
          getLayerStyle={getLayerStyle}
          showLayerBadges={showLayerBadges}
          onSelectSpecimen={setSelectedSpecimen}
        />

        {/* Section 3: Bathypelagic Zone (1,000m - 4,000m) - 5-Layer Diorama Showcase */}
        <MidnightZone
          getLayerStyle={getLayerStyle}
          showLayerBadges={showLayerBadges}
          onSelectSpecimen={setSelectedSpecimen}
        />

        {/* Section 4: Abyssopelagic Zone (4,000m - 6,000m) */}
        <AbyssalZone
          getLayerStyle={getLayerStyle}
          showLayerBadges={showLayerBadges}
          onSelectSpecimen={setSelectedSpecimen}
        />

        {/* Section 5: Hadopelagic Zone (6,000m - 10,994m Challenger Deep) */}
        <HadalZone
          getLayerStyle={getLayerStyle}
          showLayerBadges={showLayerBadges}
          onSelectSpecimen={setSelectedSpecimen}
        />
      </main>

      {/* Technical Overview & Expedition Footer */}
      <ExplorationFooter />

      {/* Deep Sea Specimen Telemetry Scanner Modal */}
      {selectedSpecimen && (
        <OrganismScannerModal
          specimen={selectedSpecimen}
          onClose={() => setSelectedSpecimen(null)}
        />
      )}
    </div>
  );
}
