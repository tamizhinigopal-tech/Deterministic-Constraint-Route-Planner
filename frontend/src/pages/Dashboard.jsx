import React from 'react';

const Dashboard = () => {
  return (
    <div className="flex-col gap-lg h-full">
      <div className="mb-8">
        <h1 className="heading-1 mb-2">Turn requirements into optimized plans.</h1>
        <p className="text-secondary text-lg">DIGITAL DYNOS uses AI to convert natural language into strictly validated constraints and optimizes them with OR-Tools.</p>
      </div>
      
      <div className="card mb-8">
        <h2 className="heading-3 mb-4">What do you want to plan?</h2>
        <div className="flex gap-md">
          <input 
            type="text" 
            className="input-field" 
            placeholder="Plan my project for next week. I have 2 developers and 1 designer..." 
          />
          <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>Plan Now</button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-8" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        <div className="card">
          <p className="text-small mb-1">Active Plans</p>
          <p className="heading-2 text-indigo-400">12</p>
        </div>
        <div className="card">
          <p className="text-small mb-1">Tasks Optimized</p>
          <p className="heading-2 text-pink-400">348</p>
        </div>
        <div className="card">
          <p className="text-small mb-1">Planning Efficiency</p>
          <p className="heading-2 text-emerald-400">94%</p>
        </div>
        <div className="card">
          <p className="text-small mb-1">Conflicts Prevented</p>
          <p className="heading-2 text-amber-400">56</p>
        </div>
      </div>

      <div className="card mb-8">
        <h3 className="heading-3 mb-4">Intelligence Pipeline</h3>
        <div className="flex justify-between items-center text-sm text-center">
          <div className="p-4 glass-panel flex-1 mx-2">Interpret NL</div>
          <div>→</div>
          <div className="p-4 glass-panel flex-1 mx-2">Memory Retrieval</div>
          <div>→</div>
          <div className="p-4 glass-panel flex-1 mx-2 border-indigo-500 border">Dynamic Constraints</div>
          <div>→</div>
          <div className="p-4 glass-panel flex-1 mx-2">OR-Tools Optimization</div>
          <div>→</div>
          <div className="p-4 glass-panel flex-1 mx-2">Explainable Plan</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
