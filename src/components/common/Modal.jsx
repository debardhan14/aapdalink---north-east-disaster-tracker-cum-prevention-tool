import React, { useEffect } from 'react';
import { X } from './Icons';

export const Modal = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  maxWidth = 'max-w-xl',
  showClose = true
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="flex min-h-full items-end sm:items-center justify-center p-0 sm:p-4 text-center">
        {/* Modal Dialog Card */}
        <div 
          className={`relative transform overflow-hidden rounded-t-2xl sm:rounded-2xl bg-white text-left shadow-2xl transition-all w-full ${maxWidth} border border-slate-200 flex flex-col max-h-[92vh] sm:max-h-[85vh]`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between border-b border-slate-200 px-5 py-4 bg-slate-50">
            <div>
              <h3 className="text-lg font-bold text-slate-900 leading-6">{title}</h3>
              {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
            </div>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
                aria-label="Close dialog"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Scrollable Body */}
          <div className="p-5 overflow-y-auto flex-1">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
