import React, { useRef, useEffect, useState } from 'react';
import { Flame, ShieldAlert, Thermometer, Layers } from 'lucide-react';
import { ZONES } from '../../data/oceanData';
import LayerSpeedBadge from '../LayerSpeedBadge';
import { useScrollReveal } from '../../hooks/useScrollReveal';

export default function MidnightZone({
  getLayerStyle,
  showLayerBadges,
  onSelectSpecimen,
}) {
  const sectionRef = useRef(null);
  const [sectionOffset, setSectionOffset] = useState({ top: 0, height: 900 });
  const zone = ZONES[2];
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

  // 6 Distinct Depth Layers for the Ultimate Diorama Effect!
  const l1VentStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.1);       // 0.1x Deepest Background
  const l2SquidStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.3);      // 0.3x Deep Midground
  const l3AnglerStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.55);    // 0.55x Midground 1
  const l4SubStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 0.8);        // 0.8x Midground 2
  const l6EmbersStyle = getLayerStyle(sectionOffset.top, sectionOffset.height, 1.45);    // 1.45x Fast Foreground

  return (
    <section
      id="midnight"
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0f172a]/50 via-[#020617]/50 to-[#030712]/50 flex items-center justify-center py-28 md:py-36"
    >
      {/* =========================================================================
          LAYER 1: DEEPEST BACKGROUND (Speed: 0.1x)
          Hydrothermal Chimneys & Geothermal Magma Glow
      ========================================================================= */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-0"
        style={l1VentStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Diorama L1 (0.1x): Hydrothermal Vents" speed="0.1" color="amber" position="top-24 left-6" />
        )}

        {/* Deep magma fissure glow */}
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[300px] bg-orange-600/15 filter blur-[100px] rounded-full animate-pulse-glow" />
        <div className="absolute bottom-10 right-1/3 w-[400px] h-[250px] bg-cyan-600/10 filter blur-[90px] rounded-full animate-pulse-glow" style={{ animationDelay: '2s' }} />

        {/* Distant Hydrothermal Chimney silhouettes */}
        <div className="absolute bottom-0 left-0 right-0 h-96 opacity-40">
          <svg className="w-full h-full fill-slate-950" viewBox="0 0 1200 400" preserveAspectRatio="none">
            {/* Left Chimney */}
            <path d="M120,400 L140,180 L170,175 L180,400 Z" />
            <path d="M220,400 L235,230 L260,225 L270,400 Z" />
            {/* Right Chimney Cluster */}
            <path d="M880,400 L905,140 L935,135 L950,400 Z" />
            <path d="M980,400 L1000,200 L1030,195 L1045,400 Z" />
          </svg>
        </div>

        {/* Smoker Mineral Plumes */}
        <div className="absolute bottom-[280px] left-[135px] w-12 h-32 bg-gradient-to-t from-orange-500/20 to-transparent filter blur-md animate-pulse" />
        <div className="absolute bottom-[310px] right-[275px] w-14 h-40 bg-gradient-to-t from-cyan-400/20 to-transparent filter blur-md animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* =========================================================================
          LAYER 2: DEEP MIDGROUND (Speed: 0.3x)
          Giant Squid (Architeuthis) Silhouette with Glowing Photophores
      ========================================================================= */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-10"
        style={l2SquidStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Diorama L2 (0.3x): Giant Squid" speed="0.3" color="purple" position="top-36 right-8" />
        )}

        {/* Giant Squid Specimen Pin Button */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[1])}
          className="absolute top-[16%] right-[6%] md:right-[12%] pointer-events-auto cursor-pointer group transition-transform duration-700 hover:scale-105 focus:outline-none"
          aria-label="Scan Giant Squid Specimen"
        >
          <div className="relative animate-float-slow">
            <svg className="w-56 h-36 md:w-80 md:h-52 text-slate-900 fill-current drop-shadow-2xl" viewBox="0 0 300 160">
              {/* Mantle & Torpedo Body */}
              <path d="M260,80 C240,40 180,45 130,60 C90,65 50,60 10,75 C50,90 90,85 130,95 C180,105 240,110 260,80 Z" fill="#090d16" />
              {/* Fins */}
              <polygon points="260,80 295,45 270,75" fill="#0f172a" />
              <polygon points="260,80 295,115 270,85" fill="#0f172a" />
              {/* Giant 30cm Eye with bioluminescent pupil */}
              <circle cx="120" cy="70" r="10" fill="#06b6d4" className="animate-ping" />
              <circle cx="120" cy="70" r="5" fill="#ffffff" />
              {/* Undulating Tentacles */}
              <path d="M25,70 Q-20,40 -60,65" stroke="#090d16" strokeWidth="5" fill="none" />
              <path d="M25,75 Q-30,70 -80,85" stroke="#090d16" strokeWidth="6" fill="none" />
              <path d="M25,80 Q-20,110 -65,100" stroke="#090d16" strokeWidth="5" fill="none" />
              {/* Bioluminescent suction cups */}
              <circle cx="5" cy="73" r="2.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="-25" cy="76" r="2.5" fill="#38bdf8" className="animate-pulse" />
              <circle cx="-55" cy="82" r="2.5" fill="#38bdf8" className="animate-pulse" />
            </svg>
            <div className="absolute top-2 right-4 px-2.5 py-1 rounded-full bg-slate-950/95 border border-cyan-500/50 text-[10px] font-mono text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Giant Squid (13m)
            </div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          LAYER 3: MIDGROUND 1 (Speed: 0.55x)
          Anglerfish with Glowing Lure & Basalt Pinnacle Outcrops
      ========================================================================= */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-20"
        style={l3AnglerStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Diorama L3 (0.55x): Anglerfish & Basalt" speed="0.55" color="amber" position="bottom-36 left-8" />
        )}

        {/* Basalt Ridge Left */}
        <div className="absolute bottom-0 left-0 w-72 h-80 opacity-60">
          <svg className="w-full h-full fill-slate-950" viewBox="0 0 200 250">
            <polygon points="0,250 0,60 50,110 90,80 140,160 180,140 200,250" />
          </svg>
        </div>

        {/* Anglerfish Specimen Pin Button */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[0])}
          className="absolute bottom-[24%] left-[6%] md:left-[14%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-110 focus:outline-none"
          aria-label="Scan Humpback Anglerfish Specimen"
        >
          <div className="relative animate-swim">
            {/* Ambient Radial Light Beam from Lure */}
            <div className="absolute -top-12 -left-8 w-44 h-44 rounded-full bg-cyan-400/20 filter blur-xl animate-pulse" />

            {/* Anglerfish SVG */}
            <svg className="w-44 h-36 md:w-56 md:h-44" viewBox="0 0 180 140">
              {/* Luminous Esca / Bulb */}
              <circle cx="35" cy="22" r="8" fill="#22d3ee" className="animate-ping" />
              <circle cx="35" cy="22" r="5" fill="#ffffff" />
              {/* Illicium stalk */}
              <path d="M85,55 C70,25 50,15 35,22" stroke="#22d3ee" strokeWidth="2.5" fill="none" />
              
              {/* Bulbous body */}
              <ellipse cx="105" cy="75" rx="55" ry="40" fill="#020617" stroke="#1e293b" strokeWidth="1.5" />
              {/* Monstrous distensible jaw */}
              <path d="M55,65 Q80,85 110,80 L75,108 Z" fill="#030712" />
              {/* Needle sharp translucent teeth */}
              <polygon points="60,65 65,77 70,67 75,80 80,68 85,82 90,70" fill="#e2e8f0" opacity="0.9" />
              <polygon points="62,102 68,88 74,101 80,87 86,100" fill="#e2e8f0" opacity="0.9" />
              {/* Small cloudy eye */}
              <circle cx="70" cy="55" r="3.5" fill="#334155" />
              {/* Fins */}
              <path d="M125,40 L145,28 L140,48 Z" fill="#0f172a" />
              <path d="M155,75 L175,60 L175,90 Z" fill="#0f172a" />
              <path d="M110,105 L125,120 L130,102 Z" fill="#0f172a" />
            </svg>
            <div className="absolute -top-4 left-6 px-2.5 py-1 rounded-full bg-slate-950/95 border border-cyan-400/50 text-[10px] font-mono text-cyan-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Anglerfish
            </div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          LAYER 4: MIDGROUND 2 (Speed: 0.8x)
          Deep Sea Submersible "Nautilus X-1" with Searchlight Perspective Cone
      ========================================================================= */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-20"
        style={l4SubStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Diorama L4 (0.8x): Nautilus Submersible" speed="0.8" color="cyan" position="top-48 left-12" />
        )}

        {/* Submersible Specimen Pin Button */}
        <button
          onClick={() => onSelectSpecimen(zone.specimens[2])}
          className="absolute top-[38%] left-[2%] md:left-[6%] pointer-events-auto cursor-pointer group transition-transform duration-500 hover:scale-105 focus:outline-none"
          aria-label="Scan Nautilus Submersible"
        >
          <div className="relative animate-float-slow">
            {/* Searchlight illumination beam slicing across */}
            <div className="absolute -top-10 left-36 w-80 h-36 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 300 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="subBeam" x1="0%" y1="50%" x2="100%" y2="50%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.7" />
                    <stop offset="60%" stopColor="#0284c7" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#0284c7" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points="0,50 300,0 300,120 0,70" fill="url(#subBeam)" />
              </svg>
            </div>

            {/* Submersible Vessel SVG */}
            <svg className="w-44 h-24 md:w-56 md:h-32 drop-shadow-[0_10px_25px_rgba(6,182,212,0.3)]" viewBox="0 0 180 100">
              {/* Titanium Hull */}
              <ellipse cx="85" cy="50" rx="60" ry="32" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
              {/* Viewport Window Dome */}
              <ellipse cx="130" cy="50" rx="14" ry="18" fill="#38bdf8" fillOpacity="0.6" stroke="#e0f2fe" strokeWidth="2" className="animate-pulse" />
              {/* Searchlight Pods */}
              <rect x="135" y="28" width="12" height="8" rx="2" fill="#fbbf24" className="animate-pulse" />
              <rect x="135" y="64" width="12" height="8" rx="2" fill="#fbbf24" className="animate-pulse" />
              {/* Thruster prop shroud */}
              <rect x="18" y="42" width="15" height="16" rx="3" fill="#1e293b" stroke="#64748b" strokeWidth="1" />
              {/* Robotic Manipulator Arm */}
              <path d="M120,70 L135,88 L150,85" stroke="#f59e0b" strokeWidth="3" fill="none" />
              {/* Target Indicator */}
              <circle cx="85" cy="50" r="5" fill="#38bdf8" className="animate-ping" />
            </svg>

            <div className="absolute top-1 left-8 px-2.5 py-1 rounded-full bg-slate-950/90 border border-amber-400/50 text-[10px] font-mono text-amber-300 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              ✦ Scan 3D Nautilus X-1
            </div>
          </div>
        </button>
      </div>

      {/* =========================================================================
          LAYER 5: FOREGROUND CONTENT (Speed: 1.0x - Normal Scroll)
          Diorama Showcase Title, Crushing Pressure Telemetry, Lore
      ========================================================================= */}
      <div 
        ref={revealRef}
        className="relative z-30 max-w-5xl mx-auto px-6 md:px-12 text-center flex flex-col items-center justify-center transition-all duration-1000"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
        }}
      >
        {/* Zone Badge & Diorama Feature Indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono font-semibold uppercase tracking-widest mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(6,182,212,0.3)]">
          <Layers className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
          <span>Zone 03 • 1,000m — 4,000m • 5-Layer Parallax Diorama</span>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6 drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          The Midnight Chasm
          <span className="block text-xl md:text-3xl font-medium text-cyan-400 mt-2">
            Bathypelagic Abyssal Threshold
          </span>
        </h2>

        {/* Narrative Copy */}
        <p className="max-w-2xl text-slate-300 text-base md:text-lg leading-relaxed mb-10 font-normal drop-shadow-md">
          {zone.narrative}
        </p>

        {/* Telemetry Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mb-12">
          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase mb-1">
              <ShieldAlert className="h-4 w-4 text-orange-400" />
              Hydrostatic Load
            </div>
            <div className="text-xl font-bold text-white">{zone.pressure}</div>
            <div className="text-xs text-orange-300/80">5,800 PSI (Crush Depth)</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase mb-1">
              <Thermometer className="h-4 w-4" />
              Ambient Temp
            </div>
            <div className="text-xl font-bold text-white">{zone.temperature}</div>
            <div className="text-xs text-cyan-200/70">Near Freezing Water</div>
          </div>

          <div className="glass-panel-glow rounded-2xl p-4 text-left border border-cyan-500/30">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono uppercase mb-1">
              <Flame className="h-4 w-4 text-amber-400" />
              Energy Engine
            </div>
            <div className="text-xl font-bold text-white">Chemosynthesis</div>
            <div className="text-xs text-amber-200/70">Hydrothermal Minerals</div>
          </div>
        </div>

        {/* Diorama Layer Explanation Note */}
        <div className="px-4 py-2.5 rounded-xl bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300/90 max-w-lg backdrop-blur-md shadow-xl">
          💡 <span className="font-semibold text-white">Multi-Plane Depth Diorama:</span> Notice how the background vents (0.1x), giant squid (0.3x), anglerfish (0.55x), submersible (0.8x), and foreground embers (1.45x) translate at five distinct velocities as you scroll!
        </div>
      </div>

      {/* =========================================================================
          LAYER 6: FAST FOREGROUND EMBERS & PLANKTON (Speed: 1.45x)
      ========================================================================= */}
      <div
        className="parallax-layer absolute inset-0 pointer-events-none z-30"
        style={l6EmbersStyle}
      >
        {showLayerBadges && (
          <LayerSpeedBadge label="Diorama L6 (1.45x): Volcanic Sparks" speed="1.45" color="amber" position="bottom-12 right-12" />
        )}

        {/* Floating hydrothermal mineral sparks & bioluminescent spores */}
        <div className="absolute bottom-[12%] left-[24%] w-3 h-3 rounded-full bg-orange-400/80 shadow-[0_0_12px_rgba(251,146,60,0.9)] animate-ping" />
        <div className="absolute bottom-[35%] right-[18%] w-2.5 h-2.5 rounded-full bg-cyan-300/90 shadow-[0_0_10px_rgba(103,232,249,0.9)]" />
        <div className="absolute top-[28%] left-[75%] w-2 h-2 rounded-full bg-amber-300/80 shadow-[0_0_8px_rgba(252,211,77,0.8)]" />
        <div className="absolute bottom-[65%] left-[12%] w-3 h-3 rounded-full bg-cyan-400/70 shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
        <div className="absolute top-[18%] right-[40%] w-1.5 h-1.5 rounded-full bg-orange-300/90" />
      </div>
    </section>
  );
}
