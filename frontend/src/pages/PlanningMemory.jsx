import React from 'react';

const PlanningMemory = () => {
  return (
    <div>
      <h1 className="heading-1 mb-6">Planning Memory</h1>
      <div className="card">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-light)]">
              <th className="p-4 text-small font-semibold">Key</th>
              <th className="p-4 text-small font-semibold">Value</th>
              <th className="p-4 text-small font-semibold">Type</th>
              <th className="p-4 text-small font-semibold">Confidence</th>
              <th className="p-4 text-small font-semibold">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)]">
              <td className="p-4">wake_time</td>
              <td className="p-4 text-indigo-400">06:00 AM</td>
              <td className="p-4">habit</td>
              <td className="p-4">98%</td>
              <td className="p-4"><span className="text-emerald-400 text-sm">Enabled</span></td>
            </tr>
            <tr className="border-b border-[var(--border-subtle)] hover:bg-[var(--bg-card-hover)]">
              <td className="p-4">exercise_duration</td>
              <td className="p-4 text-indigo-400">30 mins</td>
              <td className="p-4">habit</td>
              <td className="p-4">95%</td>
              <td className="p-4"><span className="text-emerald-400 text-sm">Enabled</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanningMemory;
