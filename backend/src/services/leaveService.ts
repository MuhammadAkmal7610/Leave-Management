// services/leave.service.ts
import { Leave, ILeave } from '../models/LeaveModel';
import { LeaveRequest } from '../types';

export const createLeave = async (data: LeaveRequest): Promise<ILeave> => {
  // 1. Validate ALL required fields
  const { employeeId, leaveType, startDate, endDate, reason, isHalfDay } = data;

  if (!employeeId || !leaveType || !startDate || !endDate) {
    throw new Error('Missing required fields: employeeId, leaveType, startDate, endDate');
  }

  // 2. Convert string dates to Date objects
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date format for startDate or endDate');
  }

  if (end < start) {
    throw new Error('End date cannot be earlier than start date');
  }

  // 3. Create and save
  const leave = new Leave({
    employeeId,
    leaveType,
    startDate: start,
    endDate: end,
    reason: reason?.trim(),
    isHalfDay: isHalfDay ?? false,
    status: 'pending', // Explicit
  });

  try {
    const savedLeave = await leave.save();
    return savedLeave;
  } catch (error: any) {
    // Handle Mongoose validation errors nicely
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      throw new Error(`Validation failed: ${messages.join(', ')}`);
    }
    throw error; // Re-throw others
  }
};

// GET ALL or by employee
export const getLeaves = async (employeeId?: string): Promise<ILeave[]> => {
  const filter = employeeId ? { employeeId } : {};
  return await Leave.find(filter).sort({ createdAt: -1 }).lean(); // .lean() for faster reads
};

// UPDATE leave status (e.g. approve/reject)
export const updateLeave = async (
  id: string,
  data: Partial<Pick<ILeave, 'status' | 'reason'>>
): Promise<ILeave | null> => {
  return await Leave.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};

// DELETE leave (admin or user)
export const deleteLeave = async (id: string): Promise<ILeave | null> => {
  return await Leave.findByIdAndDelete(id);
};