export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface LeaveRequest {
    id: string;
    employeeId: string;
    startDate: Date;
    endDate: Date;
    reason: string;
    status: 'pending' | 'approved' | 'rejected';
    createdAt: Date;
    updatedAt: Date;
    leaveType: string;
    isHalfDay: boolean;
}

export interface ChatMessage {
    id: string;
    senderId: string;
    receiverId: string;
    message: string;
    timestamp: Date;
}

export interface ExportData {
    userId: string;
    leaveRecords: LeaveRequest[];
    exportDate: Date;
}