import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchOfficialAlerts, 
  fetchHazardReports, 
  fetchEmergencyRequests, 
  fetchSafePlaces,
  submitHazardReport,
  confirmHazardReport,
  updateHazardStatus,
  submitEmergencyRequest,
  updateEmergencyRequestStatus,
  createOfficialAlert,
  isSupabaseConnected
} from '../lib/supabase.js';
import { localStore } from '../lib/storage.js';
import { TRANSLATIONS, LANGUAGES } from '../lib/translations.js';
import { speakText, stopSpeech } from '../components/common/AudioReader.jsx';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activePage, setActivePage] = useState('home');
  const [alerts, setAlerts] = useState([]);
  const [hazards, setHazards] = useState([]);
  const [safePlaces, setSafePlaces] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Language State
  const [language, setLanguageState] = useState(() => {
    try {
      return localStorage.getItem('aapdalink_lang') || 'en';
    } catch {
      return 'en';
    }
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    try {
      localStorage.setItem('aapdalink_lang', langCode);
    } catch {}
  };

  const t = (key) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en']?.[key] || key;
  };

  // UI States
  const [lowBandwidth, setLowBandwidthState] = useState(localStore.getLowBandwidth());
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isHazardModalOpen, setIsHazardModalOpen] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [lastSubmittedTicket, setLastSubmittedTicket] = useState(null);
  const [supabaseConnected, setSupabaseConnected] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Load all initial data
  const refreshData = async () => {
    setLoading(true);
    try {
      const [fetchedAlerts, fetchedHazards, fetchedSafePlaces, fetchedRequests] = await Promise.all([
        fetchOfficialAlerts(),
        fetchHazardReports(),
        fetchSafePlaces(),
        fetchEmergencyRequests()
      ]);

      setAlerts(fetchedAlerts);
      setHazards(fetchedHazards);
      setSafePlaces(fetchedSafePlaces);
      setRequests(fetchedRequests);

      const connected = await isSupabaseConnected();
      setSupabaseConnected(connected);
    } catch (err) {
      console.error('Error refreshing disaster platform data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const setLowBandwidth = (enabled) => {
    setLowBandwidthState(enabled);
    localStore.setLowBandwidth(enabled);
  };

  const notify = (msg, type = 'info') => {
    setStatusMessage({ message: msg, type });
    setTimeout(() => setStatusMessage(null), 5000);
  };

  // Voice Reader Broadcast
  const speakBroadcast = () => {
    const text = t('audioAnnounceIntro');
    speakText(text, language);
  };

  // Hazard actions
  const addHazardReport = async (hazardData) => {
    try {
      const newReport = await submitHazardReport(hazardData);
      setHazards(prev => [newReport, ...prev]);
      notify(`Hazard report ${newReport.report_code} submitted. Marked as unverified until reviewed.`, 'success');
      return newReport;
    } catch (e) {
      notify('Failed to submit report. Please retry or call emergency helpline.', 'error');
      throw e;
    }
  };

  const confirmHazard = async (id) => {
    try {
      const updatedList = await confirmHazardReport(id);
      setHazards(updatedList);
      notify('Thank you for confirming this community hazard report.', 'success');
    } catch (e) {
      console.error(e);
    }
  };

  const reviewHazardReport = async (id, status, notes = '') => {
    try {
      const updatedList = await updateHazardStatus(id, status, notes);
      setHazards(updatedList);
      notify(`Report status updated to ${status}.`, 'info');
    } catch (e) {
      console.error(e);
    }
  };

  // Emergency SOS actions
  const addEmergencyRequest = async (requestData) => {
    try {
      const newReq = await submitEmergencyRequest(requestData);
      setRequests(prev => [newReq, ...prev]);
      setLastSubmittedTicket(newReq);
      notify(`Emergency SOS Request ${newReq.ticket_id} created successfully.`, 'emergency');
      return newReq;
    } catch (e) {
      notify('Emergency submission error. PLEASE CALL 112 DIRECTLY.', 'error');
      throw e;
    }
  };

  const reviewEmergencyRequest = async (id, status, responder = null, notes = '') => {
    try {
      const updatedList = await updateEmergencyRequestStatus(id, status, responder, notes);
      setRequests(updatedList);
      notify(`Request status updated to ${status}.`, 'info');
    } catch (e) {
      console.error(e);
    }
  };

  // Official Alert creation
  const addOfficialAlert = async (alertData) => {
    try {
      const newAlert = await createOfficialAlert(alertData);
      setAlerts(prev => [newAlert, ...prev]);
      notify(`Official alert published: ${newAlert.title}`, 'warning');
      return newAlert;
    } catch (e) {
      console.error(e);
    }
  };

  const resetAllDemoData = () => {
    localStore.resetToDemo();
    refreshData();
    notify('Platform reset to realistic North East India sample data.', 'info');
  };

  return (
    <AppContext.Provider value={{
      activePage,
      setActivePage,
      language,
      setLanguage,
      t,
      LANGUAGES,
      speakBroadcast,
      stopSpeech,
      alerts,
      hazards,
      safePlaces,
      requests,
      loading,
      lowBandwidth,
      setLowBandwidth,
      isEmergencyModalOpen,
      setIsEmergencyModalOpen,
      isHazardModalOpen,
      setIsHazardModalOpen,
      selectedMarker,
      setSelectedMarker,
      lastSubmittedTicket,
      setLastSubmittedTicket,
      supabaseConnected,
      statusMessage,
      notify,
      refreshData,
      addHazardReport,
      confirmHazard,
      reviewHazardReport,
      addEmergencyRequest,
      reviewEmergencyRequest,
      addOfficialAlert,
      resetAllDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
