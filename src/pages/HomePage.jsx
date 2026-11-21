import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { AlertSummary } from '../components/home/AlertSummary';
import { RecentReportsFeed } from '../components/home/RecentReportsFeed';
import { DisasterMap } from '../components/map/DisasterMap';
import { useApp } from '../context/AppContext';
import { PhoneCall, Shield, AlertTriangle, ArrowRight } from '../components/common/Icons';

export const HomePage = () => {
  const { setActivePage, setIsEmergencyModalOpen } = useApp();

  return (
    <div className="space-y-6 pb-12">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Official Alerts Summary */}
      <AlertSummary />

      {/* 3. Quick Map Snapshot */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Interactive North East Hazard & Safe Haven Map
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live geographic visualization of active flood levels, landslides, road blocks, and open relief camps.
            </p>
          </div>
          <button
            onClick={() => setActivePage('map')}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700"
          >
            <span>Full Screen Map</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <DisasterMap />
      </div>

      {/* 4. Live Community Reports Feed */}
      <RecentReportsFeed />

      {/* 5. Emergency Helpline Quick Contact Bar */}
      <div className="bg-red-700 text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 shadow-emergency">
        <div className="space-y-1 text-center sm:text-left">
          <div className="text-xs font-bold uppercase tracking-wider text-red-200">
            Immediate Response 24/7
          </div>
          <h3 className="text-xl sm:text-2xl font-black">
            Are You or a Family Member Stranded in Rising Waters?
          </h3>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl">
            Toll-free emergency dispatch units are on standby across Assam, Meghalaya, and hill districts.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <a
            href="tel:112"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl bg-white text-red-700 hover:bg-red-50 font-black text-base shadow-lg transition-transform active:scale-95"
          >
            <PhoneCall size={20} className="text-red-600" />
            <span>DIAL 112 (FREE)</span>
          </a>

          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-4 rounded-xl bg-red-900/80 hover:bg-red-900 text-white font-bold text-sm border border-red-500 transition-colors"
          >
            <AlertTriangle size={17} />
            <span>Submit Rescue Ticket</span>
          </button>
        </div>
      </div>
    </div>
  );
};
