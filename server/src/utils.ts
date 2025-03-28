import { APIGatewayProxyResult } from 'aws-lambda';
import * as jwt from 'jsonwebtoken';

export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Origin,Accept',
  'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT,PATCH,DELETE',
  'Access-Control-Allow-Credentials': 'true'
};

export const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export interface DecodedToken {
  email: string;
  isAdmin: boolean;
}

export const verifyToken = (token: string): DecodedToken | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as DecodedToken;
  } catch (error) {
    return null;
  }
};

export const handleError = (error: any, statusCode = 500): APIGatewayProxyResult => {
  console.error('Error:', error);
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify({
      message: statusCode === 500 ? 'Internal server error' : error.message,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    })
  };
};

export const handleSuccess = (data: any, statusCode = 200): APIGatewayProxyResult => {
  return {
    statusCode,
    headers: corsHeaders,
    body: JSON.stringify(data)
  };
};

export const handleOptions = (): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: corsHeaders,
    body: ''
  };
};

export const isValidEmail = (email: string): boolean => {
  return email.endsWith('@studenti.polito.it');
}; 