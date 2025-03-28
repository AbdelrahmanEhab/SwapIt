import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Set default API URL if not provided
if (!process.env.API_URL) {
  process.env.API_URL = 'https://tqjoq9du49.execute-api.eu-central-1.amazonaws.com/v1';
}

// Set default API key if not provided
if (!process.env.API_KEY) {
  process.env.API_KEY = 'aByZyfe3MW93WKSbd3iNO8E1RMgedHY65Tg119XX';
} 