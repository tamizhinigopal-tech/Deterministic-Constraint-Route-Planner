import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line, Legend } from 'recharts';

const data = [
  { name: 'Mon', efficiency: 94, conflicts: 2 },
  { name: 'Tue', efficiency: 88, conflicts: 5 },
  { name: 'Wed', efficiency: 96, conflicts: 1 },
  { name: 'Thu', efficiency: 91, conflicts: 3 },
  { name: 'Fri', efficiency: 97, conflicts: 0 },
];

const Analytics = () => {
  return (
    <div className="flex-col gap-lg h-full">
      <h1 className="heading-1 mb-6">Analytics</h1>
      
      <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
        
        <div className="card h-96">
          <h3 className="heading-3 mb-4">Planning Efficiency (%)</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)' }} 
                itemStyle={{ color: 'var(--text-primary)' }}
              />
              <Legend />
              <Line type="monotone" dataKey="efficiency" stroke="var(--accent-primary)" strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card h-96">
          <h3 className="heading-3 mb-4">Conflicts Detected & Resolved</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
              <XAxis dataKey="name" stroke="var(--text-secondary)" />
              <YAxis stroke="var(--text-secondary)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--bg-card)', border: '1px solid var(--border-light)' }} 
                cursor={{ fill: 'var(--bg-card-hover)' }}
              />
              <Legend />
              <Bar dataKey="conflicts" fill="var(--accent-tertiary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default Analytics;
