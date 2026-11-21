import React from 'react';
import { DisasterMap } from '../components/map/DisasterMap';
import { useApp } from '../context/AppContext';
import { Plus, Shield, AlertTriangle } from '../components/common/Icons';
import { Button } from '../common/Button';
import { DemoTag } from '../components/common/Badge';

export const MapPage = () => {
  const { setIsHazardModalOpen, setIsEmergencyModalOpen, setActivePage } = useApp();

  return (
    <div className="space-y-4 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Interactive North East India Disaster Map
            </h2>
            <DemoTag />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time coordinates of flood inundation zones, hill landslides, road blocks, open relief camps and civil hospitals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="warning"
            icon={Plus}
            onClick={() => setIsHazardModalOpen(true)}
          >
            Report Hazard
          </Button>

          <Button
            size="sm"
            variant="emergency"
            icon={AlertTriangle}
            onClick={() => setIsEmergencyModalOpen(true)}
          >
            Emergency SOS
          </Button>
        </div>
      </div>

      {/* Main Map Component */}
      <DisasterMap />
    </div>
  );
};
