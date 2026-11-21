import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NE_STATES } from '../../lib/emergencyData.js';
import { 
  AlertTriangle, 
  MapPin, 
  Phone, 
  User, 
  Users, 
  CheckCircle2, 
  Info,
  Clock,
  HeartPulse
} from '../common/Icons';
import { Button } from '../common/Button';

export const EmergencyHelpModal = ({ isOpen, onClose }) => {
  const { addEmergencyRequest } = useApp();

  const [formData, setFormData] = useState({
    contact_name: '',
    primary_contact: '',
    alternate_contact: '',
    category: 'rescue',
    urgency: 'immediate_rescue',
    state: 'Assam',
    district: 'Kamrup Metro',
    location_details: '',
    latitude: 26.1738,
    longitude: 91.7820,
    people_count: 1,
    has_vulnerable_individuals: false,
    vulnerable_details: '',
    description: ''
  });

  const [submitting, setSubmitting] = useState(false);
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [submittedTicket, setSubmittedTicket] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const currentDistricts = NE_STATES.find(s => s.name === formData.state)?.districts || [];

  const handleStateChange = (e) => {
    const newState = e.target.value;
    const firstDistrict = NE_STATES.find(s => s.name === newState)?.districts[0] || '';
    setFormData(prev => ({
      ...prev,
      state: newState,
      district: firstDistrict
    }));
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser.');
      return;
    }
    setGpsDetecting(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setFormData(prev => ({
          ...prev,
          latitude: parseFloat(pos.coords.latitude.toFixed(4)),
          longitude: parseFloat(pos.coords.longitude.toFixed(4)),
          location_details: prev.location_details || `GPS Pin: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
        }));
        setGpsDetecting(false);
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setGpsDetecting(false);
        // Graceful fallback coordinates
        alert('Could not auto-detect GPS. Please select your State & District manually.');
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.primary_contact || formData.primary_contact.length < 8) {
      setErrorMsg('Please provide a valid primary phone number so rescue volunteers can call you.');
      return;
    }

    if (!formData.location_details || formData.location_details.trim().length < 5) {
      setErrorMsg('Please provide specific landmark or house details to guide rescue teams.');
      return;
    }

    setSubmitting(true);
    try {
      const ticket = await addEmergencyRequest(formData);
      setSubmittedTicket(ticket);
    } catch (err) {
      setErrorMsg('Error submitting request. Please dial 112 directly.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedTicket(null);
    setFormData({
      contact_name: '',
      primary_contact: '',
      alternate_contact: '',
      category: 'rescue',
      urgency: 'immediate_rescue',
      state: 'Assam',
      district: 'Kamrup Metro',
      location_details: '',
      latitude: 26.1738,
      longitude: 91.7820,
      people_count: 1,
      has_vulnerable_individuals: false,
      vulnerable_details: '',
      description: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose}
      />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
        <div 
          className="relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-2xl border border-slate-200 flex flex-col max-h-[94vh] sm:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-red-700 text-white px-5 py-4 flex items-center justify-between border-b border-red-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-800/80 flex items-center justify-center border border-red-600">
                <AlertTriangle size={18} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-none">Emergency SOS & Assistance</h3>
                <p className="text-xs text-red-200 mt-1">Community Response & Disaster Triage</p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="text-red-200 hover:text-white p-1.5 rounded-lg hover:bg-red-800/60 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* CRITICAL SAFETY DISCLAIMER */}
          <div className="bg-red-50 border-b border-red-200 p-3.5 text-xs text-red-950 flex items-start gap-2.5">
            <Info size={17} className="text-red-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-extrabold uppercase tracking-wide">Important Safety Protocol:</span>
              <p className="mt-0.5 text-red-900 leading-relaxed">
                This platform logs your assistance request to the AapdaLink volunteer dispatch dashboard and Supabase database. <strong>It does NOT claim official automated delivery to state authorities unless physically integrated.</strong> If you or your family are in immediate physical danger, dial <strong>112</strong> or <strong>1070</strong> right now.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto flex-1">
            {submittedTicket ? (
              // SUBMISSION SUCCESS CONFIRMATION
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h4 className="text-xl font-black text-slate-900">Request Logged Successfully</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Your emergency record has been registered in the AapdaLink database.
                  </p>
                </div>

                {/* Ticket ID Box */}
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 inline-block text-left max-w-md w-full mx-auto">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-2">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Emergency Ticket Reference</span>
                    <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                      Status: Pending Dispatch
                    </span>
                  </div>
                  <div className="text-xl font-mono font-black text-red-700 tracking-wider">
                    {submittedTicket.ticket_id}
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Category: {submittedTicket.category.toUpperCase()} | Urgency: {submittedTicket.urgency.replace('_', ' ').toUpperCase()}
                  </p>
                  <p className="text-xs text-slate-700 mt-2 font-medium">
                    Location: {submittedTicket.location_details} ({submittedTicket.district}, {submittedTicket.state})
                  </p>
                </div>

                {/* Immediate Action Advice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left text-xs text-amber-900 space-y-1">
                  <p className="font-bold">Next Recommended Steps:</p>
                  <ul className="list-disc list-inside space-y-1 text-amber-800">
                    <li>Keep your mobile phone battery preserved; turn on Battery Saver mode.</li>
                    <li>Move to an elevated position if floodwaters continue rising.</li>
                    <li>Have a whistle, torch, or bright piece of cloth ready for signaling.</li>
                    <li>If condition worsens, call DEOC Control Room directly at <strong>1077</strong>.</li>
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="tel:112"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-emergency"
                  >
                    <Phone size={16} />
                    <span>Dial 112 (National Helpline)</span>
                  </a>
                  <Button variant="secondary" onClick={handleResetAndClose}>
                    Done / Close
                  </Button>
                </div>
              </div>
            ) : (
              // EMERGENCY REQUEST FORM
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-900 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Category & Urgency */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Assistance Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-red-500 text-slate-800"
                    >
                      <option value="rescue">🚨 Immediate Water/Hill Rescue</option>
                      <option value="medical">🏥 Urgent Medicine & Medical Aid</option>
                      <option value="food_water">🍞 Clean Water & Emergency Food</option>
                      <option value="shelter">🏕️ Emergency Shelter & Evacuation</option>
                      <option value="infant_elderly_care">🍼 Infant / Elderly Urgent Care</option>
                      <option value="other">⚠️ Other Essential Assistance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Urgency Level <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-red-500 text-slate-800"
                    >
                      <option value="immediate_rescue">CRITICAL: Life in immediate danger (&lt; 2h)</option>
                      <option value="urgent_12h">HIGH: Urgent supplies required (&lt; 12h)</option>
                      <option value="relief_24_48h">MEDIUM: Relief needed (24-48h)</option>
                    </select>
                  </div>
                </div>

                {/* 2. Location (State, District & GPS) */}
                <div className="border-t border-slate-200 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Location in North East India <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={gpsDetecting}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300"
                    >
                      <MapPin size={13} className="text-red-600" />
                      <span>{gpsDetecting ? 'Locating...' : 'Auto-Detect GPS'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-600 text-xs mb-1">State</label>
                      <select
                        value={formData.state}
                        onChange={handleStateChange}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        {NE_STATES.map(s => (
                          <option key={s.name} value={s.name}>{s.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-slate-600 text-xs mb-1">District</label>
                      <select
                        value={formData.district}
                        onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium"
                      >
                        {currentDistricts.map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs mb-1">
                      Detailed Landmark, House No., or Village <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Near Rongpur Shani Mandir, 2nd floor red building"
                      value={formData.location_details}
                      onChange={(e) => setFormData({ ...formData, location_details: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                </div>

                {/* 3. Contact Details */}
                <div className="border-t border-slate-200 pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Contact Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Your name or family lead"
                      value={formData.contact_name}
                      onChange={(e) => setFormData({ ...formData, contact_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Primary Mobile Number <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="10-digit phone number"
                      value={formData.primary_contact}
                      onChange={(e) => setFormData({ ...formData, primary_contact: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-800 mb-1">
                      Alternate Phone <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Relative / Neighbor"
                      value={formData.alternate_contact}
                      onChange={(e) => setFormData({ ...formData, alternate_contact: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                {/* 4. People Count & Vulnerabilities */}
                <div className="border-t border-slate-200 pt-3 space-y-2">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-800 mb-1">
                        Total Number of People Stranded
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="200"
                        value={formData.people_count}
                        onChange={(e) => setFormData({ ...formData, people_count: parseInt(e.target.value) || 1 })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300"
                      />
                    </div>

                    <div className="flex items-center gap-2 pt-5">
                      <input
                        type="checkbox"
                        id="hasVulnerable"
                        checked={formData.has_vulnerable_individuals}
                        onChange={(e) => setFormData({ ...formData, has_vulnerable_individuals: e.target.checked })}
                        className="w-4 h-4 rounded text-red-600 focus:ring-red-500 border-slate-300"
                      />
                      <label htmlFor="hasVulnerable" className="font-semibold text-slate-800 cursor-pointer">
                        Infants, Elderly, Pregnant or Sick people present
                      </label>
                    </div>
                  </div>

                  {formData.has_vulnerable_individuals && (
                    <div className="animate-in fade-in duration-150">
                      <label className="block text-slate-700 text-xs font-semibold mb-1">
                        Specific vulnerabilities & medical needs:
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1 bedridden asthma patient, 1 infant needing baby formula"
                        value={formData.vulnerable_details}
                        onChange={(e) => setFormData({ ...formData, vulnerable_details: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-amber-300 bg-amber-50 text-amber-950 focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  )}
                </div>

                {/* 5. Description */}
                <div className="border-t border-slate-200 pt-3">
                  <label className="block font-semibold text-slate-800 mb-1">
                    Situation Details & Needs
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Describe water height, road condition, battery status, or immediate medical emergencies..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-red-500"
                  />
                </div>

                {/* Action buttons */}
                <div className="border-t border-slate-200 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-[11px] text-slate-500">
                    A unique ticket ID will be generated upon submission.
                  </div>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Button variant="secondary" onClick={handleResetAndClose}>
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      variant="emergency" 
                      disabled={submitting}
                      className="flex-1 sm:flex-none"
                    >
                      {submitting ? 'Registering SOS...' : 'SUBMIT SOS REQUEST'}
                    </Button>
                  </div>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
