// AAPDALINK Local Storage Persistence & Offline-First State Handler

import { INITIAL_ALERTS, INITIAL_HAZARDS, INITIAL_SAFE_PLACES, INITIAL_REQUESTS } from './emergencyData.js';

const STORAGE_KEYS = {
  ALERTS: 'aapdalink_alerts_v1',
  HAZARDS: 'aapdalink_hazards_v1',
  REQUESTS: 'aapdalink_requests_v1',
  SAFE_PLACES: 'aapdalink_safe_places_v1',
  GO_BAG: 'aapdalink_gobag_v1',
  SUPABASE_CONFIG: 'aapdalink_supabase_config_v1',
  LOW_BANDWIDTH: 'aapdalink_low_bandwidth_v1'
};

class LocalStorageService {
  constructor() {
    this.init();
  }

  init() {
    try {
      if (!localStorage.getItem(STORAGE_KEYS.ALERTS)) {
        localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.HAZARDS)) {
        localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(INITIAL_HAZARDS));
      }
      if (!localStorage.getItem(STORAGE_KEYS.SAFE_PLACES)) {
        localStorage.setItem(STORAGE_KEYS.SAFE_PLACES, JSON.stringify(INITIAL_SAFE_PLACES));
      }
      if (!localStorage.getItem(STORAGE_KEYS.REQUESTS)) {
        localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
      }
    } catch (e) {
      console.warn('LocalStorage error during init:', e);
    }
  }

  // ALERTS
  getAlerts() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ALERTS);
      return data ? JSON.parse(data) : INITIAL_ALERTS;
    } catch {
      return INITIAL_ALERTS;
    }
  }

  createAlert(newAlert) {
    const alerts = this.getAlerts();
    const created = {
      ...newAlert,
      id: `alt-${Date.now()}`,
      issued_at: new Date().toISOString(),
      is_active: true,
      is_demo: false
    };
    alerts.unshift(created);
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    return created;
  }

  toggleAlert(id) {
    const alerts = this.getAlerts().map(a => 
      a.id === id ? { ...a, is_active: !a.is_active } : a
    );
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(alerts));
    return alerts;
  }

  // HAZARD REPORTS
  getHazards() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.HAZARDS);
      return data ? JSON.parse(data) : INITIAL_HAZARDS;
    } catch {
      return INITIAL_HAZARDS;
    }
  }

  createHazard(report) {
    const hazards = this.getHazards();
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const created = {
      ...report,
      id: `haz-${Date.now()}`,
      report_code: `HZ-2026-${uniqueSuffix}`,
      status: 'unverified', // Always starts unverified for community review
      confirmations_count: 0,
      created_at: new Date().toISOString(),
      reviewed_by: null,
      reviewed_at: null,
      review_notes: null,
      is_demo: false
    };
    hazards.unshift(created);
    localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(hazards));
    return created;
  }

  updateHazardStatus(id, status, reviewedBy = 'Admin DEOC', notes = '') {
    const hazards = this.getHazards().map(h => {
      if (h.id === id) {
        return {
          ...h,
          status,
          reviewed_by: reviewedBy,
          reviewed_at: new Date().toISOString(),
          review_notes: notes || (status === 'verified' ? 'Verified by disaster authority' : 'Rejected or marked resolved')
        };
      }
      return h;
    });
    localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(hazards));
    return hazards;
  }

  confirmHazard(id) {
    const hazards = this.getHazards().map(h => {
      if (h.id === id) {
        return { ...h, confirmations_count: (h.confirmations_count || 0) + 1 };
      }
      return h;
    });
    localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(hazards));
    return hazards;
  }

  // EMERGENCY REQUESTS
  getRequests() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REQUESTS);
      return data ? JSON.parse(data) : INITIAL_REQUESTS;
    } catch {
      return INITIAL_REQUESTS;
    }
  }

  createRequest(request) {
    const requests = this.getRequests();
    const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
    const created = {
      ...request,
      id: `req-${Date.now()}`,
      ticket_id: `SOS-2026-${uniqueSuffix}`,
      status: 'pending',
      created_at: new Date().toISOString(),
      assigned_responder: null,
      response_notes: 'Logged to emergency dashboard. Local volunteer and response teams notified.',
      is_demo: false
    };
    requests.unshift(created);
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return created;
  }

  updateRequestStatus(id, status, responder = null, notes = '') {
    const requests = this.getRequests().map(r => {
      if (r.id === id) {
        return {
          ...r,
          status,
          assigned_responder: responder || r.assigned_responder,
          response_notes: notes || r.response_notes,
          updated_at: new Date().toISOString()
        };
      }
      return r;
    });
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(requests));
    return requests;
  }

  // SAFE PLACES
  getSafePlaces() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.SAFE_PLACES);
      return data ? JSON.parse(data) : INITIAL_SAFE_PLACES;
    } catch {
      return INITIAL_SAFE_PLACES;
    }
  }

  createSafePlace(place) {
    const places = this.getSafePlaces();
    const created = {
      ...place,
      id: `safe-${Date.now()}`,
      created_at: new Date().toISOString(),
      is_verified: true,
      is_demo: false
    };
    places.unshift(created);
    localStorage.setItem(STORAGE_KEYS.SAFE_PLACES, JSON.stringify(places));
    return created;
  }

  // GO BAG CHECKLIST
  getGoBagState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.GO_BAG);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  }

  saveGoBagState(state) {
    try {
      localStorage.setItem(STORAGE_KEYS.GO_BAG, JSON.stringify(state));
    } catch (e) {
      console.error(e);
    }
  }

  // LOW-BANDWIDTH MODE
  getLowBandwidth() {
    try {
      return localStorage.getItem(STORAGE_KEYS.LOW_BANDWIDTH) === 'true';
    } catch {
      return false;
    }
  }

  setLowBandwidth(enabled) {
    try {
      localStorage.setItem(STORAGE_KEYS.LOW_BANDWIDTH, enabled ? 'true' : 'false');
    } catch (e) {
      console.error(e);
    }
  }

  // SUPABASE CONFIGURATION
  getSupabaseConfig() {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SUPABASE_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      url: import.meta.env?.VITE_SUPABASE_URL || '',
      anonKey: import.meta.env?.VITE_SUPABASE_ANON_KEY || '',
      isConnected: false
    };
  }

  saveSupabaseConfig(config) {
    try {
      localStorage.setItem(STORAGE_KEYS.SUPABASE_CONFIG, JSON.stringify(config));
    } catch (e) {
      console.error(e);
    }
  }

  resetToDemo() {
    localStorage.setItem(STORAGE_KEYS.ALERTS, JSON.stringify(INITIAL_ALERTS));
    localStorage.setItem(STORAGE_KEYS.HAZARDS, JSON.stringify(INITIAL_HAZARDS));
    localStorage.setItem(STORAGE_KEYS.SAFE_PLACES, JSON.stringify(INITIAL_SAFE_PLACES));
    localStorage.setItem(STORAGE_KEYS.REQUESTS, JSON.stringify(INITIAL_REQUESTS));
  }
}

export const localStore = new LocalStorageService();
