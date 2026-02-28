import React from 'react';
import Sidebar from '../common/Sidebar';
import Navbar from '../common/Navbar';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex min-vh-100">
      <Sidebar />
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Navbar />
        <main className="p-4">
          <div className="container-fluid">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
