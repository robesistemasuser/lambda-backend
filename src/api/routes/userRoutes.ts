import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { registerHandler, loginHandler } from '../../handlers/userHandler';

export const handler = async (event: APIGatewayEvent): Promise<APIGatewayProxyResult> => {
    switch (event.httpMethod) {
        case 'POST':
            if (event.path === '/register') {
                return registerHandler(event);
            }
            if (event.path === '/login') {
                return loginHandler(event);
            }
            return { statusCode: 404, body: 'Not Found' };
        default:
            return { statusCode: 405, body: 'Method Not Allowed' };
    }
};
