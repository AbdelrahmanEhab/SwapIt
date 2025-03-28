import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB, S3 } from 'aws-sdk';
import * as jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';

const dynamodb = new DynamoDB.DocumentClient();
const s3 = new S3();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const BUCKET_NAME = process.env.BUCKET_NAME || 'swapit-products';
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PATCH,DELETE'
};

interface ProductImage {
  key: string;
  url: string;
}

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: ProductImage[];
  userEmail: string;
  createdAt: number;
  updatedAt: number;
}

const verifyToken = async (token: string): Promise<{ email: string; isAdmin: boolean } | null> => {
  try {
    return jwt.verify(token, JWT_SECRET) as { email: string; isAdmin: boolean };
  } catch (error) {
    return null;
  }
};

const validateProduct = (data: any): { isValid: boolean; error?: string } => {
  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    return { isValid: false, error: 'Title is required and must be at least 3 characters long' };
  }
  if (!data.description || typeof data.description !== 'string' || data.description.trim().length < 10) {
    return { isValid: false, error: 'Description is required and must be at least 10 characters long' };
  }
  if (!data.price || typeof data.price !== 'number' || data.price <= 0) {
    return { isValid: false, error: 'Price is required and must be greater than 0' };
  }
  if (!data.category || typeof data.category !== 'string') {
    return { isValid: false, error: 'Category is required' };
  }
  if (!data.images || !Array.isArray(data.images) || data.images.length === 0) {
    return { isValid: false, error: 'At least one image is required' };
  }
  return { isValid: true };
};

const generatePresignedUrls = async (fileTypes: string[], userEmail: string): Promise<{ uploadUrls: string[], imageKeys: string[] }> => {
  const uploadUrls: string[] = [];
  const imageKeys: string[] = [];

  for (const fileType of fileTypes) {
    const extension = fileType.split('/')[1];
    const imageKey = `${userEmail}/${uuidv4()}.${extension}`;
    const params = {
      Bucket: BUCKET_NAME,
      Key: imageKey,
      ContentType: fileType,
      Expires: 300, // URL expires in 5 minutes
    };

    const uploadUrl = await s3.getSignedUrlPromise('putObject', params);
    uploadUrls.push(uploadUrl);
    imageKeys.push(imageKey);
  }

  return { uploadUrls, imageKeys };
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const method = event.httpMethod;
    const path = event.path;
    const itemId = event.pathParameters?.item_id;

    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: ''
      };
    }

    // Get all products with optional filters
    if (method === 'GET' && !itemId) {
      const queryParams = event.queryStringParameters || {};
      let filterExpression = '';
      let expressionAttributeValues: any = {};
      let expressionAttributeNames: any = {};

      if (queryParams.category) {
        filterExpression += '#category = :category';
        expressionAttributeValues[':category'] = queryParams.category;
        expressionAttributeNames['#category'] = 'category';
      }

      if (queryParams.userEmail) {
        if (filterExpression) filterExpression += ' AND ';
        filterExpression += '#userEmail = :userEmail';
        expressionAttributeValues[':userEmail'] = queryParams.userEmail;
        expressionAttributeNames['#userEmail'] = 'userEmail';
      }

      const params: DynamoDB.DocumentClient.ScanInput = {
        TableName: 'ProductsTable',
        ...(filterExpression && {
          FilterExpression: filterExpression,
          ExpressionAttributeValues: expressionAttributeValues,
          ExpressionAttributeNames: expressionAttributeNames
        })
      };

      const result = await dynamodb.scan(params).promise();

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ products: result.Items })
      };
    }

    // Get single product
    if (method === 'GET' && itemId) {
      const params = {
        TableName: 'ProductsTable',
        Key: { id: itemId }
      };

      const result = await dynamodb.get(params).promise();

      if (!result.Item) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Product not found' })
        };
      }

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ product: result.Item })
      };
    }

    // Get presigned URLs for image upload
    if (path.endsWith('/upload-urls') && method === 'POST') {
      const token = event.headers.Authorization?.split(' ')[1];
      if (!token) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }

      const { fileTypes } = JSON.parse(event.body || '{}');
      if (!fileTypes || !Array.isArray(fileTypes)) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'File types array is required' })
        };
      }

      const { uploadUrls, imageKeys } = await generatePresignedUrls(fileTypes, decoded.email);

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ uploadUrls, imageKeys })
      };
    }

    // Create product
    if (method === 'POST' && !path.endsWith('/upload-urls')) {
      const token = event.headers.Authorization?.split(' ')[1];
      if (!token) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }

      const productData = JSON.parse(event.body || '{}');
      const validation = validateProduct(productData);
      
      if (!validation.isValid) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: validation.error })
        };
      }

      const now = Date.now();
      const product: Product = {
        id: uuidv4(),
        title: productData.title.trim(),
        description: productData.description.trim(),
        price: productData.price,
        category: productData.category.trim(),
        images: productData.images,
        userEmail: decoded.email,
        createdAt: now,
        updatedAt: now
      };

      await dynamodb.put({
        TableName: 'ProductsTable',
        Item: product
      }).promise();

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ 
          message: 'Product created successfully',
          product 
        })
      };
    }

    // Update product
    if (method === 'PATCH' && itemId) {
      const token = event.headers.Authorization?.split(' ')[1];
      if (!token) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }

      // Check if product exists and belongs to user
      const existingProduct = await dynamodb.get({
        TableName: 'ProductsTable',
        Key: { id: itemId }
      }).promise();

      if (!existingProduct.Item) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Product not found' })
        };
      }

      if (existingProduct.Item.userEmail !== decoded.email && !decoded.isAdmin) {
        return {
          statusCode: 403,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'You can only update your own products' })
        };
      }

      const updates = JSON.parse(event.body || '{}');
      const updateExpressions: string[] = [];
      const expressionAttributeNames: { [key: string]: string } = {};
      const expressionAttributeValues: { [key: string]: any } = {};

      Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'userEmail' && key !== 'createdAt') {
          updateExpressions.push(`#${key} = :${key}`);
          expressionAttributeNames[`#${key}`] = key;
          expressionAttributeValues[`:${key}`] = value;
        }
      });

      expressionAttributeNames['#updatedAt'] = 'updatedAt';
      expressionAttributeValues[':updatedAt'] = Date.now();
      updateExpressions.push('#updatedAt = :updatedAt');

      if (updateExpressions.length === 0) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No valid updates provided' })
        };
      }

      const result = await dynamodb.update({
        TableName: 'ProductsTable',
        Key: { id: itemId },
        UpdateExpression: `SET ${updateExpressions.join(', ')}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: 'ALL_NEW'
      }).promise();

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ 
          message: 'Product updated successfully', 
          product: result.Attributes 
        })
      };
    }

    // Delete product
    if (method === 'DELETE' && itemId) {
      const token = event.headers.Authorization?.split(' ')[1];
      if (!token) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      const decoded = await verifyToken(token);
      if (!decoded) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }

      // Check if product exists and belongs to user
      const existingProduct = await dynamodb.get({
        TableName: 'ProductsTable',
        Key: { id: itemId }
      }).promise();

      if (!existingProduct.Item) {
        return {
          statusCode: 404,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Product not found' })
        };
      }

      if (existingProduct.Item.userEmail !== decoded.email && !decoded.isAdmin) {
        return {
          statusCode: 403,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'You can only delete your own products' })
        };
      }

      // Delete images from S3
      const deletePromises = existingProduct.Item.images.map((image: ProductImage) => 
        s3.deleteObject({
          Bucket: BUCKET_NAME,
          Key: image.key
        }).promise()
      );

      await Promise.all(deletePromises);

      // Delete product from DynamoDB
      await dynamodb.delete({
        TableName: 'ProductsTable',
        Key: { id: itemId }
      }).promise();

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Product deleted successfully' })
      };
    }

    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Method not allowed' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ 
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    };
  }
}; 