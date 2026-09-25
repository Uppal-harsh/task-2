import React, { useRef, useEffect, useState } from 'react';
import { Compass, Flame, Shield, ArrowUpCircle, Gauge } from 'lucide-react';
import { ZONES } from '../../data/oceanData';
import LayerSpeedBadge from '../LayerSpeedBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function HadalZone({
  getLayerStyle,
  showLayerBadges,
  onSelectSpecimen,
}) {
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState({ top: 0, height: 800 });
  const zone = ZONES[4];
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

  const bgStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.12);
  const midFarStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.38);
  const midNearStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.65);
  const floatFastStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 1.4);

  const scrollToSurface = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      id="hadal"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#020205]/50 via-[#05030a]/50 to-[#000000]/60 flex items-center justify-center py-24 md:py-36"
    >
      {/* 1. BACKGROUND (Speed: 0.12x) - Trench Mantle Cleft */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-0" style={bgStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Background: Trench Mantle Cleft" speed="0.12" color="amber" position="top-24 left-6" />
        )}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-600/20 filter blur-[120px] rounded-full animate-pulse-glow" />
        <div className="absolute inset-0 opacity-60">
          <svg className="w-full h-full fill-black" viewBox="0 0 1200 800" preserveAspectRatio="none">
            <polygon points="0,0 450,800 0,800" fill="#030206" />
            <polygon points="1200,0 750,800 1200,800" fill="#030206" />
            <line x1="450" y1="800" x2="750" y2="800" stroke="#f59e0b" strokeWidth="4" strokeDasharray="10 5" opacity="0.6" />
          </svg>
        </div>
      </div>

      {/* 2. MIDGROUND FAR (Speed: 0.38x) - Hadal Amphipods */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-10" style={midFarStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Far: Hadal Amphipods" speed="0.38" color="cyan" position="top-36 right-8" />
        )}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[1])}
          className="absolute top-[26%] left-[10%] md:left-[18%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Hadal Amphipod"
        >
          <div className="relative animate-float-slow">
            <svg className="w-32 h-24 md:w-44 md:h-32 text-amber-500/80 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" viewBox="0 0 140 100">
              <path d="M100,30 C70,10 30,30 20,60 C40,80 70,85 105,75 C95,65 85,45 100,30 Z" fill="#1c1917" stroke="#fbbf24" strokeWidth="1.5" />
              <path d="M40,35 L35,70" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
              <path d="M60,25 L55,78" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
              <path d="M80,25 L75,76" stroke="#fbbf24" strokeWidth="1" opacity="0.7" />
              <path d="M100,30 Q130,15 135,10" stroke="#fef08a" strokeWidth="1.5" fill="none" />
              <path d="M102,32 Q130,28 138,25" stroke="#fef08a" strokeWidth="1.5" fill="none" />
              <path d="M30,70 L25,88" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M45,75 L42,92" stroke="#f59e0b" strokeWidth="1.5" />
              <path d="M60,78 L58,95" stroke="#f59e0b" strokeWidth="1.5" />
              <circle cx="65" cy="50" r="4" fill="#fbbf24" className="animate-ping" />
            </svg>
            <div className="absolute -top-3 left-2 px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-400/50 text-[10px] font-mono text-amber-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Hadal Amphipod
            </div>
          </div>
        </button>
      </div>

      {/* 3. MIDGROUND NEAR (Speed: 0.65x) - Mariana Snailfish */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-20" style={midNearStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Midground Near: Mariana Snailfish" speed="0.65" color="blue" position="bottom-36 left-8" />
        )}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[0])}
          className="absolute bottom-[20%] right-[10%] md:right-[18%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Mariana Snailfish"
        >
          <div className="relative animate-swim">
            <svg className="w-44 h-28 md:w-60 md:h-36 drop-shadow-[0_0_25px_rgba(56,189,248,0.4)]" viewBox="0 0 200 100">
              <path d="M30,50 C30,25 70,20 120,40 C160,50 190,48 195,50 C190,52 160,55 120,65 C70,80 30,75 30,50 Z" fill="#0f172a" fillOpacity="0.8" stroke="#38bdf8" strokeWidth="1.5" />
              <ellipse cx="65" cy="50" rx="18" ry="12" fill="#38bdf8" fillOpacity="0.25" stroke="#7dd3fc" strokeWidth="1" />
              <path d="M55,55 C70,68 85,75 90,65 C85,55 70,50 55,55 Z" fill="#38bdf8" fillOpacity="0.4" stroke="#bae6fd" strokeWidth="1" />
              <circle cx="45" cy="45" r="4" fill="#020617" stroke="#e0f2fe" strokeWidth="1" />
              <circle cx="65" cy="50" r="5" fill="#38bdf8" className="animate-pulse" />
            </svg>
            <div className="absolute -top-3 right-4 px-2.5 py-1 rounded-full bg-slate-950/90 border border-sky-400/50 text-[10px] font-mono text-sky-200 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Mariana Snailfish (8,200m)
            </div>
          </div>
        </button>
        {/* Lander Probe */}
        <div className="absolute bottom-[10%] left-[8%] md:left-[12%] opacity-80">
          <svg className="w-28 h-28" viewBox="0 0 100 100">
            <polygon points="50,20 20,80 80,80" fill="none" stroke="#64748b" strokeWidth="2" />
            <rect x="42" y="35" width="16" height="25" rx="3" fill="#0f172a" stroke="#f59e0b" strokeWidth="1.5" />
            <circle cx="50" cy="20" r="5" fill="#ef4444" className="animate-ping" />
            <circle cx="50" cy="20" r="3" fill="#f87171" />
          </svg>
          <div className="text-[9px] font-mono text-slate-400 text-center -mt-2">HADAL-LANDER IV</div>
        </div>
      </div>

      {/* 4. FOREGROUND CONTENT (Speed: 1.0x) */}
      <div
        ref={revealRef}
        className="relative z-30 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(245,158,11,0.25)]">
          <Flame className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
          <span>Zone 05 • 6,000m — 10,994m • Challenger Deep</span>
        </div>

        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.9)]">
          Challenger Deep
          <span className="block text-xl md:text-3xl font-medium text-amber-300 mt-2">
            The Outer Limits of Planet Earth
          </span>
        </h2>

        <p className="max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-normal">
          {zone.narrative}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase mb-1">
              <Compass className="h-4 w-4" />
              Max Ocean Depth
            </div>
            <div className="text-xl font-bold text-white">10,994 meters</div>
            <div className="text-xs text-amber-200/70">36,070 ft Sub-surface</div>
          </div>
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase mb-1">
              <Gauge className="h-4 w-4" />
              Maximum Pressure
            </div>
            <div className="text-xl font-bold text-white">1,086 atm</div>
            <div className="text-xs text-amber-200/70">15,960 PSI Hydrostatic</div>
          </div>
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-amber-500/30">
            <div className="flex items-center gap-2 text-amber-300 text-xs font-mono uppercase mb-1">
              <Shield className="h-4 w-4" />
              Cell Protection
            </div>
            <div className="text-xl font-bold text-white">TMAO Stabilizers</div>
            <div className="text-xs text-amber-200/70">Piezophile Enzymes</div>
          </div>
        </div>

        <button
          onClick={scrollToSurface}
          className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-sky-500 via-cyan-400 to-amber-400 text-slate-950 font-bold text-base shadow-[0_0_35px_rgba(56,189,248,0.4)] hover:shadow-[0_0_50px_rgba(251,191,36,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <ArrowUpCircle className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
          <span>FIRE ASCENT THRUSTERS (RETURN TO SURFACE)</span>
        </button>
      </div>

      {/* 5. FOREGROUND SUPERCRITICAL BUBBLES (Speed: 1.4x) */}
      <div className="parallax-layer absolute inset-0 pointer-events-none z-30" style={floatFastStyle}>
        {showLayerBadges && (
          <LayerSpeedBadge label="Foreground: Geothermal Fluid" speed="1.4" color="amber" position="bottom-12 right-10" />
        )}
        <div className="absolute bottom-[10%] left-[30%] w-3.5 h-3.5 rounded-full bg-amber-300/60 shadow-[0_0_15px_rgba(251,191,36,0.9)] animate-pulse" />
        <div className="absolute bottom-[40%] right-[32%] w-2.5 h-2.5 rounded-full bg-orange-400/50 shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
        <div className="absolute bottom-[70%] left-[55%] w-4 h-4 rounded-full bg-amber-200/40" />
        <div className="absolute bottom-[25%] right-[15%] w-2 h-2 rounded-full bg-yellow-300/70" />
      </div>
    </section>
  );
}
