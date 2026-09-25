import React from 'react';
import { X, Activity, Radio, Shield, Compass, Sparkles, AlertCircle } from 'lucide-react';
import ThreeSpecimenViewer from './ThreeSpecimenViewer';

export default function OrganismScannerModal({ specimen, onClose }) {
  if (!specimen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-cyan-500/40 bg-slate-950/95 text-slate-100 shadow-[0_0_60px_rgba(6,182,212,0.3)] custom-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glowing top line */}
        <div className="h-1 w-full bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-500 animate-pulse" />

        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800/80">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Activity className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">
                Deep Sea Bioscan Telemetry
              </span>
              <h3 className="text-base md:text-lg font-bold tracking-tight text-white">
                {specimen.name}
              </h3>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            aria-label="Close scanner"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-sm">
          {/* Interactive 3D Three.js Specimen Viewer */}
          <ThreeSpecimenViewer specimen={specimen} />

          {/* Status grid */}
          <div className="grid grid-cols-2 gap-3 font-mono text-xs">
            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Compass className="h-3.5 w-3.5 text-cyan-400" />
                Depth Realm
              </span>
              <span className="font-semibold text-cyan-300 text-sm">{specimen.depth}</span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-3">
              <span className="text-slate-400 flex items-center gap-1.5 mb-1">
                <Radio className="h-3.5 w-3.5 text-emerald-400" />
                Dimensions
              </span>
              <span className="font-semibold text-emerald-300 text-sm">{specimen.size}</span>
            </div>
          </div>

          {/* Bioluminescence & Adaptation */}
          <div className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-4 space-y-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-1">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Luminescence Signature
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {specimen.bioluminescence}
              </p>
            </div>

            <div className="pt-2 border-t border-cyan-900/30">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400 mb-1">
                <Shield className="h-3.5 w-3.5 text-amber-300" />
                Evolutionary Adaptation
              </div>
              <p className="text-slate-300 text-xs leading-relaxed">
                {specimen.trait}
              </p>
            </div>
          </div>

          {/* Rarity & Conservation */}
          <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/80 border border-slate-800 text-xs">
            <span className="text-slate-400 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-indigo-400" />
              Classification
            </span>
            <span className="font-mono font-medium text-indigo-300 px-2 py-0.5 rounded bg-indigo-950/50 border border-indigo-800/40">
              {specimen.rarity}
            </span>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/90 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 hover:bg-cyan-500/30 font-mono text-xs font-semibold transition-all cursor-pointer"
          >
            DISMISS TELEMETRY
          </button>
        </div>
      </div>
    </div>
  );
}
