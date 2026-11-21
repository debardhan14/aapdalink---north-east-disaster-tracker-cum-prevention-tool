import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, Info, ChevronRight, X } from '../common/Icons';

export const NotificationBanner = () => {
  const { alerts, setActivePage } = useApp();
  const [dismissNotice, setDismissNotice] = useState(false);

  const activeAlerts = alerts.filter(a => a.is_active);
  const primaryAlert = activeAlerts.find(a => a.severity === 'critical_red') || activeAlerts[0];

  return (
    <div className="w-full space-y-1">
      {/* Official Emergency Broadcast Bar */}
      {primaryAlert && (
        <div 
          onClick={() => setActivePage('home')}
          className={`px-4 py-2.5 text-xs sm:text-sm font-medium flex items-center justify-between cursor-pointer transition-colors ${
            primaryAlert.severity === 'critical_red'
              ? 'bg-red-700 text-white hover:bg-red-800'
              : 'bg-orange-600 text-white hover:bg-orange-700'
          }`}
        >
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-white/20 animate-pulse">
                <AlertTriangle size={13} className="text-white" />
              </span>
              <span className="font-bold uppercase tracking-wider text-[11px] bg-black/25 px-2 py-0.5 rounded flex-shrink-0">
                Official Alert ({primaryAlert.source_agency})
              </span>
              <span className="truncate font-semibold">{primaryAlert.title}</span>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-xs opacity-90 hover:opacity-100 flex-shrink-0 font-medium">
              <span>View Advisory</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>
      )}

      {/* Demo Data & Safety Disclaimer Bar */}
      {!dismissNotice && (
        <div className="bg-slate-900 text-slate-200 border-b border-slate-800 px-4 py-1.5 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded text-[10px] tracking-wider uppercase border border-amber-500/40 flex-shrink-0">
                Simulation Demo
              </span>
              <span className="text-slate-300 truncate">
                Disaster data & incidents are simulated North East scenario models. For real-life emergencies, contact <strong>112</strong> or <strong>1070</strong> immediately.
              </span>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setDismissNotice(true);
              }}
              className="text-slate-400 hover:text-white p-1 rounded"
              title="Dismiss notice"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
