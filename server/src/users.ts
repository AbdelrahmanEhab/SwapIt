import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { handleError, handleSuccess, handleOptions, verifyToken } from './utils';

const dynamodb = new DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE || 'users';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const method = event.httpMethod;

    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      return handleOptions();
    }

    // Get all users
    if (method === 'GET') {
      const token = event.headers.Authorization?.split(' ')[1];
      
      if (!token) {
        return handleError(new Error('No token provided'), 401);
      }

      const decoded = verifyToken(token);
      if (!decoded) {
        return handleError(new Error('Invalid token'), 401);
      }

      const params = {
        TableName: USERS_TABLE,
        ProjectionExpression: 'email, firstName, lastName, telegramUsername, isAdmin, createdAt'
      };

      const result = await dynamodb.scan(params).promise();

      return handleSuccess({ users: result.Items });
    }

    // Create user
    if (method === 'POST') {
      if (!event.body) {
        return handleError(new Error('Request body is required'), 400);
      }

      const { email, firstName, lastName, telegramUsername } = JSON.parse(event.body);
      
      if (!email) {
        return handleError(new Error('Email is required'), 400);
      }

      // Check if user already exists
      const existingUser = await dynamodb.get({
        TableName: USERS_TABLE,
        Key: { email }
      }).promise();

      if (existingUser.Item) {
        return handleError(new Error('User already exists'), 400);
      }

      const newUser = {
        email,
        firstName,
        lastName,
        telegramUsername,
        isAdmin: false,
        createdAt: Date.now()
      };

      await dynamodb.put({
        TableName: USERS_TABLE,
        Item: newUser
      }).promise();

      return handleSuccess({ message: 'User created successfully', user: newUser }, 201);
    }

    return handleError(new Error('Method not allowed'), 405);
  } catch (error) {
    return handleError(error);
  }
}; 