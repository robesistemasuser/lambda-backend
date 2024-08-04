import Redis, { RedisOptions } from 'ioredis';

// Validar que las variables de entorno estén definidas
const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT ? Number(process.env.REDIS_PORT) : undefined;
const redisPassword = process.env.REDIS_PASSWORD;

if (!redisHost || redisPort === undefined) {
  throw new Error('Redis host and port must be defined');
}

// Configurar opciones de Redis
const redisOptions: RedisOptions = {
  host: redisHost,
  port: redisPort,
  password: redisPassword,
};

// Crear una instancia de Redis con las opciones definidas
const redis = new Redis(redisOptions);

// Función para establecer un valor en Redis
const setValue = async (key: string, value: string) => {
  try {
    await redis.set(key, value);
    console.log(`Value set for ${key}`);
  } catch (error) {
    console.error('Error setting value in Redis', error);
  }
};

// Función para obtener un valor de Redis
const getValue = async (key: string) => {
  try {
    const value = await redis.get(key);
    console.log(`Value retrieved for ${key}: ${value}`);
    return value;
  } catch (error) {
    console.error('Error getting value from Redis', error);
    return null;
  }
};

export default redis; // Exportar el cliente Redis por defecto
export { setValue, getValue }; // Exportar funciones nombradas
