import { IUserRepository } from '../../data/repositories/userRepository';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class LoginUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(username: string, password: string): Promise<string> {
        const user = await this.userRepository.findByUsername(username);

        if (!user) {
            throw new Error('Invalid username or password');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid username or password');
        }

        return jwt.sign({ username: user.username }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    }
}
