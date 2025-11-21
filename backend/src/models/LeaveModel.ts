import mongoose, { Schema, Document } from 'mongoose';

export interface ILeave extends Document {
    employeeId: string;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    reason?: string;
    status: string; // pending | approved | rejected 
    createdAt?: Date;
    updatedAt?: Date;
}

const LeaveSchema: Schema = new Schema(
    {
        employeeId: { type: String, required: true },
        leaveType: { type: String, required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        reason: { type: String },
        status: { type: String, default: 'pending' },
    },
    { timestamps: true }
);

export const Leave = mongoose.model<ILeave>('Leave', LeaveSchema);
