// src/services/authService.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export class AuthService {
  private dataSource: DataSource;

  constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  async register(username: string, email: string, password: string) {
    const userRepository = this.dataSource.getRepository(User);
    const newUser = userRepository.create({ username, email, password });
    await userRepository.save(newUser);
    return newUser;
  }

  async login(username: string, password: string) {
    const userRepository = this.dataSource.getRepository(User);
    const user = await userRepository.findOne({ where: { username, password } });
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user; // Aquí podrías devolver un token JWT en lugar del usuario
  }
}
