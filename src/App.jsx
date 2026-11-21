import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { NotificationBanner } from './components/layout/NotificationBanner';
import { EmergencyHelpModal } from './components/emergency/EmergencyHelpModal';
import { HazardReportModal } from './components/hazard/HazardReportModal';
import { HomePage } from './pages/HomePage';
import { MapPage } from './pages/MapPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { SafePlacesPage } from './pages/SafePlacesPage';
import { SafetyGuidePage } from './pages/SafetyGuidePage';
import { AdminPage } from './pages/AdminPage';
import { AlertTriangle, Shield, CheckCircle2, Phone, X } from './components/common/Icons';

const AppContent = () => {
  const { 
    activePage, 
    setActivePage,
    isEmergencyModalOpen, 
    setIsEmergencyModalOpen,
    isHazardModalOpen, 
    setIsHazardModalOpen,
    statusMessage,
    lowBandwidth 
  } = useApp();

  const renderActivePage = () => {
    switch (activePage) {
      case 'home': return <HomePage />;
      case 'map': return <MapPage />;
      case 'emergency': return <EmergencyPage />;
      case 'safeplaces': return <SafePlacesPage />;
      case 'safety': return <SafetyGuidePage />;
      case 'admin': return <AdminPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900 selection:bg-red-500 selection:text-white font-sans antialiased pb-16 md:pb-0">
      
      {/* 1. Official Warning Ticker & Demo Notice */}
      <NotificationBanner />

      {/* 2. Top Header Navigation */}
      <Header />

      {/* 3. Low-Bandwidth Mode Active Banner */}
      {lowBandwidth && (
        <div className="bg-amber-100 border-b border-amber-300 text-amber-900 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-2">
            <span>⚡ Low-Bandwidth Mode Active:</span>
            <span className="font-normal text-amber-800">
              High-resolution map tiles & heavy media are suppressed for optimal 2G performance in remote hill areas.
            </span>
          </div>
        </div>
      )}

      {/* 4. Main Page Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
        {renderActivePage()}
      </main>

      {/* 5. Mobile Bottom Navigation */}
      <BottomNav />

      {/* 6. Global Modals */}
      <EmergencyHelpModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <HazardReportModal
        isOpen={isHazardModalOpen}
        onClose={() => setIsHazardModalOpen(false)}
      />

      {/* 7. Status Toast Notification */}
      {statusMessage && (
        <div className="fixed bottom-20 md:bottom-6 right-4 z-50 max-w-md animate-in slide-in-from-bottom duration-200">
          <div className={`p-4 rounded-xl shadow-2xl border text-xs sm:text-sm font-semibold flex items-center gap-3 ${
            statusMessage.type === 'emergency' ? 'bg-red-700 text-white border-red-800' :
            statusMessage.type === 'error' ? 'bg-rose-600 text-white border-rose-700' :
            statusMessage.type === 'warning' ? 'bg-orange-600 text-white border-orange-700' :
            'bg-slate-900 text-white border-slate-800'
          }`}>
            <CheckCircle2 size={18} className="flex-shrink-0" />
            <span className="flex-1">{statusMessage.message}</span>
          </div>
        </div>
      )}

      {/* 8. Desktop Footer */}
      <footer className="hidden md:block bg-[#070D1B] text-slate-400 border-t border-slate-800 text-xs py-8 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-red-600 flex items-center justify-center text-white font-bold text-xs">
                  A
                </div>
                <span className="font-bold text-white text-sm">AapdaLink</span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                Community safety & emergency assistance hub for North East India. Built for rapid low-bandwidth access during floods, heavy rainfall, and landslides.
              </p>
            </div>

            <div>
              <div className="font-bold text-slate-200 mb-2">Emergency Numbers</div>
              <ul className="space-y-1 text-[11px]">
                <li><strong className="text-red-400">112</strong> — National All-in-One</li>
                <li><strong className="text-white">1070</strong> — State Disaster Control</li>
                <li><strong className="text-white">1077</strong> — District Emergency DEOC</li>
                <li><strong className="text-white">108</strong> — Ambulance Service</li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-200 mb-2">Quick Navigation</div>
              <ul className="space-y-1 text-[11px]">
                <li><button onClick={() => setActivePage('home')} className="hover:text-white">Dashboard Home</button></li>
                <li><button onClick={() => setActivePage('map')} className="hover:text-white">Disaster Map</button></li>
                <li><button onClick={() => setActivePage('safeplaces')} className="hover:text-white">Safe Shelters & Camps</button></li>
                <li><button onClick={() => setActivePage('safety')} className="hover:text-white">Preparedness Guides</button></li>
                <li><button onClick={() => setActivePage('admin')} className="hover:text-white">Admin Operations Triage</button></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-slate-200 mb-2">Simulation Notice</div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Demonstration platform with realistic North East scenario models. Clearly labels demo data to prevent public panic.
              </p>
            </div>
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <span>© 2026 AapdaLink Disaster Safety Platform • North East India</span>
            <span>React + Vite • Tailwind CSS • Leaflet • Supabase</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
