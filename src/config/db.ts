// src/config/db.ts
import { DataSource } from 'typeorm';
import { User } from '../entities/User';

export const MasterDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_MASTER_URL,
  entities: [User],
  synchronize: true, // Usar con cuidado en producción
  logging: false,
});

export const ReplicaDataSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_REPLICA_URL,
  entities: [User],
  synchronize: true, // Usar con cuidado en producción
  logging: false,
});

// Función para conectar las bases de datos
export const connectDatabases = async () => {
  try {
    await MasterDataSource.initialize();
    await ReplicaDataSource.initialize();
    console.log('Databases connected successfully');
  } catch (error) {
    console.error('Error connecting to the databases', error);
    throw error;
  }
};
