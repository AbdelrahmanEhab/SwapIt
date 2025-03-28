import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import { handleError, handleSuccess, handleOptions, verifyToken } from './utils';

const dynamodb = new DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE || 'users';

const verifyAdminToken = async (token: string): Promise<boolean> => {
  const decoded = verifyToken(token);
  if (!decoded || !decoded.isAdmin) {
    return false;
  }
  return true;
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  try {
    const method = event.httpMethod;
    const path = event.path;
    const token = event.headers.Authorization?.split(' ')[1];
    
    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      return handleOptions();
    }

    if (!token) {
      return handleError(new Error('No token provided'), 401);
    }

    const isAdmin = await verifyAdminToken(token);
    if (!isAdmin) {
      return handleError(new Error('Admin access required'), 403);
    }

    // Get admin status
    if (method === 'GET' && path.endsWith('/admin')) {
      return handleSuccess({ isAdmin: true });
    }

    // Get all users (admin only)
    if (method === 'GET' && path.endsWith('/admin/users')) {
      const params = {
        TableName: USERS_TABLE,
        ProjectionExpression: 'email, firstName, lastName, telegramUsername, isAdmin, createdAt'
      };

      const result = await dynamodb.scan(params).promise();

      return handleSuccess({ users: result.Items });
    }

    // Delete user (admin only)
    if (method === 'DELETE' && path.includes('/admin/users/')) {
      const userId = path.split('/').pop();
      
      if (!userId) {
        return handleError(new Error('User ID is required'), 400);
      }

      const params = {
        TableName: USERS_TABLE,
        Key: { email: userId }
      };

      await dynamodb.delete(params).promise();

      return handleSuccess({ message: 'User deleted successfully' });
    }

    // Assign user as admin
    if (method === 'POST' && path.endsWith('/admin')) {
      if (!event.body) {
        return handleError(new Error('Request body is required'), 400);
      }

      const { email } = JSON.parse(event.body);
      
      if (!email) {
        return handleError(new Error('Email is required'), 400);
      }

      const params = {
        TableName: USERS_TABLE,
        Key: { email },
        UpdateExpression: 'SET isAdmin = :isAdmin',
        ExpressionAttributeValues: {
          ':isAdmin': true
        }
      };

      await dynamodb.update(params).promise();

      return handleSuccess({ message: 'User assigned as admin successfully' });
    }

    return handleError(new Error('Method not allowed'), 405);
  } catch (error) {
    return handleError(error);
  }
}; 