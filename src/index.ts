import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { createUser, getUsers } from './handlers/userHandler';
import { createProduct, getProducts } from './handlers/productHandler';
import { register, login } from './handlers/authHandler';

export const userHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod) {
    case 'POST':
      return await createUser(event);
    case 'GET':
      return await getUsers(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};

export const productHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod) {
    case 'POST':
      return await createProduct(event);
    case 'GET':
      return await getProducts(event);
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};

export const authHandler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  switch (event.httpMethod) {
    case 'POST':
      if (event.path === '/register') {
        return await register(event);
      }
      if (event.path === '/login') {
        return await login(event);
      }
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Not Found' }),
      };
    default:
      return {
        statusCode: 405,
        body: JSON.stringify({ message: 'Method Not Allowed' }),
      };
  }
};
