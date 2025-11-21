import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import authRoutes from './routes/auth';
import leaveRoutes from './routes/leaves';
import exportRoutes from './routes/exports';
import chatRoutes from './routes/chat';
import employeeRoutes from './routes/employees';
import attendanceRoutes from './routes/attendance';
import reportRoutes from './routes/reports';
// import { authMiddleware } from './middlewares/auth';
import bcrypt from 'bcryptjs';

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());
// Temporarily disable auth middleware so the app is accessible during development
// app.use(authMiddleware);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/exports', exportRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/employees', employeeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/reports', reportRoutes);

export default app;