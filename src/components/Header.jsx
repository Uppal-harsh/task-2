import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, Eye, Sparkles, Layers, Anchor, Radio, Box } from 'lucide-react';
import { ZONES } from '../data/oceanData';

export default function Header({
  currentDepth,
  parallaxIntensity,
  setParallaxIntensity,
  showLayerBadges,
  setShowLayerBadges,
  isPlayingAudio,
  toggleAudio,
  playSonarPing,
  activeZoneId,
  is3DSubVisible,
  setIs3DSubVisible,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const activeZone = ZONES.find((z) => z.id === activeZoneId) || ZONES[0];

  const scrollToZone = (zoneId) => {
    const el = document.getElementById(zoneId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3 md:px-6 transition-all duration-300">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-950/75 p-2.5 md:p-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
        
        {/* Brand & Depth Telemetry */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Anchor className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-white text-sm md:text-base flex items-center gap-1.5">
                ABYSSAL ODYSSEY
              </span>
              <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-400/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                Three.js + Parallax
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="text-cyan-400 font-bold">{currentDepth.toLocaleString()}m</span>
              <span className="opacity-40">•</span>
              <span className="text-slate-300 truncate max-w-[120px] sm:max-w-none">{activeZone.alias}</span>
            </div>
          </div>
        </div>

        {/* Desktop Controls */}
        <div className="hidden lg:flex items-center gap-2">
          {/* Depth Multiplier / Parallax Intensity Selector */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
            <span className="px-2 text-slate-400 font-mono text-[11px] flex items-center gap-1">
              <Layers className="h-3.5 w-3.5 text-cyan-400" />
              Depth:
            </span>
            {[
              { label: 'Subtle', val: 0.6 },
              { label: 'Balanced', val: 1.0 },
              { label: 'Hyper 3D', val: 1.6 },
            ].map((mode) => (
              <button
                key={mode.label}
                onClick={() => setParallaxIntensity(mode.val)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  parallaxIntensity === mode.val
                    ? 'bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 shadow-[0_0_12px_rgba(6,182,212,0.3)]'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>

          {/* 3D Submersible Probe Toggle */}
          <button
            onClick={() => setIs3DSubVisible(!is3DSubVisible)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              is3DSubVisible
                ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Toggle 3D Submersible Dive Probe"
          >
            <Box className="h-3.5 w-3.5 text-cyan-400" />
            <span>3D Submersible: {is3DSubVisible ? 'ON' : 'OFF'}</span>
          </button>

          {/* Layer Speed Inspector Toggle */}
          <button
            onClick={() => setShowLayerBadges(!showLayerBadges)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              showLayerBadges
                ? 'bg-amber-500/20 border-amber-400/50 text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Inspect speed multipliers on individual layers"
          >
            <Eye className="h-3.5 w-3.5" />
            Layer Inspector
          </button>

          {/* Soundscape Synthesizer */}
          <button
            onClick={toggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.25)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Toggle synthesized deep sea ocean drone & sonar"
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
                <span>Audio On</span>
              </>
            ) : (
              <>
                <VolumeX className="h-3.5 w-3.5" />
                <span>Audio Off</span>
              </>
            )}
          </button>
        </div>

        {/* Quick Jump Buttons / Menu */}
        <div className="flex items-center gap-2">
          {/* Sonar Ping Trigger */}
          <button
            onClick={playSonarPing}
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 hover:text-cyan-300 hover:border-cyan-500/40 text-xs font-mono transition-all cursor-pointer active:scale-95"
            title="Fire active sonar pulse"
          >
            <Radio className="h-3.5 w-3.5 text-cyan-400" />
            <span>Sonar Ping</span>
          </button>

          {/* Dive Navigation Dropdown */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500/20 to-blue-600/20 border border-cyan-400/30 text-cyan-300 hover:bg-cyan-500/30 text-xs font-mono font-semibold transition-all cursor-pointer shadow-[0_0_15px_rgba(6,182,212,0.15)] active:scale-95"
            >
              <Compass className="h-4 w-4" />
              <span>Jump Zone</span>
            </button>

            {menuOpen && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl border border-slate-800 bg-slate-950/95 p-2 shadow-2xl backdrop-blur-2xl z-50 animate-fadeIn">
                <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-500">
                  Select Oceanic Depth
                </div>
                {ZONES.map((zone) => (
                  <button
                    key={zone.id}
                    onClick={() => scrollToZone(zone.id)}
                    className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-xs font-medium transition-colors cursor-pointer ${
                      activeZoneId === zone.id
                        ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                        : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <div>
                      <div className="text-xs">{zone.alias}</div>
                      <div className="text-[10px] font-mono text-slate-500">{zone.depthRange}</div>
                    </div>
                    {activeZoneId === zone.id && (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                    )}
                  </button>
                ))}

                {/* Mobile Extra Controls in Dropdown */}
                <div className="lg:hidden mt-2 pt-2 border-t border-slate-800/80 space-y-1">
                  <button
                    onClick={() => {
                      setIs3DSubVisible(!is3DSubVisible);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-900"
                  >
                    <Box className="h-3.5 w-3.5 text-cyan-400" />
                    3D Submersible: {is3DSubVisible ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => {
                      setShowLayerBadges(!showLayerBadges);
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-900"
                  >
                    <Eye className="h-3.5 w-3.5 text-amber-400" />
                    Layer Inspector: {showLayerBadges ? 'ON' : 'OFF'}
                  </button>
                  <button
                    onClick={() => {
                      toggleAudio();
                      setMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-900"
                  >
                    <Volume2 className="h-3.5 w-3.5 text-cyan-400" />
                    Audio Soundscape: {isPlayingAudio ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
