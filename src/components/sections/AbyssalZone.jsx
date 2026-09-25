import React, { useRef, useEffect, useState } from 'react';
import { Globe, Thermometer, Gauge } from 'lucide-react';
import { ZONES } from '../../data/oceanData';
import LayerSpeedBadge from '../LayerSpeedBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function AbyssalZone({
  getLayerStyle,
  showLayerBadges,
  onSelectSpecimen,
}) {
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState({ top: 0, height: 800 });
  const zone = ZONES[3];
  const { ref: revealRef, isVisible } = useScrollReveal({ threshold: 0.05 });

  useEffect(() => {
    const updateOffset = () => {
      if (sectionRef.current) {
        setSectionOffset({
          top: sectionRef.current.offsetTop,
          height: sectionRef.current.offsetHeight,
        });
      }
    };
    updateOffset();
    window.addEventListener('resize', updateOffset);
    return () => window.removeEventListener('resize', updateOffset);
  }, []);

  const bgStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.18);
  const midFarStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.42);
  const midNearStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.72);
  const floatFastStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 1.3);

  return (
    <section
      id="abyssal"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#030712]/50 via-[#090514]/50 to-[#020205]/50 flex items-center justify-center py-24 md:py-32"
    >
      {/* 1. BACKGROUND LAYER (Speed: 0.18x) */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-0" style={bgStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Background: Canyon Walls" speed="0.18" color="purple" position="top-24 left-6" />
        )}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-950/20 filter blur-[140px]" />
        <div className="absolute inset-0 opacity-40">
          <svg className="w-full h-full fill-slate-950" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <path d="M0,0 L180,250 L120,500 L250,800 L0,800 Z" opacity="0.8" />
            <path d="M1200,0 L1020,300 L1100,550 L980,800 L1200,800 Z" opacity="0.8" />
          </svg>
        </div>
      </div>

      {/* 2. MIDGROUND FAR LAYER (Speed: 0.42x) - Dumbo Octopus */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-10" style={midFarStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Far: Dumbo Octopus" speed="0.42" color="purple" position="top-36 right-8" />
        )}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[0])}
          className="absolute top-[22%] right-[12%] md:right-[18%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Dumbo Octopus"
        >
          <div className="relative animate-float-slow">
            <svg className="w-36 h-36 md:w-48 md:h-48 drop-shadow-[0_0_20px_rgba(192,132,252,0.4)]" viewBox="0 0 160 160">
              <ellipse cx="80" cy="70" rx="35" ry="32" fill="#7e22ce" fillOpacity="0.4" stroke="#c084fc" strokeWidth="2" />
              <path d="M45,60 C25,45 15,55 35,70 Z" fill="#a855f7" fillOpacity="0.8" stroke="#e9d5ff" strokeWidth="1.5" className="animate-pulse" />
              <path d="M115,60 C135,45 145,55 125,70 Z" fill="#a855f7" fillOpacity="0.8" stroke="#e9d5ff" strokeWidth="1.5" className="animate-pulse" />
              <circle cx="68" cy="72" r="5" fill="#e9d5ff" />
              <circle cx="68" cy="72" r="2.5" fill="#3b0764" />
              <circle cx="92" cy="72" r="5" fill="#e9d5ff" />
              <circle cx="92" cy="72" r="2.5" fill="#3b0764" />
              <path d="M50,90 Q40,130 55,140 Q65,115 75,142 Q80,115 90,142 Q100,115 110,140 Q120,130 110,90 Z" fill="#9333ea" fillOpacity="0.6" stroke="#c084fc" strokeWidth="1.5" />
              <circle cx="80" cy="70" r="10" fill="#f0abfc" fillOpacity="0.5" className="animate-ping" />
            </svg>
            <div className="absolute -top-3 left-4 px-2.5 py-1 rounded-full bg-purple-950/90 border border-purple-400/50 text-[10px] font-mono text-purple-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Dumbo Octopus
            </div>
          </div>
        </button>
      </div>

      {/* 3. MIDGROUND NEAR LAYER (Speed: 0.72x) - Tripod Fish */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-20" style={midNearStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Near: Tripod Fish" speed="0.72" color="purple" position="bottom-36 left-10" />
        )}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[1])}
          className="absolute bottom-[16%] left-[8%] md:left-[16%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Tripod Fish"
        >
          <div className="relative">
            <svg className="w-48 h-48 md:w-60 md:h-60" viewBox="0 0 200 200">
              <path d="M50,70 Q100,55 140,70 Q100,85 50,70 Z" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
              <polygon points="140,70 170,55 160,70 170,85" fill="#312e81" stroke="#818cf8" strokeWidth="1.5" />
              <circle cx="55" cy="70" r="3" fill="#a5b4fc" />
              <path d="M70,80 L55,185" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M85,80 L75,190" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M150,75 L160,188" stroke="#c084fc" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="55" cy="185" r="3" fill="#e879f9" />
              <circle cx="75" cy="190" r="3" fill="#e879f9" />
              <circle cx="160" cy="188" r="3" fill="#e879f9" />
              <path d="M65,65 L50,20" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="50" cy="20" r="2.5" fill="#38bdf8" className="animate-pulse" />
            </svg>
            <div className="absolute top-2 left-6 px-2.5 py-1 rounded-full bg-slate-950/90 border border-purple-400/50 text-[10px] font-mono text-purple-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Tripod Fish
            </div>
          </div>
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-24 opacity-30">
          <svg className="w-full h-full fill-purple-950" viewBox="0 0 1200 100" preserveAspectRatio="none">
            <path d="M0,100 L0,40 Q300,10 600,30 T1200,20 L1200,100 Z" />
          </svg>
        </div>
      </div>

      {/* 4. FOREGROUND CONTENT LAYER (Speed: 1.0x) */}
      <div
        ref={revealRef}
        className="relative z-30 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-300 text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.2)]">
          <Globe className="h-3.5 w-3.5 text-purple-400" />
          <span>Zone 04 • 4,000m — 6,000m</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.7)]">
          The Abyssal Plains
          <span className="block text-xl md:text-3xl font-medium text-purple-300 mt-2">
            Abyssopelagic Oceanic Basin
          </span>
        </h2>

        <p className="max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-normal">
          {zone.narrative}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase mb-1">
              <Globe className="h-4 w-4" />
              Earth Coverage
            </div>
            <div className="text-xl font-bold text-white">60% of Planet</div>
            <div className="text-xs text-purple-200/70">Largest Earth Biome</div>
          </div>
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase mb-1">
              <Gauge className="h-4 w-4" />
              Hydrostatic Strain
            </div>
            <div className="text-xl font-bold text-white">{zone.pressure}</div>
            <div className="text-xs text-purple-200/70">Barophilic Domain</div>
          </div>
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-purple-500/30">
            <div className="flex items-center gap-2 text-purple-300 text-xs font-mono uppercase mb-1">
              <Thermometer className="h-4 w-4" />
              Benthic Temp
            </div>
            <div className="text-xl font-bold text-white">{zone.temperature}</div>
            <div className="text-xs text-purple-200/70">Dense Polar Inflow</div>
          </div>
        </div>
      </div>

      {/* 5. FOREGROUND FLOATING SEDIMENT (Speed: 1.3x) */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-30" style={floatFastStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Foreground: Phosphorescent Dust" speed="1.3" color="purple" position="bottom-12 right-10" />
        )}
        <div className="absolute top-[20%] left-[16%] w-2 h-2 rounded-full bg-purple-300/50" />
        <div className="absolute top-[50%] right-[24%] w-2.5 h-2.5 rounded-full bg-fuchsia-300/60 shadow-[0_0_8px_rgba(232,121,249,0.8)]" />
        <div className="absolute top-[75%] left-[38%] w-1.5 h-1.5 rounded-full bg-indigo-200/60" />
        <div className="absolute top-[35%] right-[42%] w-2 h-2 rounded-full bg-purple-200/40" />
      </div>
    </section>
  );
}
