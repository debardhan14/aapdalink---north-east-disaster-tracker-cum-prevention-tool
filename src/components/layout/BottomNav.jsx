import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Map, AlertTriangle, Shield, BookOpen, Plus } from '../common/Icons';

export const BottomNav = () => {
  const { activePage, setActivePage, setIsEmergencyModalOpen, setIsHazardModalOpen } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-slate-900 border-t border-slate-800 text-white shadow-2xl pb-safe">
      <div className="grid grid-cols-5 items-center h-16 px-1 max-w-lg mx-auto">
        
        {/* Home */}
        <button
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'home' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home size={20} />
          <span className="text-[10px] mt-1">Home</span>
        </button>

        {/* Map */}
        <button
          onClick={() => setActivePage('map')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'map' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Map size={20} />
          <span className="text-[10px] mt-1">Map</span>
        </button>

        {/* SOS Center Floating Button */}
        <div className="flex flex-col items-center justify-center -mt-5">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="w-14 h-14 rounded-full bg-red-600 hover:bg-red-700 text-white flex flex-col items-center justify-center shadow-emergency border-4 border-slate-900 active:scale-95 transition-all"
            aria-label="Request Emergency Help"
          >
            <AlertTriangle size={22} className="text-white" />
            <span className="text-[9px] font-black tracking-wider leading-none mt-0.5">SOS</span>
          </button>
        </div>

        {/* Safe Places */}
        <button
          onClick={() => setActivePage('safeplaces')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'safeplaces' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Shield size={20} />
          <span className="text-[10px] mt-1">Shelters</span>
        </button>

        {/* Safety Guide */}
        <button
          onClick={() => setActivePage('safety')}
          className={`flex flex-col items-center justify-center py-1 transition-colors ${
            activePage === 'safety' ? 'text-red-500 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen size={20} />
          <span className="text-[10px] mt-1">Guides</span>
        </button>

      </div>
    </nav>
  );
};
