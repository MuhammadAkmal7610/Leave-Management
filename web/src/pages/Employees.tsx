import React, { useState } from 'react';
import EmployeeList from '../components/EmployeeList';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeDetails from '../components/EmployeeDetails';

const EmployeesPage: React.FC = () => {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Employees</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4">
        <aside>
          <EmployeeList onSelect={(e) => setSelected(e)} selectedId={selected?._id || selected?.id} />
        </aside>

        <main>
          {selected ? (
            <EmployeeDetails employee={selected} />
          ) : (
            <EmployeeForm onCreated={(e) => setSelected(e)} />
          )}
        </main>
      </div>
    </div>
  );
};

export default EmployeesPage;
