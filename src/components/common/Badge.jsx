import React from 'react';
import { AlertTriangle, CheckCircle2, Clock, AlertCircle } from './Icons';

export const SeverityBadge = ({ severity, className = '' }) => {
  const configs = {
    critical: {
      bg: 'bg-red-100 text-red-900 border-red-300',
      label: 'Critical Hazard',
      icon: AlertTriangle,
      iconClass: 'text-red-700'
    },
    critical_red: {
      bg: 'bg-red-600 text-white border-red-700 font-bold',
      label: 'RED WARNING',
      icon: AlertTriangle,
      iconClass: 'text-white'
    },
    warning_orange: {
      bg: 'bg-orange-500 text-white border-orange-600 font-bold',
      label: 'ORANGE ALERT',
      icon: AlertCircle,
      iconClass: 'text-white'
    },
    advisory_yellow: {
      bg: 'bg-amber-100 text-amber-900 border-amber-300 font-semibold',
      label: 'YELLOW WATCH',
      icon: AlertCircle,
      iconClass: 'text-amber-700'
    },
    high: {
      bg: 'bg-orange-100 text-orange-900 border-orange-300',
      label: 'High Urgency',
      icon: AlertCircle,
      iconClass: 'text-orange-700'
    },
    moderate: {
      bg: 'bg-amber-100 text-amber-900 border-amber-300',
      label: 'Moderate',
      icon: AlertCircle,
      iconClass: 'text-amber-700'
    },
    low: {
      bg: 'bg-slate-100 text-slate-800 border-slate-300',
      label: 'Low Impact',
      icon: null,
      iconClass: ''
    }
  };

  const conf = configs[severity] || configs.moderate;
  const IconComponent = conf.icon;

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${conf.bg} ${className}`}>
      {IconComponent && <IconComponent size={14} className={conf.iconClass} />}
      <span>{conf.label}</span>
    </span>
  );
};

export const VerificationBadge = ({ status, className = '' }) => {
  if (status === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300 ${className}`}>
        <CheckCircle2 size={13} className="text-emerald-700" />
        <span>Verified by Authorities</span>
      </span>
    );
  }

  if (status === 'unverified') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-300 ${className}`}>
        <Clock size={13} className="text-amber-600" />
        <span>Community Report (Pending Review)</span>
      </span>
    );
  }

  if (status === 'rejected') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-50 text-rose-800 border border-rose-300 ${className}`}>
        <span>Rejected / False Report</span>
      </span>
    );
  }

  if (status === 'resolved') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 ${className}`}>
        <span>Cleared / Resolved</span>
      </span>
    );
  }

  return null;
};

export const DemoTag = ({ className = '' }) => (
  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-slate-200 text-slate-700 border border-slate-300 ${className}`}>
    Demo Data
  </span>
);
