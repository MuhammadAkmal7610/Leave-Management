import React, { useState } from 'react';
import { createLeave } from '../services/api';

interface LeaveFormProps {
  employee: { id: string; firstName: string; lastName: string };
  onSuccess?: () => void;
  onCancel?: () => void;
}

const LeaveForm: React.FC<LeaveFormProps> = ({ employee, onSuccess, onCancel }) => {
  const [leaveType, setLeaveType] = useState('annual');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isHalfDay, setIsHalfDay] = useState(false);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const leaveTypes = [
    { value: 'annual', label: 'Annual Leave' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'casual', label: 'Casual Leave' },
    { value: 'maternity', label: 'Maternity/Paternity Leave' },
    { value: 'unpaid', label: 'Unpaid Leave' },
    { value: 'compassionate', label: 'Compassionate Leave' },
  ];

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    await createLeave({
      employeeId: employee._id || employee.id,
      leaveType,
      startDate,
      endDate,
      reason: reason.trim() || undefined,
      isHalfDay,
    });

    onSuccess?.(); // This will now trigger reliably
  } catch (err: any) {
    // This only runs in production if API fails
    setError(err.response?.data?.message || 'Failed to submit request.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Request Time Off
        </h2>
        

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Leave Type
            </label>
            <select
              value={leaveType}
              onChange={(e) => setLeaveType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              required
            >
              {leaveTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                min={startDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="halfDay"
              checked={isHalfDay}
              onChange={(e) => setIsHalfDay(e.target.checked)}
              className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <label htmlFor="halfDay" className="ml-2 text-sm text-gray-700">
              Half-day leave {startDate && `(on ${new Date(startDate).toLocaleDateString()})`}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason <span className="text-gray-400">(optional)</span>
            </label>
            <textarea
              rows={4}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="e.g., Family event, medical appointment..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-5 py-3 border border-elective border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-50 font-medium transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !startDate || !endDate}
              className={`flex-1 px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition ${
                loading || !startDate || !endDate ? 'opacity-60 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" opacity="0.3" />
                    <path fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Request'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveForm;