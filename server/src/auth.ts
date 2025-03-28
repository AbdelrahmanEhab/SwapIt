import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { DynamoDB } from 'aws-sdk';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { corsHeaders, handleError, handleSuccess, handleOptions, isValidEmail, JWT_SECRET } from './utils';

const dynamodb = new DynamoDB.DocumentClient();
const USERS_TABLE = process.env.USERS_TABLE || 'users';

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Event:', JSON.stringify(event, null, 2));
  
  try {
    const path = event.path;
    const method = event.httpMethod;

    // Handle OPTIONS requests for CORS
    if (method === 'OPTIONS') {
      return handleOptions();
    }

    // Login endpoint
    if (path.endsWith('/login') && method === 'POST') {
      return {
        body: 'test',
        statusCode: 200
      }    
      if (!event.body) {
        return handleError(new Error('Request body is required'), 400);
      }

      const { email, password } = JSON.parse(event.body);
      console.log('Login attempt for email:', email);
      
      if (!email || !password) {
        return handleError(new Error('Email and password are required'), 400);
      }

      if (!isValidEmail(email)) {
        return handleError(new Error('Email must end with @studenti.polito.it'), 400);
      }

      const params = {
        TableName: USERS_TABLE,
        Key: { email }
      };

      console.log('Querying DynamoDB with params:', JSON.stringify(params));
      const result = await dynamodb.get(params).promise();
      console.log('DynamoDB result:', JSON.stringify(result));
      
      const user = result.Item;

      if (!user) {
        return handleError(new Error('Invalid credentials'), 401);
      }

      const passwordMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', passwordMatch);

      if (!passwordMatch) {
        return handleError(new Error('Invalid credentials'), 401);
      }

      const token = jwt.sign({ email: user.email, isAdmin: user.isAdmin }, JWT_SECRET, { expiresIn: '24h' });

      // Remove sensitive data before sending response
      const { password: _, ...userWithoutPassword } = user;

      return handleSuccess({ 
        message: 'Login successful',
        token, 
        user: userWithoutPassword
      });
    }

    // Signup endpoint
    if (path.endsWith('/signup') && method === 'POST') {
      console.log('Processing signup request');
      
      if (!event.body) {
        return handleError(new Error('Request body is required'), 400);
      }

      const { email, password, firstName, lastName, telegramUsername } = JSON.parse(event.body);
      console.log('Signup attempt for email:', email);
      
      if (!isValidEmail(email)) {
        return handleError(new Error('Email must end with @studenti.polito.it'), 400);
      }
      
      // Check if user already exists
      const existingUser = await dynamodb.get({
        TableName: USERS_TABLE,
        Key: { email }
      }).promise();

      if (existingUser.Item) {
        return handleError(new Error('User already exists'), 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      
      const newUser = {
        email,
        password: hashedPassword,
        firstName,
        lastName,
        telegramUsername,
        isAdmin: false,
        createdAt: Date.now()
      };

      console.log('Creating new user:', { ...newUser, password: '[REDACTED]' });
      
      await dynamodb.put({
        TableName: USERS_TABLE,
        Item: newUser
      }).promise();

      return handleSuccess({ message: 'User created successfully' }, 201);
    }

    // Get current user endpoint
    if (path.endsWith('/me') && method === 'GET') {
      console.log('Processing get current user request');
      
      const token = event.headers.Authorization?.split(' ')[1];
      
      if (!token) {
        return handleError(new Error('No token provided'), 401);
      }

      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { email: string };
        const params = {
          TableName: USERS_TABLE,
          Key: { email: decoded.email }
        };

        console.log('Querying DynamoDB for current user:', decoded.email);
        const result = await dynamodb.get(params).promise();
        const user = result.Item;

        if (!user) {
          return handleError(new Error('User not found'), 404);
        }

        // Remove sensitive data
        const { password: _, ...userWithoutPassword } = user;

        return handleSuccess({ user: userWithoutPassword });
      } catch (error) {
        console.error('Token verification error:', error);
        return handleError(new Error('Invalid token'), 401);
      }
    }

    return handleError(new Error('Not found'), 404);
  } catch (error) {
    return handleError(error);
  }
}; 