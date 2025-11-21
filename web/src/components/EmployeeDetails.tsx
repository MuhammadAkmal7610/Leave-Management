 import React, { useState, useEffect } from 'react';
import { fetchAttendanceForEmployee, fetchLeavesForEmployee } from '../services/api';
import LeaveForm from './LeaveForm';

const EmployeeDetails: React.FC<{ employee: any | null }> = ({ employee }) => {
  const [tab, setTab] = useState<'general' | 'dept' | 'attendance' | 'timeoff'>('general');
  const [attendance, setAttendance] = useState<any[]>([]);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [showCreateLeave, setShowCreateLeave] = useState(false); // Modal state

  useEffect(() => {
    if (!employee) return;

    const load = async () => {
      if (tab === 'attendance') {
        const data = await fetchAttendanceForEmployee(employee._id || employee.id);
        setAttendance(data || []);
      }
      if (tab === 'timeoff') {
        const data = await fetchLeavesForEmployee(employee._id || employee.id);
        setLeaves(data || []);
      }
    };
    load();
  }, [tab, employee]);
 // console.log(employee,'employee');
   const handleLeaveSuccess = async () => {
    setShowCreateLeave(false);
    // Refresh the leaves list
    try {
      const updatedLeaves = await fetchLeavesForEmployee(employee._id || employee.id);
      setLeaves(updatedLeaves || []);
    } catch (err) {
      console.error('Failed to refresh leaves');
    }
  };

  // Handle cancel
  const handleLeaveCancel = () => {
    setShowCreateLeave(false);
  };
  if (!employee) {
    return (
      <div className="bg-white border rounded p-4 shadow">
        <div className="text-gray-500">Select an employee to view details</div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded p-4 shadow">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <img
          src={
            employee.avatarUrl ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              (employee.firstName || '') + ' ' + (employee.lastName || '')
            )}`
          }
          alt="avatar"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-lg">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="text-sm text-gray-500">
            {employee.position} • {employee.email}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-4">
        <nav className="flex gap-2">
          <button
            onClick={() => setTab('general')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              tab === 'general'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            General
          </button>
          <button
            onClick={() => setTab('dept')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              tab === 'dept'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Dept
          </button>
          <button
            onClick={() => setTab('attendance')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              tab === 'attendance'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Attendance
          </button>
          <button
            onClick={() => setTab('timeoff')}
            className={`px-3 py-1 rounded text-sm font-medium ${
              tab === 'timeoff'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Time off
          </button>
        </nav>
      </div>

      {/* Content */}
      <div>
        {tab === 'general' && (
          <div className="space-y-2 text-sm">
            <div>
              <strong>Date of joining:</strong>{' '}
              {employee.dateOfJoining
                ? new Date(employee.dateOfJoining).toLocaleDateString()
                : '—'}
            </div>
            <div>
              <strong>Email:</strong> {employee.email}
            </div>
            <div>
              <strong>Position:</strong> {employee.position || '—'}
            </div>
          </div>
        )}

        {tab === 'dept' && (
          <div className="space-y-2 text-sm">
            <div>
              <strong>Department:</strong> {employee.dept || '—'}
            </div>
            <div>
              <strong>Dept Type:</strong> {employee.deptType || '—'}
            </div>
          </div>
        )}

        {tab === 'attendance' && (
          <div>
            {attendance.length === 0 ? (
              <div className="text-sm text-gray-500">
                No attendance records found for this employee.
              </div>
            ) : (
              <ul className="space-y-2 text-sm">
                {attendance.map((a: any) => (
                  <li
                    key={a._id || `${a.employeeId}-${a.timestamp}`}
                    className="flex justify-between items-center py-1 border-b border-gray-100"
                  >
                    <span>{new Date(a.timestamp).toLocaleString()}</span>
                    <span
                      className={
                        a.type === 'in' || a.status === 'present'
                          ? 'text-green-600 font-medium'
                          : 'text-red-600 font-medium'
                      }
                    >
                      {a.type || a.status}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {tab === 'timeoff' && (
          <div>
            {/* Create Leave Button */}
            <div className="mb-4">
              <button
                onClick={() => setShowCreateLeave(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded text-sm transition"
              >
                + Create Leave Request
              </button>
            </div>

            {leaves.length === 0 ? (
              <div className="text-sm text-gray-500">
                No leave requests for this employee.
              </div>
            ) : (
              <ul className="space-y-3">
                {leaves.map((l: any) => (
                  <li key={l._id || l.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium text-gray-900">
                          {l.title || l.type || 'Leave Request'}
                        </div>
                        {l.reason && (
                          <div className="text-sm text-gray-600 mt-1">{l.reason}</div>
                        )}
                        {l.startDate && l.endDate && (
                          <div className="text-xs text-gray-500 mt-1">
                            {new Date(l.startDate).toLocaleDateString()} →{' '}
                            {new Date(l.endDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          l.status === 'approved'
                            ? 'bg-green-100 text-green-800'
                            : l.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {l.status || 'Pending'}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Simple Modal for Create Leave (Placeholder) */}
      {showCreateLeave && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">
              Create Leave Request for {employee.firstName} {employee.lastName}
            </h3>
            <div className="text-sm text-gray-600 mb-4">
              {<LeaveForm  employee={ employee} onSuccess={handleLeaveSuccess} onCancel={handleLeaveCancel} />}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetails;