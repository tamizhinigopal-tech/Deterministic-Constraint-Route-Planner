import React, { useState } from 'react';
import { Users, Monitor, Box, Plus, Search } from 'lucide-react';

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const resources = [
    { id: 1, type: 'personnel', name: 'Alice Smith', role: 'Senior Developer', utilization: 85, status: 'Active' },
    { id: 2, type: 'personnel', name: 'Bob Jones', role: 'UI/UX Designer', utilization: 45, status: 'Active' },
    { id: 3, type: 'equipment', name: 'MacBook Pro 16"', tag: 'EQ-2023-01', location: 'Desk A', status: 'In Use' },
    { id: 4, type: 'equipment', name: 'Testing Server', tag: 'SRV-001', location: 'Server Room', status: 'Available' },
    { id: 5, type: 'room', name: 'Conference Room A', capacity: 12, equipment: 'Projector, Whiteboard', status: 'Booked' },
    { id: 6, type: 'room', name: 'Huddle Room B', capacity: 4, equipment: 'TV Screen', status: 'Available' },
  ];

  const getIcon = (type) => {
    switch(type) {
      case 'personnel': return <Users size={20} className="text-blue-500" />;
      case 'equipment': return <Monitor size={20} className="text-purple-500" />;
      case 'room': return <Box size={20} className="text-green-500" />;
      default: return null;
    }
  };

  const filteredResources = resources.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full gap-lg">
      <div className="flex justify-between items-center card">
        <div>
          <h2 className="heading-2">Resource Management</h2>
          <p className="mt-1 text-secondary">Manage personnel, equipment, and spaces for your tasks.</p>
        </div>
        <button className="btn-primary flex items-center gap-2">
          <Plus size={18} /> Add Resource
        </button>
      </div>

      <div className="card flex flex-col gap-4 flex-1">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={18} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              className="input-field w-full pl-10"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select className="input-field py-2">
              <option value="all">All Types</option>
              <option value="personnel">Personnel</option>
              <option value="equipment">Equipment</option>
              <option value="room">Rooms</option>
            </select>
            <select className="input-field py-2">
              <option value="all">All Statuses</option>
              <option value="available">Available</option>
              <option value="in_use">In Use / Booked</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredResources.map(resource => (
            <div key={resource.id} className="border border-[var(--border-light)] rounded-lg p-4 hover:shadow-md transition-shadow bg-[var(--bg-main)] relative overflow-hidden">
              <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-semibold rounded-bl-lg ${resource.status === 'Available' || resource.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                {resource.status}
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-[var(--accent-bg)] rounded-full">
                  {getIcon(resource.type)}
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{resource.name}</h3>
                  <p className="text-sm text-secondary capitalize">{resource.type}</p>
                </div>
              </div>
              
              <div className="text-sm space-y-2 text-secondary">
                {resource.type === 'personnel' && (
                  <>
                    <p><span className="font-medium text-[var(--text)]">Role:</span> {resource.role}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[var(--text)]">Utilization:</span> 
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500" style={{width: `${resource.utilization}%`}}></div>
                      </div>
                      <span>{resource.utilization}%</span>
                    </div>
                  </>
                )}
                {resource.type === 'equipment' && (
                  <>
                    <p><span className="font-medium text-[var(--text)]">Tag:</span> {resource.tag}</p>
                    <p><span className="font-medium text-[var(--text)]">Location:</span> {resource.location}</p>
                  </>
                )}
                {resource.type === 'room' && (
                  <>
                    <p><span className="font-medium text-[var(--text)]">Capacity:</span> {resource.capacity} people</p>
                    <p><span className="font-medium text-[var(--text)]">Equipment:</span> {resource.equipment}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Resources;
