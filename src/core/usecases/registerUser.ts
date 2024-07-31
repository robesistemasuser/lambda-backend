import { IUserRepository } from '../../data/repositories/userRepository';
import { User } from '../entities/User';
import * as bcrypt from 'bcryptjs';

export class RegisterUser {
    constructor(private userRepository: IUserRepository) {}

    async execute(username: string, password: string): Promise<void> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User('', username, hashedPassword);
        await this.userRepository.create(user);
    }
}
