export interface LeaveRequest {
    id: string;
    userId: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
}

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    role: 'admin' | 'user';
}

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    content: string;
    timestamp: Date;
}

export interface ExportData {
    leaveRequests: LeaveRequest[];
    users: User[];
}