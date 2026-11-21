import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NE_STATES } from '../../lib/emergencyData.js';
import { localStore } from '../../lib/storage.js';
import { 
  Settings, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Phone, 
  MapPin, 
  Users, 
  Clock, 
  Plus, 
  RefreshCw,
  Shield,
  FileText
} from '../common/Icons';
import { SeverityBadge, VerificationBadge, DemoTag } from '../common/Badge';
import { Button } from '../common/Button';

export const AdminDashboard = () => {
  const { 
    hazards, 
    requests, 
    alerts, 
    safePlaces, 
    reviewHazardReport, 
    reviewEmergencyRequest, 
    addOfficialAlert, 
    refreshData,
    resetAllDemoData,
    supabaseConnected 
  } = useApp();

  const [activeTab, setActiveTab] = useState('requests'); // 'requests' | 'reports' | 'alerts' | 'database'
  
  // New alert form state
  const [newAlertForm, setNewAlertForm] = useState({
    title: '',
    description: '',
    severity: 'critical_red',
    source_agency: 'ASDMA Control Centre',
    affected_states: ['Assam'],
    affected_districts: ['Kamrup Metro', 'Cachar'],
    action_instructions: ''
  });

  // Supabase manual config state
  const [dbConfig, setDbConfig] = useState(localStore.getSupabaseConfig());
  const [savedConfigMsg, setSavedConfigMsg] = useState('');

  // Triage stats
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const criticalRequests = requests.filter(r => r.urgency === 'immediate_rescue');
  const unverifiedHazards = hazards.filter(h => h.status === 'unverified');

  const handleCreateAlert = async (e) => {
    e.preventDefault();
    if (!newAlertForm.title || !newAlertForm.description) return;
    await addOfficialAlert(newAlertForm);
    setNewAlertForm({
      title: '',
      description: '',
      severity: 'critical_red',
      source_agency: 'ASDMA Control Centre',
      affected_states: ['Assam'],
      affected_districts: ['Kamrup Metro', 'Cachar'],
      action_instructions: ''
    });
    alert('Official bulletin published successfully to banner and feed!');
  };

  const handleSaveDbConfig = (e) => {
    e.preventDefault();
    localStore.saveSupabaseConfig(dbConfig);
    setSavedConfigMsg('Configuration saved! Re-testing connection...');
    refreshData();
    setTimeout(() => setSavedConfigMsg(''), 4000);
  };

  return (
    <div className="space-y-6">
      {/* Admin Top Header & Stats */}
      <div className="bg-slate-900 text-white p-5 rounded-2xl border border-slate-800 shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
              <Settings size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold">Emergency Operations & Triage Centre</h2>
                <DemoTag />
              </div>
              <p className="text-xs text-slate-400">
                District Emergency Operations Centre (DEOC) & Field Responder Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700"
            >
              <RefreshCw size={13} />
              <span>Refresh</span>
            </button>
            <button
              onClick={resetAllDemoData}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 text-xs font-semibold"
            >
              <span>Reset Demo State</span>
            </button>
          </div>
        </div>

        {/* Metric Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-red-400 uppercase tracking-wider">Critical Rescues</div>
            <div className="text-2xl font-black text-white mt-1 font-mono">{criticalRequests.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{pendingRequests.length} Pending Triage</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Unverified Hazards</div>
            <div className="text-2xl font-black text-white mt-1 font-mono">{unverifiedHazards.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">{hazards.length} Total Reports</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Safe Shelters</div>
            <div className="text-2xl font-black text-white mt-1 font-mono">{safePlaces.length}</div>
            <div className="text-[10px] text-slate-400 mt-0.5">Verified Camps & Hospitals</div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-xl border border-slate-700/60">
            <div className="text-[11px] font-bold text-blue-400 uppercase tracking-wider">Backend Mode</div>
            <div className="text-sm font-bold text-white mt-2 flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span>{supabaseConnected ? 'Live Supabase' : 'Offline / Local'}</span>
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">Dual-Resilient Engine</div>
          </div>
        </div>
      </div>

      {/* Admin Tab Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'requests' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Emergency Requests</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-red-600 text-white font-mono">
            {requests.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'reports' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Hazard Verifications</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-slate-900 font-mono">
            {unverifiedHazards.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('alerts')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'alerts' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Broadcast Alerts</span>
          <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 text-slate-700 font-mono">
            {alerts.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('database')}
          className={`px-4 py-2.5 rounded-lg text-xs sm:text-sm font-bold whitespace-nowrap transition-colors flex items-center gap-2 ${
            activeTab === 'database' 
              ? 'bg-slate-900 text-white' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <span>Database & Supabase API</span>
        </button>
      </div>

      {/* TAB 1: EMERGENCY REQUESTS TRIAGE */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Manage incoming SOS calls, dispatch SDRF/108 units, and update rescue status.</span>
            <span>Sorted by urgency & timestamp</span>
          </div>

          <div className="space-y-3">
            {requests.map(req => {
              const isCritical = req.urgency === 'immediate_rescue';
              return (
                <div 
                  key={req.id}
                  className={`bg-white rounded-xl border p-4 sm:p-5 shadow-sm space-y-3 ${
                    isCritical ? 'border-red-300 ring-1 ring-red-200' : 'border-slate-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-sm text-slate-900">{req.ticket_id}</span>
                      <SeverityBadge severity={req.urgency === 'immediate_rescue' ? 'critical' : 'high'} />
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                        {req.category.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-slate-500">Status:</span>
                      <span className={`px-2 py-0.5 rounded font-bold uppercase text-[11px] ${
                        req.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                        req.status === 'acknowledged' ? 'bg-amber-100 text-amber-800' :
                        req.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {req.status}
                      </span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-1.5 text-xs sm:text-sm">
                    <p className="font-medium text-slate-800">{req.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-xs text-slate-600 pt-1">
                      <div className="flex items-center gap-1 font-semibold text-slate-800">
                        <MapPin size={13} className="text-red-600" />
                        <span>{req.location_details} ({req.district}, {req.state})</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <Users size={13} className="text-slate-500" />
                        <span>{req.people_count} People</span>
                        {req.has_vulnerable_individuals && (
                          <span className="text-red-700 font-bold bg-red-50 px-1.5 py-0.2 rounded border border-red-200">
                            ⚠️ {req.vulnerable_details}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 font-mono font-bold text-slate-900">
                        <Phone size={13} className="text-emerald-600" />
                        <a href={`tel:${req.primary_contact}`} className="underline">
                          {req.primary_contact}
                        </a>
                        {req.contact_name && <span className="font-sans font-normal text-slate-500">({req.contact_name})</span>}
                      </div>
                    </div>

                    {req.assigned_responder && (
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900 font-medium">
                        Dispatched Unit: <strong>{req.assigned_responder}</strong> — {req.response_notes}
                      </div>
                    )}
                  </div>

                  {/* Triage Action Controls */}
                  <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                    <div className="text-[11px] text-slate-400">
                      Logged {new Date(req.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => reviewEmergencyRequest(req.id, 'acknowledged', 'DEOC Coordinator', 'Acknowledged. Verifying route.')}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-100 text-xs font-semibold text-slate-700"
                      >
                        Acknowledge
                      </button>
                      <button
                        onClick={() => reviewEmergencyRequest(req.id, 'dispatched', 'SDRF Rapid Unit', 'Rescue boat en route.')}
                        className="px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-semibold text-white shadow-sm"
                      >
                        Dispatch SDRF
                      </button>
                      <button
                        onClick={() => reviewEmergencyRequest(req.id, 'resolved', req.assigned_responder, 'Family safely evacuated.')}
                        className="px-2.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-xs font-semibold text-white shadow-sm"
                      >
                        Mark Rescued
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HAZARD VERIFICATION */}
      {activeTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500 px-1">
            <span>Inspect citizen-submitted reports and mark as official verified alerts or false reports.</span>
          </div>

          <div className="space-y-3">
            {hazards.map(haz => (
              <div key={haz.id} className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-slate-800">{haz.report_code}</span>
                    <span className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider bg-orange-100 text-orange-900">
                      {haz.hazard_type.replace('_', ' ')}
                    </span>
                    <VerificationBadge status={haz.status} />
                  </div>
                  <span className="text-xs text-slate-500">{haz.district}, {haz.state}</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {haz.image_url && (
                    <img 
                      src={haz.image_url} 
                      alt="Hazard snapshot" 
                      className="w-full sm:w-36 h-24 object-cover rounded-lg border border-slate-200 flex-shrink-0"
                    />
                  )}
                  <div className="space-y-1 text-xs sm:text-sm flex-1">
                    <h4 className="font-bold text-slate-900">{haz.title}</h4>
                    <p className="text-slate-600 leading-relaxed">{haz.description}</p>
                    <p className="text-xs text-slate-500 pt-1">
                      📍 Location: <strong className="text-slate-800">{haz.location_name}</strong> • Community Confirmations: <strong>{haz.confirmations_count}</strong>
                    </p>
                  </div>
                </div>

                {/* Verification Actions */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => reviewHazardReport(haz.id, 'rejected', 'Marked as false/duplicate by Circle Officer')}
                    className="px-3 py-1.5 rounded-lg border border-rose-300 text-rose-700 hover:bg-rose-50 text-xs font-semibold"
                  >
                    Reject / Duplicate
                  </button>
                  <button
                    onClick={() => reviewHazardReport(haz.id, 'resolved', 'Cleared by PWD road crews')}
                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 text-xs font-semibold"
                  >
                    Mark Cleared
                  </button>
                  <button
                    onClick={() => reviewHazardReport(haz.id, 'verified', 'Ground-checked and confirmed by DEOC')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm"
                  >
                    Verify Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: OFFICIAL ALERT BROADCASTER */}
      {activeTab === 'alerts' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Create Alert Form */}
          <div className="lg:col-span-1 bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Broadcast Official Warning</h3>
              <p className="text-xs text-slate-500 mt-0.5">Issues live banner to all citizens & map</p>
            </div>

            <form onSubmit={handleCreateAlert} className="space-y-3 text-xs sm:text-sm">
              <div>
                <label className="block font-bold text-slate-800 mb-1">Warning Severity</label>
                <select
                  value={newAlertForm.severity}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, severity: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                >
                  <option value="critical_red">🔴 RED WARNING (Severe Life Hazard)</option>
                  <option value="warning_orange">🟠 ORANGE ALERT (High Danger / Halt Trucks)</option>
                  <option value="advisory_yellow">🟡 YELLOW WATCH (Caution Recommended)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Source Authority</label>
                <input
                  type="text"
                  value={newAlertForm.source_agency}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, source_agency: e.target.value })}
                  placeholder="e.g. ASDMA & IMD Shillong"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Alert Headline</label>
                <input
                  type="text"
                  value={newAlertForm.title}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, title: e.target.value })}
                  placeholder="e.g. Inundation Surge in Dhubri Wards"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 font-medium"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Bulletin Summary</label>
                <textarea
                  rows="3"
                  value={newAlertForm.description}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, description: e.target.value })}
                  placeholder="Water heights, breached points, and impacted highways..."
                  required
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-800 mb-1">Public Action Instructions</label>
                <textarea
                  rows="2"
                  value={newAlertForm.action_instructions}
                  onChange={(e) => setNewAlertForm({ ...newAlertForm, action_instructions: e.target.value })}
                  placeholder="e.g. Move domestic animals to dykes. Dial 1070 for boat."
                  className="w-full px-3 py-2 rounded-lg border border-slate-300"
                />
              </div>

              <Button type="submit" variant="emergency" fullWidth>
                PUBLISH OFFICIAL WARNING
              </Button>
            </form>
          </div>

          {/* Active Alerts List */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-sm font-bold text-slate-700 px-1">Currently Active Bulletins</h3>
            {alerts.map(alt => (
              <div key={alt.id} className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                  <SeverityBadge severity={alt.severity} />
                  <span className="text-xs font-semibold text-slate-500 font-mono">
                    Issued: {new Date(alt.issued_at || alt.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900">{alt.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Agency: {alt.source_agency}</p>
                  <p className="text-xs sm:text-sm text-slate-700 mt-2 leading-relaxed">{alt.description}</p>
                </div>
                {alt.action_instructions && (
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <strong>Mandatory Action:</strong> {alt.action_instructions}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: DATABASE & SUPABASE API */}
      {activeTab === 'database' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 max-w-2xl">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Supabase Connection & Database Settings</h3>
            <p className="text-xs text-slate-500 mt-1">
              Connect to your live Supabase project to synchronize community hazard reports, emergency SOS calls, and shelter data in real-time.
            </p>
          </div>

          {savedConfigMsg && (
            <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold">
              {savedConfigMsg}
            </div>
          )}

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700">Database Engine Status:</span>
              <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                supabaseConnected ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-slate-200 text-slate-700'
              }`}>
                {supabaseConnected ? 'Connected (Live PostgreSQL)' : 'Offline Local Storage (Active)'}
              </span>
            </div>
            <p className="text-slate-500">
              When disconnected, AapdaLink transparently caches all data in the client browser with complete offline resilience, so first responders in low-connectivity valleys never lose tickets.
            </p>
          </div>

          <form onSubmit={handleSaveDbConfig} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-bold text-slate-800 mb-1">Supabase Project URL</label>
              <input
                type="url"
                placeholder="https://xyzcompany.supabase.co"
                value={dbConfig.url}
                onChange={(e) => setDbConfig({ ...dbConfig, url: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-800 mb-1">Supabase Anonymous Public Key</label>
              <input
                type="text"
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                value={dbConfig.anonKey}
                onChange={(e) => setDbConfig({ ...dbConfig, anonKey: e.target.value })}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono text-xs"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <Button type="submit" variant="primary">
                Save & Connect Supabase
              </Button>
              <span className="text-xs text-slate-400">
                Schema: <code className="text-slate-700">supabase/schema.sql</code>
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
