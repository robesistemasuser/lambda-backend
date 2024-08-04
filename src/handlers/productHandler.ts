import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import { ProductService } from '../services/productService';

const productService = new ProductService();

export const createProduct: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Bad Request: No body provided' }),
    };
  }

  try {
    const { name, price, description } = JSON.parse(event.body);

    // Validate the request body here if needed
    if (!name || !price || !description) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Bad Request: Missing required fields' }),
      };
    }

    const product = await productService.createProduct(name, price, description);

    return {
      statusCode: 201,
      body: JSON.stringify(product),
    };
  } catch (error) {
    console.error('Error creating product:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};

export const getProducts: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const products = await productService.getAllProducts();
    return {
      statusCode: 200,
      body: JSON.stringify(products),
    };
  } catch (error) {
    console.error('Error fetching products:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
