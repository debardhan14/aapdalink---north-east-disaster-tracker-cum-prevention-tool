import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  PhoneCall, 
  AlertTriangle, 
  Wifi, 
  WifiOff, 
  Map, 
  Home, 
  Plus, 
  BookOpen, 
  Settings, 
  Menu, 
  X,
  FileText
} from '../common/Icons';
import { HelplineDrawer } from './HelplineDrawer';
import { AudioReaderButton } from '../common/AudioReader.jsx';

export const Header = () => {
  const { 
    activePage, 
    setActivePage, 
    lowBandwidth, 
    setLowBandwidth, 
    setIsEmergencyModalOpen,
    setIsHazardModalOpen,
    language,
    setLanguage,
    LANGUAGES,
    t
  } = useApp();

  const [isHelplineOpen, setIsHelplineOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('dashboard'), icon: Home },
    { id: 'map', label: t('map'), icon: Map },
    { id: 'safeplaces', label: t('safeplaces'), icon: Shield },
    { id: 'safety', label: t('safety'), icon: BookOpen },
    { id: 'admin', label: t('admin'), icon: Settings }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0A1329] border-b border-slate-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-2 sm:gap-3">
            
            {/* Logo & Platform Title */}
            <div 
              className="flex items-center gap-2.5 cursor-pointer group flex-shrink-0"
              onClick={() => { setActivePage('home'); setMobileMenuOpen(false); }}
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-red-700 flex items-center justify-center text-white shadow-emergency group-hover:scale-105 transition-transform">
                <Shield size={22} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-black tracking-tight text-white">{t('appTitle') || 'AapdaLink'}</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-blue-900/80 text-blue-200 border border-blue-700/60 hidden sm:inline-block">
                    {t('neRegion')}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:block leading-none mt-0.5">{t('appSubtitle')}</p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActivePage(item.id)}
                    className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                      isActive 
                        ? 'bg-slate-800 text-white shadow-sm border border-slate-700' 
                        : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Action Bar */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              
              {/* Language Translator Switcher */}
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="px-2 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 cursor-pointer focus:ring-2 focus:ring-red-500"
                  aria-label="Select Regional Language"
                >
                  {LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                      🌐 {lang.native}
                    </option>
                  ))}
                </select>
              </div>

              {/* Voice Reader Audio Button */}
              <AudioReaderButton 
                text={t('audioAnnounceIntro')} 
                lang={language} 
                label={t('voiceAssist')}
                size="sm"
              />

              {/* Low-Bandwidth Mode Toggle */}
              <button
                type="button"
                onClick={() => setLowBandwidth(!lowBandwidth)}
                title={lowBandwidth ? 'Low-Bandwidth Mode Active' : 'Switch to Low-Bandwidth Mode'}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                  lowBandwidth 
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/50' 
                    : 'bg-slate-800/80 text-slate-400 border-slate-700 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {lowBandwidth ? <WifiOff size={13} className="text-amber-400" /> : <Wifi size={13} />}
                <span className="hidden xl:inline">{lowBandwidth ? t('lowDataOn') : t('lowDataOff')}</span>
              </button>

              {/* Direct Helplines Button */}
              <button
                type="button"
                onClick={() => setIsHelplineOpen(true)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
                title="Dial 112 / 1070 Emergency Services"
              >
                <PhoneCall size={14} className="text-red-400 animate-pulse" />
                <span>{t('helplines')}</span>
              </button>

              {/* Primary Emergency SOS Button */}
              <button
                type="button"
                onClick={() => setIsEmergencyModalOpen(true)}
                className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-extrabold bg-red-600 hover:bg-red-700 text-white shadow-emergency active:scale-95 transition-all"
              >
                <AlertTriangle size={15} />
                <span>{t('requestHelp')}</span>
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-1.5 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-800 bg-[#070D1B] px-4 pt-3 pb-4 space-y-2">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => { setIsEmergencyModalOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-red-600 text-white font-bold text-xs shadow-emergency"
              >
                <AlertTriangle size={16} />
                <span>{t('requestRescueBtn')}</span>
              </button>
              <button
                onClick={() => { setIsHazardModalOpen(true); setMobileMenuOpen(false); }}
                className="flex items-center justify-center gap-2 p-3 rounded-lg bg-orange-600 text-white font-bold text-xs"
              >
                <Plus size={16} />
                <span>{t('reportHazardBtn')}</span>
              </button>
            </div>

            {navItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => { setActivePage(item.id); setMobileMenuOpen(false); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <IconComp size={18} className={isActive ? 'text-red-400' : 'text-slate-400'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Slide-over Helpline Drawer */}
      <HelplineDrawer 
        isOpen={isHelplineOpen} 
        onClose={() => setIsHelplineOpen(false)} 
      />
    </>
  );
};
