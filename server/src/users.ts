import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as jwt from 'jsonwebtoken';

const dynamodb = new DynamoDB.DocumentClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const isValidEmail = (email: string): boolean => {
  return email.endsWith('@studenti.polito.it');
};

const verifyToken = async (token: string): Promise<{ email: string; isAdmin: boolean } | null> => {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; isAdmin: boolean };
  } catch (error) {
    return null;
  }
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;

    // Get all users
    if (method === 'GET') {
      const token = event.headers.Authorization?.split(' ')[1];
      
      if (!token) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }

      const params = {
        TableName: 'users',
        ProjectionExpression: 'email, isAdmin, createdAt'
      };

      const result = await dynamodb.scan(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ users: result.Items })
      };
    }

    // Create user
    if (method === 'POST') {
      const { email, password } = JSON.parse(event.body || '{}');
      
      if (!isValidEmail(email)) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Email must end with @studenti.polito.it' })
        };
      }
      
      // Check if user already exists
      const existingUser = await dynamodb.get({
        TableName: 'users',
        Key: { email }
      }).promise();

      if (existingUser.Item) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'User already exists' })
        };
      }

      await dynamodb.put({
        TableName: 'users',
        Item: {
          email,
          password,
          isAdmin: false,
          createdAt: Date.now()
        }
      }).promise();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'User created successfully' })
      };
    }

    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
}; 