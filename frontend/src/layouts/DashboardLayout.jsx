import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="app-container flex bg-[var(--bg-main)] text-white h-screen">
      <Sidebar />
      <div className="main-content flex-1 overflow-auto bg-[var(--bg-main)] p-8">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
