import { Router } from 'express';
import { ExportController } from '../controllers/exportController';

const router = Router();
const exportController = new ExportController();

// Single export endpoint. Use `?format=csv` or `?format=json`.
router.get('/', exportController.exportLeaveData.bind(exportController));

export default router;