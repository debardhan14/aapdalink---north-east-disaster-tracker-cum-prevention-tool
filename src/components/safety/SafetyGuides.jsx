import React, { useState } from 'react';
import { SAFETY_GUIDES_DATA } from '../../lib/emergencyData.js';
import { GoBagChecklist } from './GoBagChecklist';
import { 
  Waves, 
  Mountain, 
  FileText, 
  HeartPulse, 
  CheckCircle2, 
  Download,
  AlertTriangle,
  Info 
} from '../common/Icons';
import { Button } from '../common/Button';

export const SafetyGuides = () => {
  const [activeTab, setActiveTab] = useState('flood-safety');

  const guideTabs = [
    { id: 'flood-safety', label: 'Flood Safety', icon: Waves },
    { id: 'landslide-safety', label: 'Landslide Protocols', icon: Mountain },
    { id: 'evacuation-checklist', label: 'Evacuation & Go-Bag', icon: FileText },
    { id: 'first-aid-basics', label: 'First Aid & Water', icon: HeartPulse }
  ];

  const currentGuide = SAFETY_GUIDES_DATA.find(g => g.id === activeTab) || SAFETY_GUIDES_DATA[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-5">
      {/* Navigation Tabs Bar */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {guideTabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-2 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 border ${
                  isActive 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-red-400' : 'text-slate-400'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Print Button */}
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 self-end sm:self-center"
          title="Print or Save PDF for Offline Use"
        >
          <Download size={14} />
          <span>Save / Print Offline Guide</span>
        </button>
      </div>

      {/* Guide Content Display */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 sm:p-7 shadow-sm space-y-6 print-page">
        {/* Guide Title Header */}
        <div className="border-b border-slate-200 pb-4">
          <div className="inline-block px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-red-100 text-red-800 border border-red-200 mb-2">
            {currentGuide.badge}
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            {currentGuide.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            {currentGuide.subtitle}
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {currentGuide.sections.map((sec, idx) => (
            <div key={idx} className="space-y-3">
              <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                <span className="w-6 h-6 rounded-md bg-slate-900 text-white text-xs flex items-center justify-center font-mono">
                  {idx + 1}
                </span>
                <span>{sec.heading}</span>
              </h3>

              <div className="space-y-2 pl-2 sm:pl-8">
                {sec.points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="text-red-600 font-bold mt-0.5">•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* If Evacuation guide is selected, render interactive Go-Bag checklist right below */}
        {activeTab === 'evacuation-checklist' && (
          <div className="pt-4 border-t border-slate-200">
            <GoBagChecklist />
          </div>
        )}

        {/* Emergency Callout in Guide */}
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3 text-xs text-red-900 no-print">
          <AlertTriangle size={18} className="text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Need emergency evacuation right now?</span>
            <p className="mt-0.5 text-red-800">
              Do not wait. Dial <strong>112</strong> or <strong>1070</strong> immediately. Stay together with family members on the highest sturdy structure available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
