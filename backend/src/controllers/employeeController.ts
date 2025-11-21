import { Request, Response } from 'express';
import { Employee } from '../models/Employee';

class EmployeeController {
  public async createEmployee(req: Request, res: Response): Promise<void> {
    try {
      const { firstName, lastName, email, position, dept, deptType, dateOfJoining, avatarUrl } = req.body;
      const emp = new Employee({ firstName, lastName, email, position, dept, deptType, dateOfJoining, avatarUrl });
      const saved = await emp.save();
      res.status(201).json(saved);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async getEmployees(req: Request, res: Response): Promise<void> {
    try {
      const list = await Employee.find().sort({ createdAt: -1 });
      res.status(200).json(list);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}

export default EmployeeController;
