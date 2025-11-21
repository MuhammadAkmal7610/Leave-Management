import { Router } from 'express';
import ReportController from '../controllers/reportController';

const router = Router();
const ctrl = new ReportController();

router.get('/first-last', (req, res) => ctrl.firstLastPerEmployee(req, res));
router.post('/generate', (req, res) => ctrl.generateReports(req, res));

export default router;
