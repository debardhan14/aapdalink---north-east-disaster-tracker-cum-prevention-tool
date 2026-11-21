import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Waves, 
  Mountain, 
  AlertTriangle, 
  Shield, 
  Hospital, 
  Filter, 
  MapPin, 
  Phone, 
  ExternalLink, 
  Info,
  CheckCircle2,
  Clock,
  Compass
} from '../common/Icons';
import { SeverityBadge, VerificationBadge, DemoTag } from '../common/Badge';
import { Button } from '../common/Button';

export const DisasterMap = ({ onSelectMarker, heightClass = 'h-[480px] sm:h-[560px]' }) => {
  const { hazards, safePlaces, lowBandwidth, t } = useApp();
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [activeItem, setActiveItem] = useState(null);
  const [isLeafletReady, setIsLeafletReady] = useState(false);
  
  const mapContainerRef = useRef(null);
  const leafletMapRef = useRef(null);
  const markersGroupRef = useRef(null);

  // Combine hazards and safe places into unified map markers
  const allMarkers = [
    ...hazards.map(h => ({
      id: h.id,
      title: h.title,
      type: h.hazard_type,
      category: 'hazard',
      severity: h.severity,
      status: h.status,
      lat: h.latitude,
      lng: h.longitude,
      state: h.state,
      district: h.district,
      location: h.location_name,
      description: h.description,
      image: h.image_url,
      reporter: h.reporter_name,
      confirmations: h.confirmations_count,
      isDemo: true
    })),
    ...safePlaces.map(s => ({
      id: s.id,
      title: s.name,
      type: s.place_type === 'hospital' ? 'hospital' : 'shelter',
      category: 'safe_place',
      severity: 'safe',
      status: 'verified',
      lat: s.latitude,
      lng: s.longitude,
      state: s.state,
      district: s.district,
      location: s.address,
      description: `Capacity: ${s.total_capacity} | Occupancy: ${s.current_occupancy} (${s.operational_status})`,
      phone: s.contact_phone,
      contactPerson: s.contact_person,
      amenities: s.amenities,
      isDemo: true
    }))
  ];

  // Filter markers based on selected tab
  const filteredMarkers = allMarkers.filter(m => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'flood') return m.type === 'flood' || m.type === 'waterlogging';
    if (selectedFilter === 'landslide') return m.type === 'landslide';
    if (selectedFilter === 'road_block') return m.type === 'road_block' || m.type === 'bridge_damage';
    if (selectedFilter === 'shelter') return m.type === 'shelter' || m.category === 'safe_place';
    if (selectedFilter === 'hospital') return m.type === 'hospital';
    return true;
  });

  // 1. Initialize Leaflet Map on Mount with Proper Cleanup
  useEffect(() => {
    const container = mapContainerRef.current;
    if (!container || lowBandwidth || typeof window === 'undefined' || !window.L) {
      return;
    }

    const L = window.L;

    // Safety: Clean up any previous instance on this container
    if (leafletMapRef.current) {
      try {
        leafletMapRef.current.remove();
      } catch (e) {
        console.warn('Error removing previous map:', e);
      }
      leafletMapRef.current = null;
    }

    // Safety: If container already has _leaflet_id, remove it
    if (container._leaflet_id) {
      container._leaflet_id = null;
    }

    try {
      const map = L.map(container, {
        center: [26.2006, 92.9376],
        zoom: 7,
        zoomControl: true,
        attributionControl: true
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      const markersGroup = L.layerGroup().addTo(map);
      
      leafletMapRef.current = map;
      markersGroupRef.current = markersGroup;
      setIsLeafletReady(true);

      // Force size recalculation after browser reflow
      setTimeout(() => {
        try {
          if (leafletMapRef.current) {
            leafletMapRef.current.invalidateSize();
          }
        } catch (e) {}
      }, 250);

    } catch (err) {
      console.warn('Leaflet initialization error:', err);
      setIsLeafletReady(false);
    }

    return () => {
      if (leafletMapRef.current) {
        try {
          leafletMapRef.current.remove();
        } catch (e) {}
        leafletMapRef.current = null;
      }
      markersGroupRef.current = null;
      setIsLeafletReady(false);
    };
  }, [lowBandwidth]);

  // 2. Render Markers whenever markers or filter changes
  useEffect(() => {
    if (!leafletMapRef.current || !markersGroupRef.current || typeof window === 'undefined' || !window.L) {
      return;
    }

    const L = window.L;
    const group = markersGroupRef.current;
    group.clearLayers();

    filteredMarkers.forEach(m => {
      let pinColor = '#ea580c';
      let iconHtml = '⚠️';

      if (m.type === 'flood' || m.type === 'waterlogging') {
        pinColor = '#2563eb';
        iconHtml = '🌊';
      } else if (m.type === 'landslide') {
        pinColor = '#b91c1c';
        iconHtml = '⛰️';
      } else if (m.type === 'road_block' || m.type === 'bridge_damage') {
        pinColor = '#ea580c';
        iconHtml = '🚧';
      } else if (m.type === 'hospital') {
        pinColor = '#dc2626';
        iconHtml = '🏥';
      } else if (m.type === 'shelter') {
        pinColor = '#16a34a';
        iconHtml = '🏕️';
      }

      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div style="background-color: ${pinColor}; width: 34px; height: 34px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 3px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.3); cursor: pointer;">
                ${iconHtml}
              </div>`,
        iconSize: [34, 34],
        iconAnchor: [17, 17],
        popupAnchor: [0, -17]
      });

      const marker = L.marker([m.lat, m.lng], { icon: customIcon });

      const popupContent = `
        <div style="font-family: system-ui, sans-serif; padding: 12px; max-width: 260px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: ${pinColor}; margin-bottom: 4px;">
            ${m.type.toUpperCase().replace('_', ' ')}
          </div>
          <h4 style="font-size: 14px; font-weight: 700; margin: 0 0 6px 0; color: #0f172a; line-height: 1.3;">
            ${m.title}
          </h4>
          <p style="font-size: 12px; color: #64748b; margin: 0 0 8px 0;">
            📍 ${m.location} (${m.district})
          </p>
          <div style="font-size: 11px; padding: 4px 8px; border-radius: 4px; background: #f1f5f9; color: #334155; margin-bottom: 8px;">
            ${m.status === 'verified' ? '✅ Verified by Authority' : '⏳ Community Report (Unverified)'}
          </div>
          <div style="display: flex; gap: 6px;">
            <a href="https://maps.google.com/?q=${m.lat},${m.lng}" target="_blank" rel="noopener" style="display: inline-block; padding: 5px 10px; background: #0f172a; color: white; text-decoration: none; border-radius: 6px; font-size: 11px; font-weight: 600;">
              Directions ↗
            </a>
          </div>
        </div>
      `;

      marker.bindPopup(popupContent);
      marker.on('click', () => {
        setActiveItem(m);
        if (onSelectMarker) onSelectMarker(m);
      });

      group.addLayer(marker);
    });

  }, [filteredMarkers, isLeafletReady]);

  const filterTabs = [
    { id: 'all', label: t('allMarkers'), count: allMarkers.length },
    { id: 'flood', label: t('floods'), icon: Waves, count: allMarkers.filter(m => m.type === 'flood' || m.type === 'waterlogging').length },
    { id: 'landslide', label: t('landslides'), icon: Mountain, count: allMarkers.filter(m => m.type === 'landslide').length },
    { id: 'road_block', label: t('roadBlocks'), icon: AlertTriangle, count: allMarkers.filter(m => m.type === 'road_block' || m.type === 'bridge_damage').length },
    { id: 'shelter', label: t('shelters'), icon: Shield, count: allMarkers.filter(m => m.type === 'shelter' || m.category === 'safe_place').length },
    { id: 'hospital', label: t('hospitals'), icon: Hospital, count: allMarkers.filter(m => m.type === 'hospital').length }
  ];

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Map Control Bar & Filters */}
      <div className="bg-white p-3 sm:p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <Filter size={16} className="text-slate-400 flex-shrink-0 mr-1 hidden sm:inline" />
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 border ${
                selectedFilter === tab.id
                  ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                  : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                selectedFilter === tab.id ? 'bg-slate-700 text-white' : 'bg-slate-200 text-slate-700'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 self-end md:self-center">
          <DemoTag />
          <span className="text-xs text-slate-500 font-medium hidden sm:inline">North East India Region</span>
        </div>
      </div>

      {/* Main Map Canvas Area */}
      <div className={`relative rounded-2xl overflow-hidden border border-slate-300 bg-slate-900 shadow-inner ${heightClass}`}>
        
        {/* Leaflet DOM Node */}
        <div 
          ref={mapContainerRef} 
          className="w-full h-full z-10" 
          style={{ display: lowBandwidth ? 'none' : 'block' }}
        />

        {/* Fallback / Low-Bandwidth Vector Topographical Map */}
        {(lowBandwidth || !isLeafletReady) && (
          <div className="w-full h-full bg-[#0F172A] relative overflow-hidden flex flex-col justify-between p-4 sm:p-6 text-white">
            {/* Topographic Grid Lines & Rivers SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <path d="M 50 120 Q 200 80, 400 130 T 700 180 T 950 160" fill="none" stroke="#38BDF8" strokeWidth="6" />
              <path d="M 500 350 Q 600 380, 750 420" fill="none" stroke="#38BDF8" strokeWidth="4" />
              <circle cx="250" cy="180" r="120" fill="none" stroke="#64748B" strokeDasharray="4 4" />
              <circle cx="680" cy="220" r="160" fill="none" stroke="#64748B" strokeDasharray="4 4" />
              <circle cx="850" cy="380" r="90" fill="none" stroke="#64748B" strokeDasharray="4 4" />
            </svg>

            {/* Top Bar on Map */}
            <div className="relative z-20 flex items-center justify-between">
              <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs flex items-center gap-2">
                <Compass size={15} className="text-red-400" />
                <span className="font-semibold text-slate-200">
                  {lowBandwidth ? 'Low-Bandwidth Topographical Mode' : 'North East Interactive Grid'}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                Lat 26.2°N | Long 92.9°E
              </span>
            </div>

            {/* Interactive Vector Pins */}
            <div className="relative z-20 flex-1 grid grid-cols-2 sm:grid-cols-3 gap-3 py-6 overflow-y-auto">
              {filteredMarkers.map((m) => {
                const isSelected = activeItem?.id === m.id;
                let bgBadge = 'bg-orange-600';
                if (m.type === 'flood' || m.type === 'waterlogging') bgBadge = 'bg-blue-600';
                if (m.type === 'landslide') bgBadge = 'bg-red-700';
                if (m.type === 'hospital') bgBadge = 'bg-rose-600';
                if (m.type === 'shelter') bgBadge = 'bg-emerald-600';

                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      setActiveItem(m);
                      if (onSelectMarker) onSelectMarker(m);
                    }}
                    className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-slate-800 border-red-500 shadow-emergency ring-2 ring-red-500' 
                        : 'bg-slate-900/85 border-slate-700/80 hover:bg-slate-800/90'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white uppercase ${bgBadge}`}>
                          {m.type.replace('_', ' ')}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {m.district}
                        </span>
                      </div>
                      <div className="font-bold text-white text-sm line-clamp-1">{m.title}</div>
                      <div className="text-slate-300 text-[11px] mt-1 line-clamp-2">{m.description}</div>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                      <span>{m.status === 'verified' ? '✅ Verified' : '⏳ Unverified'}</span>
                      <span className="text-red-400 font-semibold">View Pin →</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend Footer */}
            <div className="relative z-20 pt-2 border-t border-slate-800 flex flex-wrap items-center gap-3 text-[11px] text-slate-300">
              <span className="font-semibold text-white">Map Legend:</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span> Floods</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-600"></span> Landslides</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> Road Blocks</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Shelters</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span> Hospitals</span>
            </div>
          </div>
        )}

      </div>

      {/* Selected Marker Detail Card */}
      {activeItem && (
        <div className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-lg animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <SeverityBadge severity={activeItem.severity} />
                <VerificationBadge status={activeItem.status} />
                <DemoTag />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900">{activeItem.title}</h3>
              
              <div className="flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin size={15} className="text-red-600 flex-shrink-0" />
                <span className="font-semibold text-slate-800">{activeItem.location}</span>
                <span>• {activeItem.district}, {activeItem.state}</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-2xl">
                {activeItem.description}
              </p>

              {activeItem.phone && (
                <div className="inline-flex items-center gap-2 p-2 rounded-lg bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900">
                  <Phone size={14} className="text-emerald-700" />
                  <span>Contact: {activeItem.contactPerson || 'Helpline'} — </span>
                  <a href={`tel:${activeItem.phone.replace(/[^0-9]/g, '')}`} className="underline font-mono">
                    {activeItem.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div className="flex sm:flex-col gap-2 flex-shrink-0 self-end sm:self-center w-full sm:w-auto">
              <a
                href={`https://maps.google.com/?q=${activeItem.lat},${activeItem.lng}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition-colors"
              >
                <ExternalLink size={14} />
                <span>Get GPS Directions</span>
              </a>

              {activeItem.phone && (
                <a
                  href={`tel:${activeItem.phone.replace(/[^0-9]/g, '')}`}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
                >
                  <Phone size={14} />
                  <span>Call Desk</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
