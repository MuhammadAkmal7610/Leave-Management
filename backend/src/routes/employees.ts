import { Router } from 'express';
import EmployeeController from '../controllers/employeeController';

const router = Router();
const ctrl = new EmployeeController();

router.post('/', (req, res) => ctrl.createEmployee(req, res));
router.get('/', (req, res) => ctrl.getEmployees(req, res));

export default router;
