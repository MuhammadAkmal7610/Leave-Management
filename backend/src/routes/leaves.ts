import { Router, Request, Response } from 'express';
import { createLeaveController, getLeavesController, updateLeaveController, deleteLeaveController } from '../controllers/leaveController';

const router = Router();

// Create leave request
router.post('/', (req: Request, res: Response) => createLeaveController(req, res));

// Get all leaves
router.get('/', (req: Request, res: Response) => getLeavesController(req, res));

// Update leave request
router.put('/:id', (req: Request, res: Response) => updateLeaveController(req, res));

// Delete leave request
router.delete('/:id', (req: Request, res: Response) => deleteLeaveController(req, res));

export default router;
