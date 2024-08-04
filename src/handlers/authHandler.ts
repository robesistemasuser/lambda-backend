import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { AuthService } from '../services/authService';
import { MasterDataSource, ReplicaDataSource, connectDatabases } from '../config/db';

export const register: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await connectDatabases(); // Inicializa las conexiones

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: No body provided' }),
    };
  }

  try {
    const { username, email, password } = JSON.parse(event.body);

    // Validate the request body here if needed
    if (!username || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Missing required fields' }),
      };
    }

    const authService = new AuthService(MasterDataSource); // Pasar la conexión master para escritura
    const user = await authService.register(username, email, password);

    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error registering user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const login: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  await connectDatabases(); // Inicializa las conexiones

  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: No body provided' }),
    };
  }

  try {
    const { username, password } = JSON.parse(event.body);

    // Validate the request body here if needed
    if (!username || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Missing required fields' }),
      };
    }

    const authService = new AuthService(ReplicaDataSource); // Usar la conexión replica para lectura
    const token = await authService.login(username, password);

    return {
      statusCode: 200,
      body: JSON.stringify({ token }),
    };
  } catch (error) {
    console.error('Error logging in user:', error);
    return {
      statusCode: 401,
      body: JSON.stringify({ message: 'Unauthorized' }),
    };
  }
};
