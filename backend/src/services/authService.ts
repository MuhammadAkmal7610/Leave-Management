import { User } from '../models';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export class AuthService {

    async register(userData: RegisterData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);

        const user = new User({
            name: userData.name,
            email: userData.email,
            password: hashedPassword,
        });

        await user.save();
        return user;
    }

    async login(email: string, password: string) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User not found');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET as string,   // ensures type safety
            { expiresIn: '1h' }
        );

        return { user, token };
    }

    async getUserById(userId: string) {
        return User.findById(userId);
    }
}
