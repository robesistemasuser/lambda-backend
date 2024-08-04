// src/types.d.ts

export interface APIGatewayProxyResult {
  statusCode: number;
  body: string;
  headers?: { [header: string]: string };
  isBase64Encoded?: boolean;
}

export interface APIGatewayProxyEvent {
  body?: string | null;
  headers?: { [header: string]: string };
  httpMethod: string;
  isBase64Encoded?: boolean;
  path: string;
  queryStringParameters?: { [name: string]: string | null };
  requestContext: {
    [key: string]: any; // Define more specific types if needed
  };
  resource: string;
}

export interface Context {
  // Define necessary properties based on your needs
  awsRequestId: string;
  functionName: string;
  functionVersion: string;
  invokedFunctionArn: string;
  memoryLimitInMB: string;
  logGroupName: string;
  logStreamName: string;
  // Add any other properties if necessary
}

export type Callback<T> = (error: Error | null, result?: T) => void;
