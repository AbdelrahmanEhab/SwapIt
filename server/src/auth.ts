import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const dynamodb = new DynamoDB.DocumentClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
};

const isValidEmail = (email: string): boolean => {
  return email.endsWith('@studenti.polito.it');
};

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const path = event.path;
    const method = event.httpMethod;

    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: ''
      };
    }

    // Login endpoint
    if (path.endsWith('/login') && method === 'POST') {
      const { email, password } = JSON.parse(event.body || '{}');
      
      if (!isValidEmail(email)) {
        return {
          statusCode: 400,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Email must end with @studenti.polito.it' })
        };
      }

      const params = {
        TableName: 'users',
        Key: { email }
      };

      const result = await dynamodb.get(params).promise();
      const user = result.Item;

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid credentials' })
        };
      }

      const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ token, user: { email: user.email, isAdmin: user.isAdmin } })
      };
    }

    // Signup endpoint
    if (path.endsWith('/signup') && method === 'POST') {
      const { email, password, firstName, lastName, telegramUsername } = JSON.parse(event.body || '{}');
      
      if (!isValidEmail(email)) {
        return {
          statusCode: 400,
          headers: corsHeaders,
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
          headers: corsHeaders,
          body: JSON.stringify({ message: 'User already exists' })
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      await dynamodb.put({
        TableName: 'users',
        Item: {
          email,
          password: hashedPassword,
          firstName,
          lastName,
          telegramUsername,
          isAdmin: false,
          createdAt: Date.now()
        }
      }).promise();

      return {
        statusCode: 201,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'User created successfully' })
      };
    }

    // Get current user endpoint
    if (path.endsWith('/me') && method === 'GET') {
      const token = event.headers.Authorization?.split(' ')[1];
      
      if (!token) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'No token provided' })
        };
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        const params = {
          TableName: 'users',
          Key: { email: decoded.email }
        };

        const result = await dynamodb.get(params).promise();
        const user = result.Item;

        if (!user) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'User not found' })
          };
        }

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ user: { email: user.email, isAdmin: user.isAdmin } })
        };
      } catch (error) {
        return {
          statusCode: 401,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Invalid token' })
        };
      }
    }

    return {
      statusCode: 404,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Not found' })
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Internal server error' })
    };
  }
}; 