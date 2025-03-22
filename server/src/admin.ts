import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as jwt from 'jsonwebtoken';

const dynamodb = new DynamoDB.DocumentClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const verifyAdminToken = async (token: string): Promise<{ email: string; isAdmin: boolean } | null> => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string; isAdmin: boolean };
    if (!decoded.isAdmin) {
      return null;
    }
    return decoded;
  } catch (error) {
    return null;
  }
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;
    const path = event.path;
    const token = event.headers.Authorization?.split(' ')[1];
    
    if (!token) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: 'No token provided' })
      };
    }

    const decoded = await verifyAdminToken(token);
    if (!decoded) {
      return {
        statusCode: 403,
        body: JSON.stringify({ message: 'Admin access required' })
      };
    }

    // Get admin status
    if (method === 'GET' && path.endsWith('/admin')) {
      return {
        statusCode: 200,
        body: JSON.stringify({ isAdmin: true })
      };
    }

    // Get all users (admin only)
    if (method === 'GET' && path.endsWith('/admin/users')) {
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

    // Delete user (admin only)
    if (method === 'DELETE' && path.includes('/admin/users/')) {
      const userId = path.split('/').pop();
      
      if (!userId) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'User ID is required' })
        };
      }

      const params = {
        TableName: 'users',
        Key: { email: userId }
      };

      await dynamodb.delete(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User deleted successfully' })
      };
    }

    // Assign user as admin
    if (method === 'POST' && path.endsWith('/admin')) {
      const { email } = JSON.parse(event.body || '{}');
      
      if (!email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Email is required' })
        };
      }

      const params = {
        TableName: 'users',
        Key: { email },
        UpdateExpression: 'SET isAdmin = :isAdmin',
        ExpressionAttributeValues: {
          ':isAdmin': true
        }
      };

      await dynamodb.update(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'User assigned as admin successfully' })
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