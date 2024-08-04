// src/services/logService.ts
import { connectMongo, getLogsCollection } from '../config/mongo'; 
import { Log } from '../models/logModel';
import { WithId, Document } from 'mongodb';

export class LogService {
  
  async createLog(log: Log): Promise<void> {
    await connectMongo();
    const collection = getLogsCollection();
    await collection.insertOne(log);
  }

  async getLogs(): Promise<Log[]> {
    await connectMongo();
    const collection = getLogsCollection();
    // Obtener los documentos y mapearlos a Log, incluyendo el campo `_id` como `id`
    const documents: WithId<Document>[] = await collection.find().toArray();
    return documents.map(doc => ({
      id: doc._id.toString(), // Convertir el ObjectId a string
      message: doc.message,
      level: doc.level,
      timestamp: doc.timestamp
    }));
  }
 
}
