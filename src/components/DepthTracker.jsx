import React from 'react';
import { ZONES } from '../data/oceanData';

export default function DepthTracker({ scrollProgress, currentDepth, activeZoneId }) {
  const scrollToZone = (zoneId) => {
    const el = document.getElementById(zoneId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <aside className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Depth Card */}
      <div className="rounded-2xl border border-cyan-500/30 bg-slate-950/80 p-3 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] min-w-[140px] text-right font-mono">
        <div className="text-[10px] uppercase tracking-wider text-slate-400">Current Depth</div>
        <div className="text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-300">
          {currentDepth.toLocaleString()} <span className="text-xs font-normal text-slate-400">m</span>
        </div>
        <div className="text-[10px] text-slate-400">
          {(scrollProgress * 100).toFixed(0)}% Water Column
        </div>
      </div>

      {/* Vertical Navigation Track */}
      <div className="relative flex flex-col items-center py-4 px-2 rounded-2xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-lg">
        {/* Background line */}
        <div className="absolute top-4 bottom-4 w-0.5 bg-slate-800" />
        
        {/* Progress active bar */}
        <div 
          className="absolute top-4 w-0.5 bg-gradient-to-b from-sky-400 via-cyan-400 to-indigo-500 rounded-full transition-all duration-150 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
          style={{ height: `calc(${Math.min(100, Math.max(0, scrollProgress * 100))}% - 16px)` }}
        />

        {/* Zone Markers */}
        <div className="relative flex flex-col gap-6 z-10">
          {ZONES.map((zone, index) => {
            const isActive = activeZoneId === zone.id;
            return (
              <button
                key={zone.id}
                onClick={() => scrollToZone(zone.id)}
                className="group relative flex items-center justify-center cursor-pointer"
                title={`${zone.alias} (${zone.depthRange})`}
              >
                {/* Tooltip on hover */}
                <div className="absolute right-7 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-700 text-xs font-sans text-slate-200 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                  <span className="font-semibold text-cyan-400">{zone.name}</span>
                  <span className="text-slate-400 text-[11px] block">{zone.depthRange}</span>
                </div>

                {/* Dot */}
                <div
                  className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    isActive
                      ? 'border-cyan-400 bg-cyan-400/30 scale-125 shadow-[0_0_12px_rgba(6,182,212,0.9)]'
                      : 'border-slate-600 bg-slate-900 group-hover:border-slate-400'
                  }`}
                >
                  {isActive && <div className="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-ping" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
