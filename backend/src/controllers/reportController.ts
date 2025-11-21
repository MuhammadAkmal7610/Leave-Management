import { Request, Response } from 'express';
import { AttendanceEvent } from '../models/AttendanceEvent';
import { Employee } from '../models/Employee';
import { Report } from '../models/Report';

class ReportController {
  // GET /api/reports/first-last?date=YYYY-MM-DD
  // If a precomputed report exists in Report collection for the date, return it.
  // Otherwise compute on the fly from AttendanceEvent.
  public async firstLastPerEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { date } = req.query;
      if (!date) {
        res.status(400).json({ message: 'date query param is required in YYYY-MM-DD' });
        return;
      }

      const dateStr = String(date);

      // Try to load precomputed report entries
      const stored = await Report.find({ date: dateStr }).lean();
      if (stored && stored.length > 0) {
        const results = await Promise.all(
          stored.map(async (r: any) => {
            const emp = await Employee.findById(r.employeeId).lean();
            return { employee: emp || { id: r.employeeId, name: 'Unknown' }, first: r.first, last: r.last };
          })
        );
        res.status(200).json({ date: dateStr, report: results });
        return;
      }

      // compute on the fly
      const d = new Date(dateStr);
      const start = new Date(d.setHours(0, 0, 0, 0));
      const end = new Date(d.setHours(23, 59, 59, 999));

      const agg = await AttendanceEvent.aggregate([
        { $match: { timestamp: { $gte: start, $lte: end } } },
        {
          $group: {
            _id: '$employeeId',
            first: { $min: '$timestamp' },
            last: { $max: '$timestamp' },
          },
        },
      ]);

      const results = await Promise.all(
        agg.map(async (r: any) => {
          const emp = await Employee.findById(r._id).lean();
          return { employee: emp || { id: r._id, name: 'Unknown' }, first: r.first, last: r.last };
        })
      );

      res.status(200).json({ date: dateStr, report: results });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  // POST /api/reports/generate -> aggregate all attendance events and store per-date per-employee first/last
  public async generateReports(req: Request, res: Response): Promise<void> {
    try {
      // Aggregate by date-string and employee
      const agg = await AttendanceEvent.aggregate([
        {
          $project: {
            employeeId: 1,
            timestamp: 1,
            dateStr: { $dateToString: { format: '%Y-%m-%d', date: '$timestamp' } },
          },
        },
        {
          $group: {
            _id: { date: '$dateStr', employeeId: '$employeeId' },
            first: { $min: '$timestamp' },
            last: { $max: '$timestamp' },
          },
        },
      ]);

      // Upsert entries into Report collection
      const ops = agg.map((g: any) => ({
        updateOne: {
          filter: { date: g._id.date, employeeId: g._id.employeeId },
          update: { $set: { first: g.first, last: g.last } },
          upsert: true,
        },
      }));

      if (ops.length > 0) {
        await Report.bulkWrite(ops);
      }

      res.status(200).json({ message: 'Reports generated', count: ops.length });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default ReportController;
