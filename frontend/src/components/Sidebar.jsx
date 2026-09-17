import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { 
  LayoutDashboard, 
  MessageSquare, 
  CalendarDays, 
  GanttChartSquare, 
  Users, 
  BrainCircuit, 
  ShieldAlert, 
  CheckCircle, 
  SplitSquareHorizontal,
  LineChart,
  History,
  LayoutTemplate,
  Bell,
  Download,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const activeClass = ({ isActive }) => 
    `flex items-center gap-sm px-4 py-2 my-1 rounded-md transition-colors ${isActive ? 'text-white bg-[var(--bg-card-hover)] font-medium border-l-2 border-indigo-500' : 'text-gray-400 hover:text-white hover:bg-[var(--bg-card-hover)]'}`;

  return (
    <div className="sidebar" style={{ borderRight: '1px solid var(--border-light)' }}>
      <div className="px-6 mb-6">
        <h1 className="heading-2 text-transparent bg-clip-text" style={{ backgroundImage: 'var(--gradient-brand)' }}>
          DIGITAL DYNOS
        </h1>
        <p className="text-small">Planning Intelligence</p>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Workspace</p>
        <NavLink to="/dashboard" className={activeClass}><LayoutDashboard size={18} /> Dashboard</NavLink>
        <NavLink to="/planner" className={activeClass}><MessageSquare size={18} /> AI Planner</NavLink>
        <NavLink to="/calendar" className={activeClass}><CalendarDays size={18} /> Calendar</NavLink>
        <NavLink to="/timeline" className={activeClass}><GanttChartSquare size={18} /> Timeline</NavLink>
        <NavLink to="/resources" className={activeClass}><Users size={18} /> Resources</NavLink>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Intelligence</p>
        <NavLink to="/memory" className={activeClass}><BrainCircuit size={18} /> Planning Memory</NavLink>
        <NavLink to="/constraints" className={activeClass}><ShieldAlert size={18} /> Constraints</NavLink>
        <NavLink to="/validation" className={activeClass}><CheckCircle size={18} /> Validation</NavLink>
        <NavLink to="/conflicts" className={activeClass}><SplitSquareHorizontal size={18} /> Conflicts</NavLink>
        <NavLink to="/whatif" className={activeClass}><SplitSquareHorizontal size={18} /> What-if Simulator</NavLink>
      </div>

      <div className="px-4 mb-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">Insights</p>
        <NavLink to="/analytics" className={activeClass}><LineChart size={18} /> Analytics</NavLink>
        <NavLink to="/history" className={activeClass}><History size={18} /> Plan History</NavLink>
        <NavLink to="/templates" className={activeClass}><LayoutTemplate size={18} /> Templates</NavLink>
      </div>

      <div className="px-4 mt-auto">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2 px-2">System</p>
        <NavLink to="/notifications" className={activeClass}><Bell size={18} /> Notifications</NavLink>
        <NavLink to="/export" className={activeClass}><Download size={18} /> Export Center</NavLink>
        <NavLink to="/settings" className={activeClass}><Settings size={18} /> Settings</NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
