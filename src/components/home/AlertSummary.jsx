import React from 'react';
import { useApp } from '../../context/AppContext';
import { AlertTriangle, AlertCircle, PhoneCall, Shield, ChevronRight } from '../common/Icons';
import { SeverityBadge, DemoTag } from '../common/Badge';

export const AlertSummary = () => {
  const { alerts, setActivePage } = useApp();
  const activeAlerts = alerts.filter(a => a.is_active);

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Official Disaster Advisories & Bulletins
            </h3>
            <DemoTag />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Issued directly by State Disaster Authorities (ASDMA, SDMAs, CWC, IMD)
          </p>
        </div>

        <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full self-start sm:self-center">
          {activeAlerts.length} Active Bulletins
        </span>
      </div>

      {/* Alert Cards */}
      <div className="space-y-3">
        {activeAlerts.map(alert => (
          <div 
            key={alert.id}
            className={`p-4 rounded-xl border transition-all ${
              alert.severity === 'critical_red'
                ? 'bg-red-50/70 border-red-200 text-red-950'
                : 'bg-amber-50/70 border-amber-200 text-amber-950'
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <SeverityBadge severity={alert.severity} />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                    Source: {alert.source_agency}
                  </span>
                </div>

                <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                  {alert.title}
                </h4>

                <p className="text-xs text-slate-700 leading-relaxed">
                  {alert.description}
                </p>

                {alert.action_instructions && (
                  <div className="mt-2 p-2 rounded-lg bg-white/80 border border-slate-200 text-xs text-slate-800 font-medium">
                    <span className="font-bold text-red-700">Recommended Action: </span>
                    {alert.action_instructions}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
              <span>Districts: {alert.affected_districts.join(', ')}</span>
              <span className="font-mono text-[11px]">
                Valid until {new Date(alert.valid_until).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
