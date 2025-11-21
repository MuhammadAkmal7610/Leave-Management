import { Request, Response } from 'express';
import {
    createLeave,
    getLeaves,
    updateLeave,
    deleteLeave
} from '../services/leaveService';
 // controllers/leave.controller.ts
 
 

export const createLeaveController = async (req: Request, res: Response) => {
  try {
    const leave = await createLeave(req.body);
    res.status(201).json({
      success: true,
      data: leave,
    });
  } catch (error: any) {
    console.error('Create leave error:', error);

    // Mongoose validation error
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err: any) => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: messages,
      });
    }

    // Custom error (from our throw)
    if (error.message.includes('Missing') || error.message.includes('Invalid date')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
};

export const getLeavesController = async (req: Request, res: Response) => {
    try {
        const leaves = await getLeaves(req.query.employeeId as string);
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Error' });
    }
};

export const updateLeaveController = async (req: Request, res: Response) => {
    try {
        const updated = await updateLeave(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Error' });
    }
};

export const deleteLeaveController = async (req: Request, res: Response) => {
    try {
        const deleted = await deleteLeave(req.params.id);
        res.status(200).json(deleted);
    } catch (error) {
        res.status(500).json({ message: error instanceof Error ? error.message : 'Error' });
    }
};
