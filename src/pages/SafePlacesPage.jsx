import React from 'react';
import { ShelterDirectory } from '../components/shelters/ShelterDirectory';
import { DemoTag } from '../components/common/Badge';

export const SafePlacesPage = () => {
  return (
    <div className="space-y-4 pb-12">
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg sm:text-xl font-black text-slate-900">
              Verified Safe Places, Shelters & Hospitals
            </h2>
            <DemoTag />
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Designated government relief camps, high-ground elevated schools, and district civil hospitals across North East India.
          </p>
        </div>
      </div>

      <ShelterDirectory />
    </div>
  );
};
