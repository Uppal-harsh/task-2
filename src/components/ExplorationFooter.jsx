import React from 'react';
import { Anchor, Heart, Cpu, Code2, Compass } from 'lucide-react';
import { ZONES } from '../data/oceanData';

export default function ExplorationFooter() {
  const scrollToZone = (zoneId) => {
    const el = document.getElementById(zoneId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative z-30 border-t border-slate-900 bg-black text-slate-400 py-16 px-6 md:px-12 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Brand Column */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Anchor className="h-5 w-5" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              ABYSSAL ODYSSEY
            </span>
          </div>
          <p className="text-sm text-slate-400 max-w-md leading-relaxed">
            A real-time native parallax scrolling expedition through the five bathymetric realms of Earth's ocean, built with React and Tailwind CSS using high-performance CSS 3D hardware transforms and requestAnimationFrame synchronization.
          </p>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Cpu className="h-3.5 w-3.5" />
            <span>Zero External Parallax Libraries • 60/120 FPS GPU Rendered</span>
          </div>
        </div>

        {/* Zones Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Compass className="h-4 w-4 text-cyan-400" />
            Oceanic Realms
          </h4>
          <ul className="space-y-2 text-sm">
            {ZONES.map((zone) => (
              <li key={zone.id}>
                <button
                  onClick={() => scrollToZone(zone.id)}
                  className="hover:text-cyan-300 transition-colors text-left text-xs font-mono flex items-center justify-between w-full cursor-pointer"
                >
                  <span>{zone.alias}</span>
                  <span className="text-slate-600 text-[10px]">{zone.depthRange}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Technical Architecture Column */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-200 flex items-center gap-2">
            <Code2 className="h-4 w-4 text-amber-400" />
            Parallax Engine Specs
          </h4>
          <ul className="space-y-1.5 text-xs font-mono text-slate-400">
            <li>• Transform: translate3d (GPU plane)</li>
            <li>• requestAnimationFrame scroll loop</li>
            <li>• will-change: transform layer hints</li>
            <li>• Intersection Observer text reveals</li>
            <li>• Web Audio API synth soundscape</li>
            <li>• 5-Layer Diorama in Bathypelagic Zone</li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
        <div>© 2026 Abyssal Odyssey Project • Challenger Deep Expedition 10,994m</div>
        <div className="flex items-center gap-1">
          Designed with deep sea precision & React
        </div>
      </div>
    </footer>
  );
}
