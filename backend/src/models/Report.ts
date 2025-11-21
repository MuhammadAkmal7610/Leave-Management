import mongoose, { Schema, Document } from 'mongoose';

export interface IReportEntry extends Document {
  date: string; // YYYY-MM-DD
  employeeId: string;
  first?: Date;
  last?: Date;
  createdAt: Date;
}

const ReportSchema: Schema = new Schema(
  {
    date: { type: String, required: true, index: true },
    employeeId: { type: Schema.Types.ObjectId, required: true, ref: 'Employee' },
    first: { type: Date },
    last: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const Report = mongoose.model<IReportEntry>('Report', ReportSchema);
