// Simple mock data used as a fallback when backend is unavailable
export const mockLeaves = [
  { id: 1, user: 'alice', startDate: '2025-11-01', endDate: '2025-11-02', status: 'approved' },
  { id: 2, user: 'bob', startDate: '2025-10-20', endDate: '2025-10-22', status: 'pending' },
  { id: 3, user: 'carol', startDate: '2025-09-15', endDate: '2025-09-16', status: 'rejected' },
  { id: 4, user: 'alice', startDate: '2025-08-01', endDate: '2025-08-03', status: 'approved' },
  { id: 5, user: 'dan', startDate: '2025-11-10', endDate: '2025-11-11', status: 'approved' }
];

export const mockEmployees = [
  { id: 1, name: 'Alice', email: 'alice@example.com', position: 'Developer' },
  { id: 2, name: 'Bob', email: 'bob@example.com', position: 'Designer' },
  { id: 3, name: 'Carol', email: 'carol@example.com', position: 'PM' }
];

export const mockAttendance = [
  { employeeId: 1, date: '2025-11-17', status: 'present' },
  { employeeId: 2, date: '2025-11-17', status: 'absent' },
  { employeeId: 3, date: '2025-11-17', status: 'present' }
];
