import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { UserService } from '../services/userService';

const userService = new UserService();

export const createUser: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: No body provided' }),
      };
    }
    
    const { username, email, password } = JSON.parse(event.body);
    
    // Validate the request body here if needed
    if (!username || !email || !password) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Missing required fields' }),
      };
    }

    const user = await userService.createUser(username, email, password);

    return {
      statusCode: 201,
      body: JSON.stringify(user),
    };
  } catch (error) {
    console.error('Error creating user:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const getUsers: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const users = await userService.getAllUsers();

    return {
      statusCode: 200,
      body: JSON.stringify(users),
    };
  } catch (error) {
    console.error('Error fetching users:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
