import React, { useRef, useEffect, useState } from 'react';
import { Eye, Thermometer, Gauge, Sparkles } from 'lucide-react';
import { ZONES } from '../../data/oceanData';
import LayerSpeedBadge from '../LayerSpeedBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function TwilightZone({
  getLayerStyle,
  showLayerBadges,
  onSelectSpecimen,
}) {
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState({ top: 0, height: 800 });
  const zone = ZONES[1];
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

  const bgStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.2);
  const midFarStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.45);
  const midNearStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.7);
  const floatFastStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 1.25);

  return (
    <section
      id="twilight"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#082f49]/45 via-[#1e1b4b]/45 to-[#0f172a]/50 flex items-center justify-center py-24 md:py-32"
    >
      {/* 1. BACKGROUND LAYER (Speed: 0.2x) - Colossal Sperm Whale & Fading Solar Violet Gradient */}
      <div 
        className="parallax-layer absolute inset-0 pointer-events-none z-0"
        style={bgStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Background: Sperm Whale & Dusk" speed="0.2" color="purple" position="top-24 left-6" />
        )}

        {/* Ambient bioluminescent violet glow */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/20 filter blur-[120px]" />
        
        {/* Sperm Whale Silhouette (Clickable Specimen Button) */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[1])}
          className="absolute top-[18%] left-[8%] md:left-[15%] pointer-events-auto cursor-pointer group transition-transform duration-700 hover:scale-105 focus:outline-none"
          aria-label="Scan Sperm Whale Specimen"
        >
          <div className="relative animate-float-slow">
            {/* Whale SVG */}
            <svg className="w-64 h-32 md:w-96 md:h-48 text-indigo-950/80 drop-shadow-2xl fill-current" viewBox="0 0 320 140">
              {/* Massive head & body */}
              <path d="M20,60 C20,30 80,20 180,25 C240,28 290,40 310,65 C300,75 285,85 240,90 C180,95 80,95 35,85 C20,80 20,60 20,60 Z" />
              {/* Lower Jaw */}
              <path d="M40,78 L120,78 L115,86 L40,82 Z" />
              {/* Tail Fluke */}
              <path d="M295,65 C305,50 315,35 320,40 C310,60 310,70 320,90 C315,95 305,80 295,65 Z" />
              {/* Small Dorsal fin */}
              <path d="M220,27 L235,18 L242,28 Z" />
              {/* Target Indicator */}
              <circle cx="90" cy="55" r="6" fill="#818cf8" className="animate-ping" />
              <circle cx="90" cy="55" r="3.5" fill="#ffffff" />
            </svg>
            <div className="absolute top-4 left-10 px-2.5 py-1 rounded-full bg-indigo-950/90 border border-indigo-500/40 text-[10px] font-mono text-indigo-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Sperm Whale
            </div>
          </div>
        </button>
      </div>

      {/* 2. MIDGROUND FAR LAYER (Speed: 0.45x) - Pulsing Atolla Crown Jellyfish */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-10"
        style={midFarStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground: Crown Jellyfish Cluster" speed="0.45" color="purple" position="top-36 right-8" />
        )}

        {/* Atolla Jelly Specimen Pin Button */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[0])}
          className="absolute top-[32%] right-[10%] md:right-[18%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Atolla Crown Jelly Specimen"
        >
          <div className="relative animate-pulse-glow">
            {/* Jelly SVG */}
            <svg className="w-32 h-44 md:w-44 md:h-56" viewBox="0 0 120 160">
              {/* Bell with bioluminescent neon ring */}
              <ellipse cx="60" cy="40" rx="35" ry="25" fill="#581c87" fillOpacity="0.7" stroke="#c084fc" strokeWidth="2" />
              <ellipse cx="60" cy="40" rx="20" ry="14" fill="#a855f7" fillOpacity="0.9" className="animate-pulse" />
              {/* Bioluminescent Burglar Alarm flashing ring */}
              <circle cx="60" cy="40" r="9" fill="#38bdf8" className="animate-ping" />
              <circle cx="60" cy="40" r="4.5" fill="#ffffff" />
              {/* Trailing Tentacles */}
              <path d="M40,55 Q35,85 42,120 T38,155" stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.8" />
              <path d="M50,60 Q55,90 48,125 T52,160" stroke="#e879f9" strokeWidth="2.5" fill="none" opacity="0.9" />
              <path d="M60,62 Q62,95 60,130 T58,158" stroke="#38bdf8" strokeWidth="2" fill="none" opacity="0.95" />
              <path d="M70,60 Q65,90 72,125 T68,160" stroke="#e879f9" strokeWidth="2.5" fill="none" opacity="0.9" />
              <path d="M80,55 Q85,85 78,120 T82,155" stroke="#c084fc" strokeWidth="2" fill="none" opacity="0.8" />
            </svg>
            <div className="absolute -top-3 right-0 px-2.5 py-1 rounded-full bg-purple-950/90 border border-purple-400/50 text-[10px] font-mono text-purple-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Atolla Jelly
            </div>
          </div>
        </button>

        {/* Small floating companion jellies */}
        <div className="absolute bottom-[20%] left-[25%] opacity-50 hidden sm:block">
          <svg className="w-16 h-24 animate-float-slow" viewBox="0 0 80 120">
            <ellipse cx="40" cy="25" rx="20" ry="15" fill="#7e22ce" stroke="#d8b4fe" strokeWidth="1.5" />
            <path d="M30,35 Q25,60 32,85" stroke="#d8b4fe" strokeWidth="1.5" fill="none" />
            <path d="M40,38 Q42,65 38,90" stroke="#38bdf8" strokeWidth="1.5" fill="none" />
            <path d="M50,35 Q55,60 48,85" stroke="#d8b4fe" strokeWidth="1.5" fill="none" />
          </svg>
        </div>
      </div>

      {/* 3. MIDGROUND NEAR LAYER (Speed: 0.7x) - Bioluminescent Lanternfish School */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-20"
        style={midNearStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Near: Deep Scattering Layer" speed="0.7" color="cyan" position="bottom-36 left-10" />
        )}

        {/* School of Lanternfish with glowing photophores */}
        <div className="absolute bottom-[25%] left-[8%] md:left-[18%]">
          <div className="relative animate-swim">
            <svg className="w-48 h-24 text-indigo-900 fill-current" viewBox="0 0 160 80">
              {/* Fish 1 */}
              <path d="M20,30 Q45,20 60,30 Q45,40 20,30 M60,30 L70,22 L70,38 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <circle cx="35" cy="31" r="2.5" fill="#34d399" className="animate-pulse" />
              <circle cx="45" cy="32" r="2.5" fill="#34d399" className="animate-pulse" />
              <circle cx="55" cy="30" r="2.5" fill="#34d399" className="animate-pulse" />
              
              {/* Fish 2 */}
              <path d="M65,50 Q85,42 98,50 Q85,58 65,50 M98,50 L106,44 L106,56 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <circle cx="78" cy="51" r="2" fill="#34d399" className="animate-pulse" />
              <circle cx="88" cy="52" r="2" fill="#34d399" className="animate-pulse" />

              {/* Fish 3 */}
              <path d="M90,20 Q110,12 125,20 Q110,28 90,20 M125,20 L133,15 L133,25 Z" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1" />
              <circle cx="102" cy="21" r="2" fill="#38bdf8" className="animate-pulse" />
              <circle cx="112" cy="22" r="2" fill="#38bdf8" className="animate-pulse" />
            </svg>
          </div>
        </div>
      </div>

      {/* 4. FOREGROUND CONTENT LAYER (Speed: 1.0x - Normal Scroll) */}
      <div 
        ref={revealRef}
        className="relative z-30 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        {/* Zone Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-400/30 text-indigo-300 text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Eye className="h-3.5 w-3.5 text-purple-400" />
          <span>Zone 02 • 200m — 1,000m</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          The Twilight Corridor
          <span className="block text-xl md:text-3xl font-medium text-indigo-300 mt-2">
            Mesopelagic Bioluminescent Frontier
          </span>
        </h2>

        {/* Narrative Copy */}
        <p className="max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-normal">
          {zone.narrative}
        </p>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono uppercase mb-1">
              <Thermometer className="h-4 w-4" />
              Thermocline Drop
            </div>
            <div className="text-xl font-bold text-white">{zone.temperature}</div>
            <div className="text-xs text-indigo-200/70">Steep Thermal Gradient</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono uppercase mb-1">
              <Gauge className="h-4 w-4" />
              Pressure Range
            </div>
            <div className="text-xl font-bold text-white">{zone.pressure}</div>
            <div className="text-xs text-indigo-200/70">Up to 1,470 PSI</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-indigo-500/30">
            <div className="flex items-center gap-2 text-indigo-300 text-xs font-mono uppercase mb-1">
              <Sparkles className="h-4 w-4" />
              Bioluminescence
            </div>
            <div className="text-xl font-bold text-white">&gt; 75% of Fauna</div>
            <div className="text-xs text-indigo-200/70">Photophore Emission</div>
          </div>
        </div>
      </div>

      {/* 5. FOREGROUND FLOATING PARTICLES (Speed: 1.25x) - Marine Snow */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-30"
        style={floatFastStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Foreground: Marine Snow" speed="1.25" color="purple" position="bottom-12 right-10" />
        )}

        {/* Drifting Marine Snow flakes */}
        <div className="absolute top-[15%] left-[12%] w-2 h-2 rounded-full bg-purple-200/40 filter blur-[0.5px]" />
        <div className="absolute top-[45%] right-[22%] w-1.5 h-1.5 rounded-full bg-cyan-200/50" />
        <div className="absolute top-[65%] left-[45%] w-2.5 h-2.5 rounded-full bg-white/40 filter blur-[1px]" />
        <div className="absolute top-[80%] right-[35%] w-1.5 h-1.5 rounded-full bg-purple-300/60" />
        <div className="absolute top-[30%] left-[80%] w-2 h-2 rounded-full bg-indigo-200/40" />
      </div>
    </section>
  );
}
