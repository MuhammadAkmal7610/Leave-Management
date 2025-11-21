import React, { useEffect, useState } from 'react';
import { fetchEmployees } from '../services/api';

const EmployeeList: React.FC<{ onSelect?: (emp: any) => void; selectedId?: string | number }> = ({ onSelect, selectedId }) => {
  const [employees, setEmployees] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (e) {
        // ignore, fallback handled in API
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <div className="p-4">Loading employees…</div>;

  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="text-lg font-medium mb-2">Employees</h3>
      {employees.length === 0 ? (
        <div className="text-gray-500">No employees yet</div>
      ) : (
        <ul>
          {employees.map((emp) => (
            <li key={emp._id || emp.id} onClick={() => onSelect && onSelect(emp)} className={`py-2 border-b last:border-b-0 flex justify-between cursor-pointer ${selectedId === (emp._id || emp.id) ? 'bg-blue-50' : ''}`}>
              <div>
                <div className="font-medium">{emp.firstName ? `${emp.firstName} ${emp.lastName}` : emp.name}</div>
                <div className="text-sm text-gray-500">{emp.position || emp.dept || ''} • {emp.email}</div>
              </div>
              <div className="text-sm text-gray-500">{emp.dateOfJoining ? new Date(emp.dateOfJoining).toLocaleDateString() : ''}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EmployeeList;
