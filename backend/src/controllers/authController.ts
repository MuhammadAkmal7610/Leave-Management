import { Request, Response } from 'express';
import { AuthService } from '../services/authService';
import bcrypt from 'bcryptjs';

export class AuthController {
    private authService: AuthService;

    constructor() {
        this.authService = new AuthService();
    }

    public async register(req: Request, res: Response): Promise<void> {
        try {
            const user = await this.authService.register(req.body);
            res.status(201).json(user);
        } catch (error) {
            const e: any = error;
            res.status(400).json({ message: e?.message || String(e) });
        }
    }

    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body || {};
            const result = await this.authService.login(email, password);
            // authService.login returns { user, token }
            res.status(200).json(result);
        } catch (error) {
            const e: any = error;
            res.status(401).json({ message: e?.message || String(e) });
        }
    }

    public async logout(req: Request, res: Response): Promise<void> {
        try {
            // no-op logout for stateless JWT auth; respond success
            res.status(200).json({ message: 'Logged out successfully' });
        } catch (error) {
            const e: any = error;
            res.status(500).json({ message: e?.message || String(e) });
        }
    }
}