import React from 'react';

/**
 * Visual badge shown on parallax layers when "Layer Inspector" is enabled.
 * Helps demonstrate exact speed multipliers and depth layer mechanics.
 */
export default function LayerSpeedBadge({ label, speed, color = 'cyan', position = 'top-4 left-4' }) {
  const colorMap = {
    cyan: 'border-cyan-400/50 bg-cyan-950/80 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.3)]',
    blue: 'border-sky-400/50 bg-sky-950/80 text-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.3)]',
    purple: 'border-purple-400/50 bg-purple-950/80 text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]',
    amber: 'border-amber-400/50 bg-amber-950/80 text-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]',
    emerald: 'border-emerald-400/50 bg-emerald-950/80 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.3)]',
  };

  const selectedColor = colorMap[color] || colorMap.cyan;

  return (
    <div className={`absolute ${position} z-40 pointer-events-none transition-all duration-300 animate-fadeIn`}>
      <div className={`px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider backdrop-blur-md border ${selectedColor} flex items-center gap-1.5 shadow-lg`}>
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse"></span>
        <span className="font-semibold uppercase">{label}</span>
        <span className="opacity-60">|</span>
        <span className="font-bold">Speed: {speed}x</span>
      </div>
    </div>
  );
}
