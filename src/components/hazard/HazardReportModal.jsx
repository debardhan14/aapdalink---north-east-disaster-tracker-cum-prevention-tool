import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NE_STATES } from '../../lib/emergencyData.js';
import { 
  Plus, 
  MapPin, 
  Upload, 
  Camera, 
  X, 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  Info 
} from '../common/Icons';
import { Button } from '../common/Button';

export const HazardReportModal = ({ isOpen, onClose }) => {
  const { addHazardReport } = useApp();

  const [formData, setFormData] = useState({
    hazard_type: 'flood',
    title: '',
    description: '',
    state: 'Assam',
    district: 'Cachar',
    location_name: '',
    latitude: 24.8170,
    longitude: 92.8005,
    severity: 'high',
    reporter_name: '',
    reporter_contact: '',
    image_url: null
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [gpsDetecting, setGpsDetecting] = useState(false);
  const [submittedReport, setSubmittedReport] = useState(null);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit. Please upload a compressed photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData(prev => ({ ...prev, image_url: reader.result }));
      };
      reader.readAsDataURL(file);
    }
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
          location_name: prev.location_name || `GPS: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`
        }));
        setGpsDetecting(false);
      },
      (err) => {
        console.warn('GPS error:', err);
        setGpsDetecting(false);
        alert('Could not detect GPS. Please pick State & District manually.');
      },
      { timeout: 8000 }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.title.trim() || formData.title.length < 5) {
      setErrorMsg('Please enter a brief, descriptive hazard title.');
      return;
    }

    if (!formData.location_name.trim() || formData.location_name.length < 4) {
      setErrorMsg('Please specify the location, landmark, or highway kilometre.');
      return;
    }

    setSubmitting(true);
    try {
      const created = await addHazardReport(formData);
      setSubmittedReport(created);
    } catch (err) {
      setErrorMsg('Failed to submit hazard report. Please check connection.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmittedReport(null);
    setImagePreview(null);
    setFormData({
      hazard_type: 'flood',
      title: '',
      description: '',
      state: 'Assam',
      district: 'Cachar',
      location_name: '',
      latitude: 24.8170,
      longitude: 92.8005,
      severity: 'high',
      reporter_name: '',
      reporter_contact: '',
      image_url: null
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div 
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={handleResetAndClose}
      />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
        <div 
          className="relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-2xl transition-all w-full max-w-xl border border-slate-200 flex flex-col max-h-[94vh] sm:max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
                <Plus size={18} />
              </div>
              <div>
                <h3 className="text-lg font-bold leading-none">Report Disaster or Hazard</h3>
                <p className="text-xs text-slate-400 mt-1">Crowdsourced Community Early Warning</p>
              </div>
            </div>
            <button
              onClick={handleResetAndClose}
              className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Verification Notice Banner */}
          <div className="bg-amber-50 border-b border-amber-200 p-3 text-xs text-amber-950 flex items-start gap-2">
            <Clock size={16} className="text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Public Verification Notice:</span>
              <p className="mt-0.5 text-amber-900">
                All submitted community reports are marked as <strong>"Unverified (Pending Review)"</strong> on the map and feed until inspected by disaster authorities or district moderators.
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-5 overflow-y-auto flex-1">
            {submittedReport ? (
              // SUBMISSION SUCCESS CONFIRMATION
              <div className="py-6 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center border-2 border-emerald-300">
                  <CheckCircle2 size={36} />
                </div>

                <div>
                  <h4 className="text-xl font-bold text-slate-900">Report Submitted</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Thank you for keeping your North East community informed and safe.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-sm mx-auto space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500 font-semibold uppercase">Report Code</span>
                    <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      Unverified
                    </span>
                  </div>
                  <div className="text-lg font-mono font-bold text-slate-900">{submittedReport.report_code}</div>
                  <p className="text-xs text-slate-700 font-medium">{submittedReport.title}</p>
                  <p className="text-[11px] text-slate-500">
                    Location: {submittedReport.location_name} ({submittedReport.district})
                  </p>
                </div>

                <div className="pt-2">
                  <Button variant="primary" fullWidth onClick={handleResetAndClose}>
                    Done & View on Disaster Map
                  </Button>
                </div>
              </div>
            ) : (
              // HAZARD REPORT FORM
              <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                
                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-100 border border-red-300 text-red-900 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                {/* 1. Hazard Type & Severity */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Hazard Category <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.hazard_type}
                      onChange={(e) => setFormData({ ...formData, hazard_type: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-slate-800"
                    >
                      <option value="flood">🌊 River Flood / Embankment Breach</option>
                      <option value="landslide">⛰️ Landslide / Rockfall</option>
                      <option value="road_block">🚧 Highway / Road Blockage</option>
                      <option value="bridge_damage">🌉 Bridge Damage / Culvert Washout</option>
                      <option value="waterlogging">🌧️ Urban Flash Waterlogging</option>
                      <option value="fallen_tree_powerline">⚡ Fallen Tree / Power Lines</option>
                      <option value="other">⚠️ Other Severe Obstruction</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-800 mb-1">
                      Observed Severity <span className="text-red-600">*</span>
                    </label>
                    <select
                      value={formData.severity}
                      onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-lg border border-slate-300 bg-white font-medium focus:ring-2 focus:ring-slate-800"
                    >
                      <option value="critical">Critical (Impassable / Threat to life)</option>
                      <option value="high">High (Severe delays / Partial closure)</option>
                      <option value="moderate">Moderate (Proceed with caution)</option>
                      <option value="low">Low (Minor puddle / Small debris)</option>
                    </select>
                  </div>
                </div>

                {/* 2. Hazard Title */}
                <div>
                  <label className="block font-bold text-slate-800 mb-1">
                    Short Hazard Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Mudslide blocking Sonapur Tunnel on NH-06"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-800 font-medium"
                  />
                </div>

                {/* 3. Location */}
                <div className="border-t border-slate-200 pt-3 space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-800">
                      Geographic Location <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={detectLocation}
                      disabled={gpsDetecting}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold border border-slate-300"
                    >
                      <MapPin size={13} className="text-red-600" />
                      <span>{gpsDetecting ? 'Locating...' : 'Use Current GPS'}</span>
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
                      Exact Location or Highway Milestone <span className="text-red-600">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. NH-29 near Dzüdza river bridge Km 48"
                      value={formData.location_name}
                      onChange={(e) => setFormData({ ...formData, location_name: e.target.value })}
                      required
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-800"
                    />
                  </div>
                </div>

                {/* 4. Description */}
                <div>
                  <label className="block font-semibold text-slate-800 mb-1">
                    Description & Observations
                  </label>
                  <textarea
                    rows="3"
                    placeholder="Details about water depth, whether 2-wheelers/cars can pass, ongoing rain..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-800"
                  />
                </div>

                {/* 5. Image Upload */}
                <div className="border-t border-slate-200 pt-3">
                  <label className="block font-bold text-slate-800 mb-1">
                    Photo Evidence <span className="text-slate-400 font-normal">(Optional but recommended)</span>
                  </label>

                  {imagePreview ? (
                    <div className="relative rounded-lg overflow-hidden border border-slate-300 max-h-48 w-full bg-slate-100 flex items-center justify-center">
                      <img src={imagePreview} alt="Hazard preview" className="object-cover max-h-48 w-full" />
                      <button
                        type="button"
                        onClick={() => { setImagePreview(null); setFormData(p => ({ ...p, image_url: null })); }}
                        className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-slate-900"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 mb-2">
                        <Camera size={20} />
                      </div>
                      <span className="text-xs font-semibold text-slate-700">Tap to upload photo or take picture</span>
                      <span className="text-[11px] text-slate-400 mt-0.5">JPG, PNG (max 5MB)</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>

                {/* 6. Reporter Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-200 pt-3">
                  <div>
                    <label className="block text-slate-600 text-xs mb-1">
                      Your Name <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Emlang Rymbai"
                      value={formData.reporter_name}
                      onChange={(e) => setFormData({ ...formData, reporter_name: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 text-xs mb-1">
                      Contact for Verification <span className="text-slate-400 font-normal">(Optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="Phone number"
                      value={formData.reporter_contact}
                      onChange={(e) => setFormData({ ...formData, reporter_contact: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono"
                    />
                  </div>
                </div>

                {/* Action buttons */}
                <div className="border-t border-slate-200 pt-4 flex items-center justify-end gap-2">
                  <Button variant="secondary" onClick={handleResetAndClose}>
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    variant="warning" 
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting Report...' : 'SUBMIT HAZARD REPORT'}
                  </Button>
                </div>

              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
