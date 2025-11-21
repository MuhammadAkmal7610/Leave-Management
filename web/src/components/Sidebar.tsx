import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const NavItem: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${isActive ? 'bg-white/10 text-white font-medium' : 'text-white/80 hover:bg-white/5'}`
    }
  >
    {children}
  </NavLink>
);

type SidebarProps = { onClose?: () => void };

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const onEmployees = location.pathname.startsWith('/employees');

  return (
    <aside className="w-72 min-h-screen bg-gradient-to-b from-teal-800 to-teal-900 text-white flex flex-col">
      <div className="p-5 border-b border-white/10 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white">LeaveMan</h2>
          <p className="text-xs text-teal-200/70">Leave & Attendance</p>
        </div>
        {onClose ? (
          <button onClick={onClose} aria-label="Close menu" className="p-2 rounded-md bg-white/10 hover:bg-white/20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        ) : (
          <img src="https://i.pravatar.cc/40?u=sidebar" alt="avatar" className="w-10 h-10 rounded-full border-2 border-white/20" />
        )}
      </div>

      <nav className="p-4 space-y-1 flex-1">
        <NavItem to="/dashboard">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
          <span>Dashboard</span>
        </NavItem>

        <NavItem to="/employees">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a4 4 0 100 8 4 4 0 000-8zM2 18a8 8 0 0116 0H2z" />
          </svg>
          <span>Employees</span>
        </NavItem>

        <NavItem to="/attendance">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 00-1-1H6zM7 8h6v2H7V8z" clipRule="evenodd" />
          </svg>
          <span>Attendance</span>
        </NavItem>

        <NavItem to="/reports">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M3 3h14v2H3V3zm0 4h10v2H3V7zm0 4h14v6H3v-6z" />
          </svg>
          <span>Reports</span>
        </NavItem>

        <div className="mt-6 px-4">
          {onEmployees ? (
            <NavLink to="/employees" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-md shadow-sm">
              Create Employee
            </NavLink>
          ) : (
            <NavLink to="/employees" className="inline-flex items-center gap-2 text-sm text-teal-100/90 hover:text-white">
              Manage Employees
            </NavLink>
          )}
        </div>

        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <img src="https://i.pravatar.cc/36?u=profile" alt="you" className="w-9 h-9 rounded-full border-white/10" />
            <div>
              <div className="text-sm font-medium">Demo Admin</div>
              <div className="text-xs text-teal-100/70">Administrator</div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
