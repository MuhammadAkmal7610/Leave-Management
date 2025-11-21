import { Router } from 'express';
import AttendanceController from '../controllers/attendanceController';

const router = Router();
const ctrl = new AttendanceController();

router.post('/', (req, res) => ctrl.createEvent(req, res));
router.get('/', (req, res) => ctrl.getEvents(req, res));

export default router;
