import mongoose, { Schema, Document } from 'mongoose';

export interface IAttendanceEvent extends Document {
  employeeId: mongoose.Types.ObjectId;
  timestamp: Date;
  type?: string; // optional 'in'|'out' or event note
}

const AttendanceEventSchema: Schema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    timestamp: { type: Date, required: true },
    type: { type: String },
  },
  { timestamps: true }
);

export const AttendanceEvent = mongoose.model<IAttendanceEvent>('AttendanceEvent', AttendanceEventSchema);
