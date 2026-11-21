import React, { useState, useEffect } from 'react';
import { GO_BAG_ITEMS } from '../../lib/emergencyData.js';
import { localStore } from '../../lib/storage.js';
import { CheckSquare, Square, RefreshCw, CheckCircle2 } from '../common/Icons';

export const GoBagChecklist = () => {
  const [checkedItems, setCheckedItems] = useState(localStore.getGoBagState());

  useEffect(() => {
    localStore.saveGoBagState(checkedItems);
  }, [checkedItems]);

  const toggleItem = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset emergency kit checklist progress?')) {
      setCheckedItems({});
      localStore.saveGoBagState({});
    }
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = GO_BAG_ITEMS.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Group by category
  const categories = [...new Set(GO_BAG_ITEMS.map(i => i.category))];

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
      {/* Header & Progress */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Emergency "Go-Bag" Survival Kit Tracker
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Pack these essentials beforehand so you can evacuate in under 5 minutes.
            </p>
          </div>
          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
            title="Reset Checklist"
          >
            <RefreshCw size={15} />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">Preparedness Readiness</span>
            <span className="font-bold text-slate-900 font-mono">
              {completedCount} of {totalCount} Packed ({progressPercent}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden border border-slate-200">
            <div 
              className={`h-2.5 rounded-full transition-all duration-300 ${
                progressPercent === 100 ? 'bg-emerald-600' : progressPercent > 50 ? 'bg-amber-500' : 'bg-red-500'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Checklist items by category */}
      <div className="space-y-4 pt-2">
        {categories.map(cat => (
          <div key={cat} className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 px-1 border-b border-slate-100 pb-1">
              {cat}
            </div>
            <div className="space-y-1.5">
              {GO_BAG_ITEMS.filter(i => i.category === cat).map(item => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`flex items-start gap-3 p-2.5 rounded-lg border cursor-pointer select-none transition-colors ${
                      isChecked 
                        ? 'bg-emerald-50/70 border-emerald-300 text-slate-800' 
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/60 text-slate-700'
                    }`}
                  >
                    <button
                      type="button"
                      className={`flex-shrink-0 mt-0.5 ${isChecked ? 'text-emerald-700' : 'text-slate-400'}`}
                    >
                      {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                    </button>
                    <span className={`text-xs sm:text-sm font-medium ${isChecked ? 'line-through text-slate-500' : ''}`}>
                      {item.text}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {progressPercent === 100 && (
        <div className="p-3 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>Your Go-Bag is 100% prepared! Store it near your main exit door in a waterproof backpack.</span>
        </div>
      )}
    </div>
  );
};
