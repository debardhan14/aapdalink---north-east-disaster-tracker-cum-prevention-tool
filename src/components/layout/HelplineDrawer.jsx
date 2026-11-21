import React from 'react';
import { EMERGENCY_NUMBERS } from '../../lib/emergencyData.js';
import { Phone, PhoneCall, AlertTriangle, X } from '../common/Icons';
import { Button } from '../common/Button';

export const HelplineDrawer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white shadow-emergency">
                <PhoneCall size={20} />
              </div>
              <div>
                <h2 className="text-base font-bold">Emergency Helplines</h2>
                <p className="text-xs text-slate-300">North East India Response Units (24/7)</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              aria-label="Close helplines"
            >
              <X size={20} />
            </button>
          </div>

          {/* Quick Notice */}
          <div className="bg-red-50 border-b border-red-200 p-4 text-xs text-red-900 flex items-start gap-2.5">
            <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Life-Threatening Emergency?</p>
              <p className="mt-0.5 text-red-800">
                Do not rely on web forms or delayed messaging. Dial <strong>112</strong> immediately. Calls are toll-free and function even with zero mobile balance.
              </p>
            </div>
          </div>

          {/* Directory List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1">
              Immediate Dispatch (Toll-Free)
            </div>

            {EMERGENCY_NUMBERS.filter(n => n.priority).map((num, idx) => (
              <a
                key={idx}
                href={`tel:${num.number.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-between p-3.5 rounded-xl border-2 border-red-200 bg-red-50/50 hover:bg-red-100/60 transition-colors group"
              >
                <div>
                  <div className="text-sm font-bold text-slate-900">{num.label}</div>
                  <div className="text-xs text-slate-600 mt-0.5">{num.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-black text-red-700 tracking-wider font-mono">
                    {num.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone size={14} />
                  </div>
                </div>
              </a>
            ))}

            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 pt-4">
              Regional Control Centers & NDRF Battalions
            </div>

            {EMERGENCY_NUMBERS.filter(n => !n.priority).map((num, idx) => (
              <a
                key={idx}
                href={`tel:${num.number.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors group"
              >
                <div>
                  <div className="text-sm font-semibold text-slate-900">{num.label}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{num.desc}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-slate-800">
                    {num.number}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    <Phone size={13} />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Footer note */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 text-center">
            <Button variant="secondary" fullWidth onClick={onClose}>
              Close Directory
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
