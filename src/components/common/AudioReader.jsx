import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from '../../lib/translations.js';

export const speakText = (text, langCode = 'en') => {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    alert('Voice Audio is not supported on this browser.');
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.92; // Slightly measured rate for emergency clarity
  utterance.pitch = 1.0;

  // Language voice matching
  const voiceMap = {
    hi: 'hi-IN',
    bn: 'bn-IN',
    as: 'bn-IN', // Bengali voice sounds closest to Assamese if Assamese voice is missing
    en: 'en-IN',
    kha: 'en-IN',
    nag: 'en-IN'
  };

  utterance.lang = voiceMap[langCode] || 'en-IN';

  // Attempt to pick a natural regional voice if available in system
  const voices = window.speechSynthesis.getVoices();
  const matchedVoice = voices.find(v => v.lang.startsWith(utterance.lang.slice(0, 2)));
  if (matchedVoice) {
    utterance.voice = matchedVoice;
  }

  window.speechSynthesis.speak(utterance);
  return utterance;
};

export const stopSpeech = () => {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
};

export const AudioReaderButton = ({ text, lang = 'en', label = '', className = '', size = 'md' }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleToggle = (e) => {
    e.stopPropagation();
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      const utterance = speakText(text, lang);
      if (utterance) {
        setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      stopSpeech();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center gap-1.5 rounded-lg font-bold transition-all ${
        isSpeaking 
          ? 'bg-red-600 text-white animate-pulse shadow-emergency ring-2 ring-red-400' 
          : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700'
      } ${size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-xs'} ${className}`}
      title={isSpeaking ? 'Stop Audio' : 'Listen with Audio Voice Assist'}
      aria-label={isSpeaking ? 'Stop voice reading' : 'Read aloud with audio speech'}
    >
      <span className="text-sm">{isSpeaking ? '⏹️' : '🔊'}</span>
      <span>{isSpeaking ? (TRANSLATIONS[lang]?.stopAudio || 'Stop') : (label || TRANSLATIONS[lang]?.listenAlerts || 'Listen')}</span>
      {isSpeaking && (
        <span className="flex gap-0.5 items-end h-3 ml-1">
          <span className="w-1 bg-white h-2 animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-1 bg-white h-3 animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-1 bg-white h-1.5 animate-bounce" style={{ animationDelay: '300ms' }} />
        </span>
      )}
    </button>
  );
};
