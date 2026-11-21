import React from 'react';
import { SafetyGuides } from '../components/safety/SafetyGuides';
import { DemoTag } from '../components/common/Badge';

export const SafetyGuidePage = () => {
  return (
    <div className="space-y-4 pb-12">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Disaster Preparedness & First Aid Guidelines
            </h2>
            <DemoTag />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Authoritative survival protocols tailored for Brahmaputra/Barak flood basins and fragile hill highway slopes.
          </p>
        </div>
      </div>

      <SafetyGuides />
    </div>
  );
};
