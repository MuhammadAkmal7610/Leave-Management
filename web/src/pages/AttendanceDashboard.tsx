import React, { useEffect, useState } from 'react';
import { fetchAttendance, fetchEmployees } from '../services/api';

const AttendanceDashboard: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  const [attendance, setAttendance] = useState<Array<any>>([]);
  const [employees, setEmployees] = useState<Array<any>>([]);
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const load = async () => {
      const [att, emps] = await Promise.all([fetchAttendance(today), fetchEmployees()]);
      setAttendance(att);
      setEmployees(emps);
    };
    load();
  }, []);

  const present = attendance.filter((a) => a.status === 'present').length;
  const absent = attendance.filter((a) => a.status === 'absent').length;

  if (compact) {
    return (
      <div className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="h-20 p-3 bg-green-50 rounded flex flex-col justify-center">
            <div className="text-sm text-gray-600">Present</div>
            <div className="text-2xl font-semibold">{present}</div>
          </div>
          <div className="h-20 p-3 bg-red-50 rounded flex flex-col justify-center">
            <div className="text-sm text-gray-600">Absent</div>
            <div className="text-2xl font-semibold">{absent}</div>
          </div>
        </div>

        <div className="max-h-40 overflow-auto">
          <h4 className="font-medium mb-2">Roster</h4>
          <ul>
            {employees.map((e) => {
              const empId = e._id || e.id;
              const att = attendance.find((a) => a.employeeId === empId || a.employeeId === String(empId));
              const fullName = e.firstName ? `${e.firstName} ${e.lastName || ''}`.trim() : (e.name || `${e.firstName || ''}`);
              return (
                <li key={empId} className="py-2 border-b last:border-b-0 flex justify-between">
                  <div className="truncate">{fullName || 'Unknown'}</div>
                  <div className={`text-sm ${att?.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>{att?.status || 'unknown'}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="text-lg font-medium mb-2">Attendance — {today}</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-3 bg-green-50 rounded">
          <div className="text-sm text-gray-600">Present</div>
          <div className="text-2xl font-semibold">{present}</div>
        </div>
        <div className="p-3 bg-red-50 rounded">
          <div className="text-sm text-gray-600">Absent</div>
          <div className="text-2xl font-semibold">{absent}</div>
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-medium">Roster</h4>
        <div className="max-h-56 overflow-auto">
          <ul>
            {employees.map((e) => {
              const att = attendance.find((a) => a.employeeId === e.id);
              return (
                <li key={e.id} className="py-2 border-b last:border-b-0 flex justify-between">
                  <div>{e.name}</div>
                  <div className={`text-sm ${att?.status === 'present' ? 'text-green-600' : 'text-red-600'}`}>{att?.status || 'unknown'}</div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AttendanceDashboard;
