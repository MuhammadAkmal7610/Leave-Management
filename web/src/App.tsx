import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import ReportsPage from './pages/Reports';
import Login from './pages/Login';
import LeaveForm from './components/LeaveForm';
import LeaveList from './components/LeaveList';
import ChatBoard from './components/ChatBoard';
import ExportButton from './components/ExportButton';
import Sidebar from './components/Sidebar';
import EmployeesPage from './pages/Employees';
import AttendanceDashboard from './pages/AttendanceDashboard';

const App: React.FC = () => {
  const Layout: React.FC = () => {
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    // Show the Login page full-screen at /login only; default root lands on Dashboard
    if (location.pathname === '/login') return <Login />;

    return (
      <div className="flex">
        {/* sidebar (always visible on layout) */}
        <div className="block">
          <Sidebar />
        </div>

        {/* mobile overlay sidebar */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute left-0 top-0 bottom-0 w-64">
              <Sidebar onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}

        <main className="flex-1 px-4 sm:px-6 md:px-8 py-6 bg-gray-50 min-h-screen">
          {/* mobile top bar */}
          <div className="md:hidden mb-4">
            <div className="flex items-center justify-between bg-white rounded-lg shadow-sm p-3">
              <button
                aria-label="Open menu"
                onClick={() => setMobileOpen(true)}
                className="p-2 rounded-md bg-gray-100"
              >
                <svg className="w-5 h-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="text-lg font-semibold">LeaveMan</div>
              <div style={{ width: 32 }} />
            </div>
          </div>

          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<EmployeesPage />} />
            <Route path="/attendance" element={<AttendanceDashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/leave-form" element={<LeaveForm />} />
            <Route path="/leave-list" element={<LeaveList />} />
            <Route path="/chat" element={<ChatBoard />} />
            <Route path="/export" element={<ExportButton />} />
          </Routes>
        </main>
      </div>
    );
  };

  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;