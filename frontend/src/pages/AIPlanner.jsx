import React, { useState } from 'react';
import { Send, BrainCircuit, Check, X } from 'lucide-react';

const AIPlanner = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! What do you want to plan today?' }
  ]);
  const [input, setInput] = useState('');
  const [memories, setMemories] = useState([]);
  
  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages([...messages, { role: 'user', content: input }]);
    
    // Simulate API call for interpreting
    setTimeout(() => {
      if (input.toLowerCase().includes('wake up') && input.toLowerCase().includes('6 am')) {
         setMemories([{ key: 'wake_time', value: '06:00', type: 'preference' }]);
         setMessages(prev => [...prev, { 
           role: 'assistant', 
           content: 'I noticed a routine. Would you like me to remember this?',
           type: 'memory_prompt'
         }]);
      } else {
         setMessages(prev => [...prev, { 
           role: 'assistant', 
           content: 'I have interpreted your request and extracted the constraints. Optimizing plan now...'
         }]);
      }
    }, 1000);
    
    setInput('');
  };

  return (
    <div className="flex h-full gap-lg">
      <div className="flex-1 flex flex-col card p-0 overflow-hidden">
        <div className="p-4 border-b border-[var(--border-light)]">
          <h2 className="heading-3 flex items-center gap-2"><BrainCircuit /> AI Planner</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {messages.map((m, idx) => (
            <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-4 rounded-lg max-w-[80%] ${m.role === 'user' ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-main)] border border-[var(--border-light)]'}`}>
                {m.content}
                
                {m.type === 'memory_prompt' && memories.length > 0 && (
                  <div className="mt-4 bg-[var(--bg-card)] border border-[var(--border-subtle)] p-3 rounded-md">
                    <p className="text-small mb-2 font-semibold">Potential Memory Detected:</p>
                    <div className="flex justify-between items-center mb-3">
                      <span>Wake time → 06:00 AM</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="flex-1 btn-primary text-sm flex justify-center items-center gap-1" onClick={() => setMemories([])}><Check size={14} /> Save</button>
                      <button className="flex-1 btn-secondary text-sm flex justify-center items-center gap-1" onClick={() => setMemories([])}><X size={14} /> Ignore</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-[var(--border-light)] bg-[var(--bg-main)]">
          <div className="flex gap-2">
            <input 
              type="text"
              className="input-field flex-1"
              placeholder="e.g. Plan my morning with 2 hours of AI study..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <button className="btn-primary flex items-center justify-center p-3" onClick={handleSend}>
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="w-1/3 flex flex-col gap-4">
        <div className="card flex-1">
          <h3 className="heading-3 mb-4">Extracted Constraints</h3>
          <div className="text-small text-secondary text-center mt-10">No constraints extracted yet.</div>
        </div>
        <div className="card flex-1">
          <h3 className="heading-3 mb-4">Generated Plan</h3>
          <div className="text-small text-secondary text-center mt-10">Waiting for requirements...</div>
        </div>
      </div>
    </div>
  );
};

export default AIPlanner;
