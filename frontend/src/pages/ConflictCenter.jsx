import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Info, RefreshCw, XCircle } from 'lucide-react';

const ConflictCenter = () => {
  const [resolving, setResolving] = useState(null);

  const conflicts = [
    {
      id: 'c1',
      severity: 'high',
      title: 'Time Overlap',
      description: 'Task "AI Study" and "Project Meeting" are scheduled at the same time.',
      suggestion: 'Move "Project Meeting" to 03:00 PM.'
    },
    {
      id: 'c2',
      severity: 'medium',
      title: 'Resource Unavailable',
      description: 'Room "Conference A" is booked by another team during your proposed time.',
      suggestion: 'Book "Conference B" instead.'
    },
    {
      id: 'c3',
      severity: 'low',
      title: 'Preference Violation',
      description: 'Task "Gym Workout" is scheduled for 08:00 AM, but preference is 06:00 AM.',
      suggestion: 'Reschedule to 06:00 AM based on user memory.'
    }
  ];

  const handleResolve = (id) => {
    setResolving(id);
    setTimeout(() => {
      setResolving(null);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full gap-lg">
      <div className="card">
        <h2 className="heading-2 flex items-center gap-2"><AlertTriangle className="text-amber-500" /> Conflict Resolution Center</h2>
        <p className="mt-2 text-secondary">Review and resolve scheduling constraints and resource conflicts.</p>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-4">
        {conflicts.map(conflict => (
          <div key={conflict.id} className="card border-l-4" style={{ 
            borderLeftColor: conflict.severity === 'high' ? 'var(--error, #ef4444)' : 
                           conflict.severity === 'medium' ? 'var(--warning, #f59e0b)' : 
                           'var(--info, #3b82f6)'
          }}>
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2">
                  {conflict.severity === 'high' && <XCircle size={18} className="text-red-500" />}
                  {conflict.severity === 'medium' && <AlertTriangle size={18} className="text-amber-500" />}
                  {conflict.severity === 'low' && <Info size={18} className="text-blue-500" />}
                  <h3 className="heading-3">{conflict.title}</h3>
                </div>
                <p className="mt-2">{conflict.description}</p>
                <div className="mt-4 bg-[var(--bg-main)] p-3 rounded border border-[var(--border-light)]">
                  <strong className="text-sm">AI Suggestion:</strong> {conflict.suggestion}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <button 
                  className="btn-primary flex items-center gap-2 whitespace-nowrap"
                  onClick={() => handleResolve(conflict.id)}
                  disabled={resolving === conflict.id}
                >
                  {resolving === conflict.id ? <RefreshCw size={16} className="animate-spin" /> : <CheckCircle size={16} />}
                  {resolving === conflict.id ? 'Resolving...' : 'Auto-Resolve'}
                </button>
                <button className="btn-secondary text-sm">Manual Edit</button>
              </div>
            </div>
          </div>
        ))}
        
        {conflicts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-secondary">
            <CheckCircle size={48} className="text-green-500 mb-4 opacity-50" />
            <p className="heading-3">No conflicts detected</p>
            <p>Your schedule is perfectly balanced.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConflictCenter;
