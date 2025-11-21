import React, { useState } from 'react';
import { createEmployee } from '../services/api';

const EmployeeForm: React.FC<{ onCreated?: (emp: any) => void }> = ({ onCreated }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [dept, setDept] = useState('');
  const [deptType, setDeptType] = useState('');
  const [dateOfJoining, setDateOfJoining] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [creating, setCreating] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const payload = { firstName, lastName, email, position, dept, deptType, dateOfJoining, avatarUrl };
      const res = await createEmployee(payload);
      setMessage(`Created employee ${res.firstName} ${res.lastName}`);
      setFirstName(''); setLastName(''); setEmail(''); setPosition(''); setDept(''); setDeptType(''); setDateOfJoining(''); setAvatarUrl('');
      onCreated && onCreated(res);
    } catch (err) {
      setMessage('Failed to create employee');
    } finally {
      setCreating(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  return (
    <div className="bg-white border rounded p-4 shadow">
      <h3 className="text-lg font-medium mb-2">Add Employee</h3>
      <form onSubmit={submit} className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" className="w-full border rounded p-2" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" className="w-full border rounded p-2" />
        </div>
        <div>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border rounded p-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" className="w-full border rounded p-2" />
          <input value={dateOfJoining} type="date" onChange={(e) => setDateOfJoining(e.target.value)} placeholder="Date of joining" className="w-full border rounded p-2" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" className="w-full border rounded p-2" />
          <input value={deptType} onChange={(e) => setDeptType(e.target.value)} placeholder="Dept type" className="w-full border rounded p-2" />
        </div>
        <div>
          <input value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} placeholder="Avatar URL (optional)" className="w-full border rounded p-2" />
        </div>
        <div>
          <button type="submit" disabled={creating} className="bg-blue-600 text-white px-3 py-1 rounded">
            {creating ? 'Creating…' : 'Create'}
          </button>
        </div>
        {message && <div className="text-sm text-green-600">{message}</div>}
      </form>
    </div>
  );
};

export default EmployeeForm;
