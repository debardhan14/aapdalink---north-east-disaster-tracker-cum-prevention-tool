// Supabase Backend Integration & Resilient Fallback Layer
import { localStore } from './storage.js';

let supabaseClient = null;

// Dynamically or safely initialize Supabase client
export const getSupabaseClient = async () => {
  if (supabaseClient) return supabaseClient;

  const config = localStore.getSupabaseConfig();
  const url = config.url || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL);
  const anonKey = config.anonKey || (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY);

  if (!url || !anonKey || url === 'https://your-project.supabase.co') {
    return null;
  }

  try {
    const { createClient } = await import('@supabase/supabase-js');
    supabaseClient = createClient(url, anonKey);
    return supabaseClient;
  } catch (err) {
    console.warn('Could not initialize Supabase SDK, using local offline storage:', err);
    return null;
  }
};

// Check if currently connected to live Supabase
export const isSupabaseConnected = async () => {
  const client = await getSupabaseClient();
  if (!client) return false;
  try {
    const { data, error } = await client.from('official_alerts').select('id').limit(1);
    return !error;
  } catch {
    return false;
  }
};

// --- DATA ACCESS LAYER ---

// 1. Official Alerts
export const fetchOfficialAlerts = async () => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('official_alerts')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetchOfficialAlerts error, using local fallback:', e);
    }
  }
  return localStore.getAlerts();
};

export const createOfficialAlert = async (alertData) => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('official_alerts')
        .insert([{
          ...alertData,
          is_active: true,
          is_demo: false
        }])
        .select()
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase insert alert error:', e);
    }
  }
  return localStore.createAlert(alertData);
};

// 2. Hazard Reports
export const fetchHazardReports = async () => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('hazard_reports')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetchHazardReports error, using local fallback:', e);
    }
  }
  return localStore.getHazards();
};

export const submitHazardReport = async (reportData) => {
  const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
  const reportCode = `HZ-2026-${uniqueSuffix}`;

  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('hazard_reports')
        .insert([{
          ...reportData,
          report_code: reportCode,
          status: 'unverified',
          confirmations_count: 0
        }])
        .select()
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase submitHazardReport error, falling back to local storage:', e);
    }
  }
  return localStore.createHazard(reportData);
};

export const confirmHazardReport = async (hazardId) => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      // Direct RPC or query update
      const { data: current } = await client.from('hazard_reports').select('confirmations_count').eq('id', hazardId).single();
      if (current) {
        await client.from('hazard_reports').update({ confirmations_count: (current.confirmations_count || 0) + 1 }).eq('id', hazardId);
      }
    } catch (e) {
      console.warn('Supabase confirmHazard error:', e);
    }
  }
  return localStore.confirmHazard(hazardId);
};

export const updateHazardStatus = async (hazardId, status, notes = '') => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      await client.from('hazard_reports').update({
        status,
        reviewed_by: 'Authorized Emergency Controller',
        reviewed_at: new Date().toISOString(),
        review_notes: notes
      }).eq('id', hazardId);
    } catch (e) {
      console.warn('Supabase updateHazardStatus error:', e);
    }
  }
  return localStore.updateHazardStatus(hazardId, status, 'Authorized Emergency Controller', notes);
};

// 3. Emergency SOS & Relief Requests
export const fetchEmergencyRequests = async () => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('emergency_requests')
        .select('*')
        .order('created_at', { ascending: false });
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetchEmergencyRequests error, using local fallback:', e);
    }
  }
  return localStore.getRequests();
};

export const submitEmergencyRequest = async (requestData) => {
  const uniqueSuffix = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `SOS-2026-${uniqueSuffix}`;

  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('emergency_requests')
        .insert([{
          ...requestData,
          ticket_id: ticketId,
          status: 'pending'
        }])
        .select()
        .single();
      if (!error && data) return data;
    } catch (e) {
      console.warn('Supabase submitEmergencyRequest error, falling back to local:', e);
    }
  }
  return localStore.createRequest(requestData);
};

export const updateEmergencyRequestStatus = async (requestId, status, responder = null, notes = '') => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      await client.from('emergency_requests').update({
        status,
        assigned_responder: responder,
        response_notes: notes,
        updated_at: new Date().toISOString()
      }).eq('id', requestId);
    } catch (e) {
      console.warn('Supabase updateEmergencyRequestStatus error:', e);
    }
  }
  return localStore.updateRequestStatus(requestId, status, responder, notes);
};

// 4. Safe Places & Shelters
export const fetchSafePlaces = async () => {
  const client = await getSupabaseClient();
  if (client) {
    try {
      const { data, error } = await client
        .from('safe_places')
        .select('*')
        .order('name');
      if (!error && data && data.length > 0) return data;
    } catch (e) {
      console.warn('Supabase fetchSafePlaces error, using local fallback:', e);
    }
  }
  return localStore.getSafePlaces();
};
