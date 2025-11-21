import { Request, Response } from 'express';
import { AttendanceEvent } from '../models/AttendanceEvent';

class AttendanceController {
  public async createEvent(req: Request, res: Response): Promise<void> {
    try {
      const { employeeId, timestamp, type } = req.body;
      const ev = new AttendanceEvent({ employeeId, timestamp: timestamp ? new Date(timestamp) : new Date(), type });
      const saved = await ev.save();
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getEvents(req: Request, res: Response): Promise<void> {
    try {
      const { date, employeeId } = req.query;
      let query: any = {};
      if (date) {
        const d = new Date(String(date));
        const start = new Date(d.setHours(0, 0, 0, 0));
        const end = new Date(d.setHours(23, 59, 59, 999));
        query.timestamp = { $gte: start, $lte: end };
      }
      if (employeeId) {
        query.employeeId = String(employeeId);
      }
      const events = await AttendanceEvent.find(query).sort({ timestamp: 1 });
      res.status(200).json(events);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default AttendanceController;
