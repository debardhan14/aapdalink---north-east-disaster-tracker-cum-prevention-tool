import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NE_STATES } from '../../lib/emergencyData.js';
import { 
  Shield, 
  Hospital, 
  MapPin, 
  Phone, 
  Search, 
  Filter, 
  CheckCircle2, 
  ExternalLink,
  Users,
  Droplets,
  Zap,
  HeartPulse
} from '../common/Icons';
import { Button } from '../common/Button';
import { DemoTag } from '../common/Badge';

export const ShelterDirectory = () => {
  const { safePlaces, setActivePage, setSelectedMarker } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedType, setSelectedType] = useState('All');

  const filteredPlaces = safePlaces.filter(place => {
    const matchesSearch = 
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesState = selectedState === 'All' || place.state === selectedState;
    const matchesType = selectedType === 'All' || place.place_type === selectedType;

    return matchesSearch && matchesState && matchesType;
  });

  const getOccupancyColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'near_full': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'full': return 'bg-rose-100 text-rose-800 border-rose-300';
      default: return 'bg-slate-100 text-slate-800 border-slate-300';
    }
  };

  return (
    <div className="space-y-5">
      {/* Search & Filter Header Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          
          {/* Search Input */}
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by shelter name, hospital, district or landmark..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 text-sm focus:ring-2 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>

          {/* State Filter Dropdown */}
          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium bg-white"
            >
              <option value="All">All North East States</option>
              {NE_STATES.map(s => (
                <option key={s.name} value={s.name}>{s.name}</option>
              ))}
            </select>

            {/* Type Filter Dropdown */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2.5 rounded-lg border border-slate-300 text-xs sm:text-sm font-medium bg-white"
            >
              <option value="All">All Facility Types</option>
              <option value="relief_camp">Relief Camps</option>
              <option value="hospital">Hospitals & Trauma</option>
              <option value="evacuation_shelter">Evacuation Shelters</option>
              <option value="high_ground_school">Elevated Schools</option>
            </select>
          </div>
        </div>

        {/* Counter and Demo Tag */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-xs text-slate-500">
          <div>
            Showing <strong className="text-slate-900">{filteredPlaces.length}</strong> safe shelters & medical facilities
          </div>
          <DemoTag />
        </div>
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPlaces.length === 0 ? (
          <div className="col-span-full bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
            <Shield size={32} className="mx-auto text-slate-400 mb-2" />
            <p className="font-semibold text-slate-700">No safe facilities matching your query</p>
            <p className="text-xs mt-1">Try resetting the state or facility type filter.</p>
          </div>
        ) : (
          filteredPlaces.map((place) => {
            const isHospital = place.place_type === 'hospital';
            const percentage = Math.min(100, Math.round((place.current_occupancy / place.total_capacity) * 100));

            return (
              <div 
                key={place.id}
                className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  {/* Top Badges */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        isHospital ? 'bg-red-100 text-red-800 border border-red-200' : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                      }`}>
                        {isHospital ? <Hospital size={13} /> : <Shield size={13} />}
                        <span className="capitalize">{place.place_type.replace('_', ' ')}</span>
                      </span>

                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getOccupancyColor(place.operational_status)}`}>
                        {place.operational_status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>

                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      {place.district}
                    </span>
                  </div>

                  {/* Title & Address */}
                  <div>
                    <h3 className="text-base font-bold text-slate-900 leading-snug">{place.name}</h3>
                    <p className="text-xs text-slate-600 mt-1 flex items-start gap-1">
                      <MapPin size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />
                      <span>{place.address}</span>
                    </p>
                  </div>

                  {/* Capacity Bar */}
                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-medium">Capacity Occupancy</span>
                      <span className="font-bold text-slate-900 font-mono">
                        {place.current_occupancy} / {place.total_capacity} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          percentage > 90 ? 'bg-red-600' : percentage > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Verified Amenities */}
                  {place.amenities && (
                    <div className="pt-1">
                      <div className="text-[11px] font-bold text-slate-500 uppercase mb-1">Available Facilities:</div>
                      <div className="flex flex-wrap gap-1.5 text-[11px]">
                        {place.amenities.drinking_water && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                            <Droplets size={12} /> Clean Water
                          </span>
                        )}
                        {place.amenities.medical_aid && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-red-50 text-red-700 border border-red-200">
                            <HeartPulse size={12} /> Medical Aid
                          </span>
                        )}
                        {place.amenities.generator_backup && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                            <Zap size={12} /> Generator Power
                          </span>
                        )}
                        {place.amenities.food_ration && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                            🍞 Food Rations
                          </span>
                        )}
                        {place.amenities.baby_food && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-50 text-purple-700 border border-purple-200">
                            🍼 Baby Supplies
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Nodal Officer / Contact Person */}
                  {place.contact_person && (
                    <p className="text-xs text-slate-500">
                      Nodal Lead: <strong className="text-slate-800">{place.contact_person}</strong>
                    </p>
                  )}
                </div>

                {/* Card Action Buttons */}
                <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
                  <a
                    href={`tel:${place.contact_phone.replace(/[^0-9]/g, '')}`}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-colors"
                  >
                    <Phone size={14} />
                    <span>Call Desk ({place.contact_phone})</span>
                  </a>

                  <a
                    href={`https://maps.google.com/?q=${place.latitude},${place.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs shadow-sm transition-colors"
                    title="Open in GPS Maps"
                  >
                    <ExternalLink size={14} />
                    <span>Route</span>
                  </a>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
