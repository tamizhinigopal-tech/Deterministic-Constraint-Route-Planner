import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Dashboard from './pages/Dashboard';
import AIPlanner from './pages/AIPlanner';
import Calendar from './pages/Calendar';
import Timeline from './pages/Timeline';
import Resources from './pages/Resources';
import ValidationInspector from './pages/ValidationInspector';
import ConflictCenter from './pages/ConflictCenter';
import PlanningMemory from './pages/PlanningMemory';
import Analytics from './pages/Analytics';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="planner" element={<AIPlanner />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="resources" element={<Resources />} />
          
          <Route path="memory" element={<PlanningMemory />} />
          <Route path="validation" element={<ValidationInspector />} />
          <Route path="conflicts" element={<ConflictCenter />} />
          <Route path="analytics" element={<Analytics />} />
          
          <Route path="*" element={<div className="heading-2">Page under construction</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
