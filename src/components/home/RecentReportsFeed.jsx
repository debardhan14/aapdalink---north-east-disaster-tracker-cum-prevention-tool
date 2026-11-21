import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { NE_STATES } from '../../lib/emergencyData.js';
import { 
  Plus, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Share2, 
  Filter,
  Camera
} from '../common/Icons';
import { SeverityBadge, VerificationBadge, DemoTag } from '../common/Badge';
import { Button } from '../common/Button';

export const RecentReportsFeed = () => {
  const { hazards, confirmHazard, setIsHazardModalOpen, setActivePage, setSelectedMarker } = useApp();
  const [selectedState, setSelectedState] = useState('All');

  const filtered = hazards.filter(h => selectedState === 'All' || h.state === selectedState);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Community Disaster & Hazard Reports
            </h3>
            <DemoTag />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time crowdsourced reports from North East residents. Reports are unverified until reviewed.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold bg-white"
          >
            <option value="All">All NE States</option>
            {NE_STATES.map(s => (
              <option key={s.name} value={s.name}>{s.name}</option>
            ))}
          </select>

          <Button
            size="sm"
            variant="warning"
            icon={Plus}
            onClick={() => setIsHazardModalOpen(true)}
          >
            Report Hazard
          </Button>
        </div>
      </div>

      {/* Feed List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="p-8 text-center text-slate-400 text-xs">
            No community reports found for the selected state.
          </div>
        ) : (
          filtered.map(report => (
            <div 
              key={report.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-colors bg-white space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-slate-700">{report.report_code}</span>
                  <SeverityBadge severity={report.severity} />
                  <VerificationBadge status={report.status} />
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  {new Date(report.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {report.district}, {report.state}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {report.image_url && (
                  <div className="w-full sm:w-28 h-20 rounded-lg overflow-hidden border border-slate-200 flex-shrink-0 bg-slate-100">
                    <img 
                      src={report.image_url} 
                      alt="Incident scene" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                )}
                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{report.title}</h4>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{report.description}</p>
                  
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 pt-1">
                    <MapPin size={13} className="text-red-600 flex-shrink-0" />
                    <span className="font-medium text-slate-700">{report.location_name}</span>
                  </div>
                </div>
              </div>

              {/* Bottom confirmation & Map actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-slate-500">
                  {report.reporter_name ? `Reported by ${report.reporter_name}` : 'Reported by local resident'}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => confirmHazard(report.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition-colors"
                    title="Confirm this hazard report"
                  >
                    <span>Confirm This ({report.confirmations_count || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedMarker(report);
                      setActivePage('map');
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-colors"
                  >
                    <span>View Map</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
