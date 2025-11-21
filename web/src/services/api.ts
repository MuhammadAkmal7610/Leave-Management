import axios from 'axios';
import { mockLeaves, mockEmployees, mockAttendance } from './mockData';

const apiClient = axios.create({
    baseURL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const api = apiClient;

// Auth API calls
export const login = async (credentials: any) => {
    const response = await apiClient.post('/api/auth/login', credentials);
    return response.data;
};

export const register = async (userData: any) => {
    const response = await apiClient.post('/api/auth/register', userData);
    return response.data;
};

// Leave API calls
export const fetchLeaves = async () => {
    try {
        const response = await apiClient.get('/api/leaves');
        return response.data;
    } catch (err) {
        return mockLeaves;
    }
};

export const createLeave = async (leaveData: any) => {
  let result;
  try {
    const response = await apiClient.post('/api/leaves', leaveData);
    result = response.data;
  } catch (err) {
     
      console.warn('Mocking leave creation');
      result = {
        _id: `mock-${Date.now()}`,
        ...leaveData,
        status: 'pending',
        createdAt: new Date(),
      };
      mockLeaves.push(result);
    }  
  return result; // Always returns resolved value
};

// Employees endpoints (with mock fallback)
export const fetchEmployees = async () => {
    try {
        const response = await apiClient.get('/api/employees');
        return response.data;
    } catch (err) {
        return mockEmployees;
    }
};

export const createEmployee = async (employeeData: any) => {
    try {
        const response = await apiClient.post('/api/employees', employeeData);
        return response.data;
    } catch (err) {
        const newItem = { id: mockEmployees.length + 1, ...employeeData };
        mockEmployees.push(newItem);
        return newItem;
    }
};

export const fetchLeavesForEmployee = async (employeeId: string) => {
    try {
        const response = await apiClient.get(`/api/leaves?employeeId=${encodeURIComponent(employeeId)}`);
        return response.data;
    } catch (err) {
        return mockLeaves.filter((l: any) => l.employeeId === employeeId);
    }
};

// Attendance endpoints (mock fallback)
export const fetchAttendance = async (date?: string) => {
    try {
        const q = date ? `?date=${encodeURIComponent(date)}` : '';
        const response = await apiClient.get(`/api/attendance${q}`);
        return response.data;
    } catch (err) {
        return mockAttendance.filter((a: any) => !date || a.date === date);
    }
};

export const fetchAttendanceForEmployee = async (employeeId: string, date?: string) => {
    try {
        const q = `?employeeId=${encodeURIComponent(employeeId)}` + (date ? `&date=${encodeURIComponent(date)}` : '');
        const response = await apiClient.get(`/api/attendance${q}`);
        return response.data;
    } catch (err) {
        return mockAttendance.filter((a: any) => a.employeeId === employeeId && (!date || a.date === date));
    }
};

// Export API calls
export const exportLeaves = async (format) => {
    const response = await apiClient.get(`/api/exports?format=${format}`);
    return response.data;
};

// Chat API calls
export const fetchMessages = async () => {
    const response = await apiClient.get('/api/chat/messages');
    return response.data;
};

export const sendMessage = async (messageData) => {
    const response = await apiClient.post('/api/chat/messages', messageData);
    return response.data;
};

// Compatibility aliases for older component imports
export const fetchChatMessages = fetchMessages;
export const fetchLeaveRequests = fetchLeaves;

// Reports
export const fetchFirstLastReport = async (date?: string) => {
    try {
        const q = date ? `?date=${encodeURIComponent(date)}` : '';
        const response = await apiClient.get(`/api/reports/first-last${q}`);
        return response.data.report || [];
    } catch (err) {
        return [];
    }
};