import React from 'react';
import { ShieldCheck, ShieldAlert, ListChecks, CheckSquare } from 'lucide-react';

const ValidationInspector = () => {
  const constraintGroups = [
    {
      name: 'Temporal Constraints',
      status: 'passed',
      rules: [
        { id: 'T1', description: 'No overlapping tasks for a single resource', passed: true },
        { id: 'T2', description: 'Dependencies are scheduled sequentially', passed: true },
        { id: 'T3', description: 'Tasks fit within available time windows', passed: true },
      ]
    },
    {
      name: 'Resource Constraints',
      status: 'failed',
      rules: [
        { id: 'R1', description: 'Required skills match assigned personnel', passed: true },
        { id: 'R2', description: 'Equipment is not double-booked', passed: false, error: 'MacBook Pro 16" double booked at 14:00' },
        { id: 'R3', description: 'Room capacity exceeds participant count', passed: true },
      ]
    },
    {
      name: 'Preference Constraints (Soft)',
      status: 'warning',
      rules: [
        { id: 'P1', description: 'Morning routines start before 8 AM', passed: false, error: 'User prefers 6 AM, scheduled at 8 AM' },
        { id: 'P2', description: 'Focus time scheduled during peak energy hours', passed: true },
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full gap-lg">
      <div className="card">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-amber-500" size={28} />
          <div>
            <h2 className="heading-2">Validation Inspector</h2>
            <p className="mt-1 text-secondary">Real-time constraint checking and validation status of the current plan.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
        {/* Overall Score */}
        <div className="card flex flex-col items-center justify-center text-center">
          <div className="relative mb-6">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle cx="80" cy="80" r="70" stroke="var(--border-light)" strokeWidth="10" fill="none" />
              <circle cx="80" cy="80" r="70" stroke="var(--accent)" strokeWidth="10" fill="none" strokeDasharray="440" strokeDashoffset="44" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-bold text-[var(--accent)]">90%</span>
            </div>
          </div>
          <h3 className="heading-3">Overall Plan Validity</h3>
          <p className="text-secondary mt-2">2 constraints violated out of 20 total active rules.</p>
          <button className="btn-primary mt-6 w-full">Re-run Validation</button>
        </div>

        {/* Constraint Details */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {constraintGroups.map((group, idx) => (
            <div key={idx} className="card p-0 overflow-hidden">
              <div className={`p-4 border-b border-[var(--border-light)] flex justify-between items-center bg-[var(--bg-main)] ${
                group.status === 'passed' ? 'border-l-4 border-l-green-500' :
                group.status === 'failed' ? 'border-l-4 border-l-red-500' :
                'border-l-4 border-l-amber-500'
              }`}>
                <h3 className="font-semibold flex items-center gap-2">
                  <ListChecks size={18} /> {group.name}
                </h3>
                <span className={`text-sm px-2 py-1 rounded-full ${
                  group.status === 'passed' ? 'bg-green-100 text-green-700' :
                  group.status === 'failed' ? 'bg-red-100 text-red-700' :
                  'bg-amber-100 text-amber-700'
                }`}>
                  {group.status.toUpperCase()}
                </span>
              </div>
              <div className="p-4 flex flex-col gap-3">
                {group.rules.map(rule => (
                  <div key={rule.id} className="flex gap-3">
                    <div className="mt-0.5">
                      {rule.passed ? 
                        <CheckSquare size={18} className="text-green-500" /> : 
                        <ShieldAlert size={18} className={group.status === 'warning' ? "text-amber-500" : "text-red-500"} />
                      }
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <span className="font-medium text-sm">{rule.id} - {rule.description}</span>
                      </div>
                      {!rule.passed && (
                        <div className={`text-sm mt-1 p-2 rounded bg-opacity-10 border ${
                          group.status === 'warning' ? 'bg-amber-500 border-amber-200 text-amber-700' : 'bg-red-500 border-red-200 text-red-700'
                        }`}>
                          Failure Reason: {rule.error}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ValidationInspector;
