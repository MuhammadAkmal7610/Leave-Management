import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import app from './app';
import bcrypt from 'bcryptjs';

dotenv.config();

const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/leave-management';

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {
            // options kept for compatibility
            useNewUrlParser: true as any,
            useUnifiedTopology: true as any,
        } as any);
        console.log('Connected to the database');
    } catch (err) {
        console.error('Database connection error (continuing without DB):', err);
    }

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

start();