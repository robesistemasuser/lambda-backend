import redisClient from '../config/redis';

export class SessionService {
  async setSession(userId: string, sessionData: string) {
    await redisClient.set(userId, sessionData);
  }

  async getSession(userId: string): Promise<string | null> {
    return await redisClient.get(userId);
  }

  async deleteSession(userId: string) {
    await redisClient.del(userId);
  }
}
