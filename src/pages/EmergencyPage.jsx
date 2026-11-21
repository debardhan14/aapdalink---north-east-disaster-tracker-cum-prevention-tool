import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { EmergencyHelpModal } from '../components/emergency/EmergencyHelpModal';
import { 
  AlertTriangle, 
  Phone, 
  PhoneCall, 
  Clock, 
  Shield, 
  CheckCircle2, 
  MapPin, 
  Info,
  Users
} from '../components/common/Icons';
import { Button } from '../common/Button';
import { SeverityBadge, DemoTag } from '../components/common/Badge';

export const EmergencyPage = () => {
  const { requests, setIsEmergencyModalOpen, lastSubmittedTicket } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      {/* Alert Header */}
      <div className="bg-red-700 text-white rounded-2xl p-6 sm:p-8 shadow-emergency space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-800 text-red-200 text-xs font-bold border border-red-600">
            <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
            <span>EMERGENCY DISPATCH & ASSISTANCE DESK</span>
          </div>
          <DemoTag />
        </div>

        <div className="space-y-1">
          <h2 className="text-2xl sm:text-3xl font-black">
            North East Community Emergency Assistance
          </h2>
          <p className="text-xs sm:text-sm text-red-100 max-w-2xl leading-relaxed">
            Submit a rescue or relief supplies request. Your request is logged into our active disaster database and queued for community response teams and local volunteers.
          </p>
        </div>

        {/* Immediate Toll-Free Call Box */}
        <div className="bg-red-800/80 rounded-xl p-4 border border-red-600 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white text-red-700 flex items-center justify-center flex-shrink-0 font-bold shadow-md">
              <PhoneCall size={24} />
            </div>
            <div>
              <div className="text-sm font-extrabold text-white">Life-Threatening Emergency?</div>
              <div className="text-xs text-red-200">National Emergency Services (Toll-Free 24/7)</div>
            </div>
          </div>

          <a
            href="tel:112"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white text-red-700 hover:bg-red-50 font-black text-sm tracking-wide shadow-md active:scale-95 transition-transform"
          >
            <span>CALL 112 IMMEDIATELY</span>
          </a>
        </div>

        <div className="pt-2">
          <button
            onClick={() => setIsEmergencyModalOpen(true)}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-slate-900 hover:bg-slate-950 text-white font-extrabold text-base shadow-xl border border-slate-800 active:scale-98 transition-all"
          >
            <AlertTriangle size={20} className="text-red-500" />
            <span>OPEN EMERGENCY ASSISTANCE FORM (SOS)</span>
          </button>
        </div>
      </div>

      {/* Crucial Safety Protocol Card */}
      <div className="bg-amber-50 border border-amber-300 rounded-xl p-4 text-xs text-amber-950 space-y-2">
        <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
          <Info size={18} className="text-amber-700" />
          <span>Operational Disclosure & Safety Mandate</span>
        </div>
        <p className="leading-relaxed">
          Submitting this form records your rescue details in the AapdaLink volunteer triage ledger. <strong>AapdaLink does not claim automated delivery to armed forces or official government disaster dispatch unless physically connected.</strong> For critical medical evacuations or rising water levels, always attempt direct phone contact with <strong>112</strong>, <strong>1070 (SEOC)</strong>, or <strong>1077 (DEOC)</strong> first.
        </p>
      </div>

      {/* Recent Logged Requests Status */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Active Community Assistance Requests
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Live records monitored by district volunteers & relief workers
            </p>
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">
            {requests.length} Total Requests
          </span>
        </div>

        <div className="space-y-3">
          {requests.map(req => (
            <div 
              key={req.id}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs sm:text-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900">{req.ticket_id}</span>
                  <SeverityBadge severity={req.urgency === 'immediate_rescue' ? 'critical' : 'high'} />
                </div>
                <span className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                  req.status === 'dispatched' ? 'bg-blue-100 text-blue-800' :
                  req.status === 'acknowledged' ? 'bg-amber-100 text-amber-800' :
                  req.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  Status: {req.status}
                </span>
              </div>

              <p className="text-slate-800 font-medium">{req.description}</p>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1">
                <span className="flex items-center gap-1 font-semibold text-slate-700">
                  <MapPin size={13} className="text-red-600" />
                  {req.location_details} ({req.district})
                </span>
                <span className="flex items-center gap-1">
                  <Users size={13} />
                  {req.people_count} People
                </span>
                {req.assigned_responder && (
                  <span className="text-blue-700 font-bold bg-blue-50 px-2 py-0.5 rounded">
                    Assigned: {req.assigned_responder}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
