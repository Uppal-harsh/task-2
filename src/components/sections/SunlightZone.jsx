import React, { useRef, useEffect, useState } from 'react';
import { Sun, Thermometer, Gauge, ChevronDown } from 'lucide-react';
import { ZONES } from '../../data/oceanData';
import LayerSpeedBadge from '../LayerSpeedBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function SunlightZone({
  getLayerStyle,
  showLayerBadges,
  onSelectSpecimen,
}) {
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState({ top: 0, height: 800 });
  const zone = ZONES[0];
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
  const midFarStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.4);
  const midNearStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.7);
  const floatFastStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 1.35);

  return (
    <section
      id="sunlight"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0284c7]/40 via-[#0369a1]/40 to-[#082f49]/50 flex items-center justify-center py-24 md:py-32"
    >
      {/* 1. BACKGROUND LAYER (Speed: 0.2x) - Solar caustics, sunburst beam gradient */}
      <div 
        className="parallax-layer absolute inset-0 pointer-events-none z-0"
        style={bgStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Background: Solar Rays" speed="0.2" color="blue" position="top-24 left-6" />
        )}
        {/* Sun Caustic Beams SVG */}
        <div className="absolute inset-0 opacity-40 mix-blend-screen overflow-hidden animate-caustic">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 1000 1000">
            <defs>
              <linearGradient id="sunBeamGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#bae6fd" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polygon points="500,0 200,1000 350,1000" fill="url(#sunBeamGrad)" />
            <polygon points="500,0 450,1000 600,1000" fill="url(#sunBeamGrad)" />
            <polygon points="500,0 700,1000 850,1000" fill="url(#sunBeamGrad)" />
            <polygon points="500,0 50,1000 150,1000" fill="url(#sunBeamGrad)" />
          </svg>
        </div>
        {/* Surface Water Caustic Ripple Rings */}
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-cyan-300/20 filter blur-3xl animate-pulse-glow" />
        <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full bg-sky-200/15 filter blur-2xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* 2. MIDGROUND FAR LAYER (Speed: 0.4x) - Coral Reef & Manta Ray Silhouette */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-10"
        style={midFarStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Far: Kelp & Manta" speed="0.4" color="cyan" position="top-40 right-12" />
        )}
        
        {/* Manta Ray Specimen Pin Button */}
        <button 
          onClick={() => onSelectSpecimen(zone.specimens[1])}
          className="absolute top-[22%] right-[15%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Manta Ray Specimen"
        >
          {/* Manta SVG Silhouette */}
          <div className="relative animate-float-slow">
            <svg className="w-48 h-32 md:w-64 md:h-44 text-sky-950/70 drop-shadow-2xl fill-current" viewBox="0 0 200 120">
              <path d="M100,20 C130,25 180,50 195,65 C170,70 140,75 115,70 C110,85 105,110 100,118 C95,110 90,85 85,70 C60,75 30,70 5,65 C20,50 70,25 100,20 Z" />
              <circle cx="100" cy="45" r="5" fill="#38bdf8" className="animate-ping" />
              <circle cx="100" cy="45" r="3" fill="#ffffff" />
            </svg>
            <div className="absolute top-2 right-0 px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Manta Ray
            </div>
          </div>
        </button>

        {/* Coral Reef Architecture in Background */}
        <div className="absolute bottom-0 left-0 right-0 h-48 opacity-30">
          <svg className="w-full h-full fill-sky-950" viewBox="0 0 1200 200" preserveAspectRatio="none">
            <path d="M0,200 L0,120 Q150,80 300,140 T600,100 T900,150 T1200,80 L1200,200 Z" />
          </svg>
        </div>
      </div>

      {/* 3. MIDGROUND NEAR LAYER (Speed: 0.7x) - Sea Turtle & Swirling School of Fish */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-20"
        style={midNearStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Near: Sea Turtle & Reef" speed="0.7" color="emerald" position="bottom-32 left-8" />
        )}

        {/* Sea Turtle Specimen Pin Button */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[0])}
          className="absolute bottom-[28%] left-[10%] md:left-[14%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Sea Turtle Specimen"
        >
          {/* Turtle Silhouette SVG */}
          <div className="relative animate-swim">
            <svg className="w-36 h-28 md:w-48 md:h-36 text-cyan-950/85 drop-shadow-[0_10px_25px_rgba(0,0,0,0.6)] fill-current" viewBox="0 0 160 120">
              {/* Shell */}
              <ellipse cx="80" cy="60" rx="38" ry="28" />
              {/* Head */}
              <circle cx="128" cy="60" r="12" />
              {/* Flippers */}
              <path d="M95,40 C110,20 135,10 145,20 C130,35 110,48 95,45 Z" />
              <path d="M95,80 C110,100 135,110 145,100 C130,85 110,72 95,75 Z" />
              <path d="M55,48 C45,35 35,30 30,36 C38,45 45,52 55,50 Z" />
              <path d="M55,72 C45,85 35,90 30,84 C38,75 45,68 55,70 Z" />
              {/* Interactive Target Pulse */}
              <circle cx="80" cy="60" r="7" fill="#06b6d4" className="animate-ping" />
              <circle cx="80" cy="60" r="4" fill="#ffffff" />
            </svg>
            <div className="absolute -top-3 left-4 px-2.5 py-1 rounded-full bg-cyan-950/90 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Sea Turtle
            </div>
          </div>
        </button>

        {/* Ambient Swimming Fish silhouettes */}
        <div className="absolute top-[35%] left-[45%] opacity-60 hidden md:block">
          <svg className="w-32 h-16 fill-cyan-300 animate-float-slow" viewBox="0 0 100 50">
            <path d="M10,25 Q30,15 45,25 Q30,35 10,25 M45,25 L55,18 L55,32 Z" opacity="0.8" />
            <path d="M30,10 Q50,0 65,10 Q50,20 30,10 M65,10 L75,5 L75,15 Z" opacity="0.5" />
            <path d="M25,40 Q45,30 60,40 Q45,50 25,40 M60,40 L70,35 L70,45 Z" opacity="0.6" />
          </svg>
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-400/10 border border-sky-300/30 text-sky-200 text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_20px_rgba(56,189,248,0.25)]">
          <Sun className="h-3.5 w-3.5 text-amber-300 animate-spin" style={{ animationDuration: '12s' }} />
          <span>Zone 01 • 0m — 200m</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]">
          The Sunlight Realm
          <span className="block text-xl md:text-3xl font-medium text-sky-200 mt-2">
            Epipelagic Ocean Surface
          </span>
        </h1>

        {/* Narrative Copy */}
        <p className="max-w-2xl text-slate-200 text-base md:text-lg leading-relaxed mb-10 font-normal drop-shadow-md">
          {zone.narrative}
        </p>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-sky-400/30">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-mono uppercase mb-1">
              <Thermometer className="h-4 w-4" />
              Temperature
            </div>
            <div className="text-xl font-bold text-white">{zone.temperature}</div>
            <div className="text-xs text-sky-200/70">Solar Thermal Layer</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-sky-400/30">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-mono uppercase mb-1">
              <Gauge className="h-4 w-4" />
              Pressure
            </div>
            <div className="text-xl font-bold text-white">{zone.pressure}</div>
            <div className="text-xs text-sky-200/70">Standard Atmospheric</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-sky-400/30">
            <div className="flex items-center gap-2 text-sky-300 text-xs font-mono uppercase mb-1">
              <Sun className="h-4 w-4" />
              Light Level
            </div>
            <div className="text-xl font-bold text-white">{zone.lightLevel}</div>
            <div className="text-xs text-sky-200/70">Full Solar Spectrum</div>
          </div>
        </div>

        {/* Scroll Instruction */}
        <div className="flex flex-col items-center gap-2 text-sky-300/80 animate-bounce">
          <span className="text-xs font-mono uppercase tracking-wider">Scroll to Descend</span>
          <ChevronDown className="h-5 w-5" />
        </div>
      </div>

      {/* 5. FOREGROUND FLOATING ACCENTS LAYER (Speed: 1.35x - Moves Faster than Scroll) */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-30"
        style={floatFastStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Foreground: Rising Air Bubbles" speed="1.35" color="blue" position="bottom-12 right-6" />
        )}
        
        {/* Rising shimmering bubbles */}
        <div className="absolute bottom-[10%] left-[20%] w-4 h-4 rounded-full bg-white/40 border border-white/60 shadow-[0_0_10px_rgba(255,255,255,0.8)] animate-pulse" />
        <div className="absolute bottom-[40%] right-[25%] w-6 h-6 rounded-full bg-white/30 border border-white/50 shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
        <div className="absolute bottom-[20%] left-[60%] w-3 h-3 rounded-full bg-white/50 border border-white/80" />
        <div className="absolute bottom-[70%] left-[30%] w-5 h-5 rounded-full bg-white/35 border border-white/60" />
      </div>
    </section>
  );
}
