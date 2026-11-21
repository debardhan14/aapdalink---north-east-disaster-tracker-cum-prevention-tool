import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  Map, 
  Shield, 
  Plus, 
  PhoneCall, 
  Compass, 
  BookOpen, 
  ChevronRight,
  Droplets,
  Mountain
} from '../common/Icons';
import { Button } from '../common/Button';
import { DemoTag } from '../common/Badge';

export const HeroSection = () => {
  const { 
    setActivePage, 
    setIsEmergencyModalOpen, 
    setIsHazardModalOpen, 
    alerts, 
    hazards, 
    requests 
  } = useApp();

  const criticalCount = requests.filter(r => r.urgency === 'immediate_rescue').length;
  const activeAlerts = alerts.filter(a => a.is_active);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0A1329] via-[#0F1E3D] to-[#162B55] text-white p-5 sm:p-8 border border-slate-800 shadow-xl">
      {/* Background Subtle Elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto space-y-6">
        
        {/* Top Status Capsule */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/80 border border-red-700/60 text-red-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span>Monsoon Emergency Response Active</span>
          </div>
          <span className="text-xs text-slate-300 font-medium">Assam • Meghalaya • Nagaland • Arunachal</span>
          <DemoTag />
        </div>

        {/* Hero Title & Subtitle */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
            North East India <span className="text-red-500">Disaster Safety</span> & Community Aid
          </h1>
          <p className="text-xs sm:text-base text-slate-300 max-w-2xl leading-relaxed">
            Immediate emergency information, river flood surges, mountain landslide tracking, and rapid assistance coordination across the Brahmaputra, Barak, and hill corridors.
          </p>
        </div>

        {/* Primary Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-sm sm:text-base shadow-emergency active:scale-95 transition-all"
          >
            <AlertTriangle size={20} />
            <span>REQUEST EMERGENCY HELP (SOS)</span>
          </button>

          <button
            onClick={() => setIsHazardModalOpen(true)}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm border border-slate-700 transition-colors"
          >
            <Plus size={18} className="text-orange-400" />
            <span>Report Road Block / Flood</span>
          </button>

          <button
            onClick={() => setActivePage('map')}
            className="inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-blue-900/60 hover:bg-blue-800/80 text-blue-200 font-semibold text-xs sm:text-sm border border-blue-700/50 transition-colors"
          >
            <Map size={18} />
            <span>View Live Disaster Map</span>
          </button>
        </div>

        {/* Quick Nav Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3">
          <button
            onClick={() => setActivePage('map')}
            className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600/30 flex items-center justify-center text-blue-400 mb-2 group-hover:scale-105 transition-transform">
              <Map size={18} />
            </div>
            <div className="font-bold text-xs text-white">Disaster Map</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Floods, slides & road pins</div>
          </button>

          <button
            onClick={() => setActivePage('safeplaces')}
            className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 flex items-center justify-center text-emerald-400 mb-2 group-hover:scale-105 transition-transform">
              <Shield size={18} />
            </div>
            <div className="font-bold text-xs text-white">Safe Shelters</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Relief camps & hospitals</div>
          </button>

          <button
            onClick={() => setIsHazardModalOpen(true)}
            className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-orange-600/30 flex items-center justify-center text-orange-400 mb-2 group-hover:scale-105 transition-transform">
              <Plus size={18} />
            </div>
            <div className="font-bold text-xs text-white">Report Incident</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Photo & GPS submission</div>
          </button>

          <button
            onClick={() => setActivePage('safety')}
            className="p-3 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-800 text-left transition-colors group"
          >
            <div className="w-8 h-8 rounded-lg bg-amber-600/30 flex items-center justify-center text-amber-400 mb-2 group-hover:scale-105 transition-transform">
              <BookOpen size={18} />
            </div>
            <div className="font-bold text-xs text-white">Safety Guides</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Checklists & First aid</div>
          </button>
        </div>

      </div>
    </div>
  );
};
