import { MongoClient, Db, Collection } from 'mongodb';

// Obtener la URI de MongoDB desde las variables de entorno
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  throw new Error('Mongo URI must be defined');
}

// Crear una instancia de MongoClient
const client = new MongoClient(mongoUri); // Sin opciones adicionales

let db: Db;
let logsCollection: Collection;

// Función para conectar a MongoDB
export const connectMongo = async (): Promise<void> => {
  if (!db) {
    try {
      await client.connect();
      db = client.db('logsDb'); // Obtén la base de datos específica
      logsCollection = db.collection('logs'); // Obtén la colección específica
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      throw error;
    }
  }
};

// Función para obtener la colección de logs
export const getLogsCollection = (): Collection => {
  if (!logsCollection) {
    throw new Error('Logs collection not initialized');
  }
  return logsCollection;
};
