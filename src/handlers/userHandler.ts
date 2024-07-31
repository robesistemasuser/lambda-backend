import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { RegisterUser } from '../core/usecases/registerUser';
import { LoginUser } from '../core/usecases/loginUser';
import { UserRepository } from '../data/repositories/userRepository';

const userRepository = new UserRepository();

export const registerHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username, password } = JSON.parse(event.body || '{}');
        const registerUser = new RegisterUser(userRepository);
        await registerUser.execute(username, password);
        return { statusCode: 201, body: JSON.stringify({ message: 'User registered successfully' }) };
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { statusCode: 500, body: JSON.stringify({ message: 'Error registering user', error: err.message }) };
        }
        return { statusCode: 500, body: JSON.stringify({ message: 'Error registering user', error: 'Unknown error' }) };
    }
};

export const loginHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        const { username, password } = JSON.parse(event.body || '{}');
        const loginUser = new LoginUser(userRepository);
        const token = await loginUser.execute(username, password);
        return { statusCode: 200, body: JSON.stringify({ message: 'Login successful', token }) };
    } catch (err: unknown) {
        if (err instanceof Error) {
            return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password', error: err.message }) };
        }
        return { statusCode: 401, body: JSON.stringify({ message: 'Invalid username or password', error: 'Unknown error' }) };
    }
};
