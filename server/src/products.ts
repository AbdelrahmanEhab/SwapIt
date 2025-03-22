import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as jwt from 'jsonwebtoken';
import { S3 } from 'aws-sdk';

const dynamodb = new DynamoDB.DocumentClient();
const s3 = new S3();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const BUCKET_NAME = process.env.BUCKET_NAME || 'my-bucket';

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
    const path = event.path;
    const itemId = event.pathParameters?.item_id;

    // Get all products
    if (method === 'GET' && !itemId) {
      const params = {
        TableName: 'ProductsTable',
        ProjectionExpression: 'id, name, description, price, imageUrl, timestamp'
      };

      const result = await dynamodb.scan(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ products: result.Items })
      };
    }

    // Get single product
    if (method === 'GET' && itemId) {
      const params = {
        TableName: 'ProductsTable',
        Key: {
          id: itemId,
          timestamp: 0 // Using 0 as default timestamp for single item lookup
        }
      };

      const result = await dynamodb.get(params).promise();

      if (!result.Item) {
        return {
          statusCode: 404,
          body: JSON.stringify({ message: 'Product not found' })
        };
      }

      return {
        statusCode: 200,
        body: JSON.stringify({ product: result.Item })
      };
    }

    // Create product
    if (method === 'POST') {
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

      const { name, description, price, imageUrl } = JSON.parse(event.body || '{}');
      const timestamp = Date.now();
      const id = `product_${timestamp}`;

      await dynamodb.put({
        TableName: 'ProductsTable',
        Item: {
          id,
          name,
          description,
          price,
          imageUrl,
          timestamp,
          createdBy: decoded.email
        }
      }).promise();

      return {
        statusCode: 201,
        body: JSON.stringify({ message: 'Product created successfully', id })
      };
    }

    // Update product
    if (method === 'PATCH' && itemId) {
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

      const updates = JSON.parse(event.body || '{}');
      const updateExpressions: string[] = [];
      const expressionAttributeNames: { [key: string]: string } = {};
      const expressionAttributeValues: { [key: string]: any } = {};

      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'timestamp') {
          updateExpressions.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      });

      if (updateExpressions.length === 0) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'No valid updates provided' })
        };
      }

      const params = {
        TableName: 'ProductsTable',
        Key: {
          id: itemId,
          timestamp: 0
        },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      };

      const result = await dynamodb.update(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Product updated successfully', product: result.Attributes })
      };
    }

    // Delete product
    if (method === 'DELETE' && itemId) {
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
        TableName: 'ProductsTable',
        Key: {
          id: itemId,
          timestamp: 0
        }
      };

      await dynamodb.delete(params).promise();

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Product deleted successfully' })
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