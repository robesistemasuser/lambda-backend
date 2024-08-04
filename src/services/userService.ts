// src/services/userService.ts
import { MasterDataSource, ReplicaDataSource } from '../config/db';
import { User } from '../models/userModel';

export class UserService {
  private userRepositoryW = MasterDataSource.getRepository(User);
  private userRepositoryR = ReplicaDataSource.getRepository(User);


  // Método para crear un nuevo usuario
  async createUser(username: string, email: string, password: string): Promise<User> {
    const user = this.userRepositoryW.create({ username, email, password });
    return await this.userRepositoryW.save(user);
  }

  // Método para obtener un usuario por ID
  async getUserById(userId: number): Promise<User | null> {
    return await this.userRepositoryR.findOneBy({ id: userId });
  }

  // Método para obtener todos los usuarios
  async getAllUsers(): Promise<User[]> {
    return await this.userRepositoryR.find();
  }

  // Otros métodos relacionados con usuarios...
}
