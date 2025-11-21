import mongoose, { Schema, Document } from 'mongoose';

export interface IEmployee extends Document {
  firstName: string;
  lastName: string;
  email: string;
  position?: string;
  dept?: string;
  deptType?: string;
  dateOfJoining?: Date;
  avatarUrl?: string;
  createdAt: Date;
}

const EmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String },
    dept: { type: String },
    deptType: { type: String },
    dateOfJoining: { type: Date },
    avatarUrl: { type: String },
  },
  { timestamps: true }
);

export const Employee = mongoose.model<IEmployee>('Employee', EmployeeSchema);
