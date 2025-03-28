import axios, { AxiosResponse } from 'axios';

const API_URL = process.env.API_URL || 'https://tqjoq9du49.execute-api.eu-central-1.amazonaws.com/v1';
const API_KEY = process.env.API_KEY || 'aByZyfe3MW93WKSbd3iNO8E1RMgedHY65Tg119XX';
let authToken: string;

// Helper function to extract relevant data from axios response
const extractResponseData = (response: AxiosResponse) => {
  return {
    status: response.status,
    data: response.data
  };
};

// Helper function to handle API errors
const handleApiError = (error: any) => {
  if (error.response) {
    return {
      status: error.response.status,
      data: error.response.data
    };
  }
  throw error;
};

describe('SwapIt API Tests', () => {
  // Test signup
  test('POST /auth/signup - should create a new user', async () => {
    const testEmail = `test${Date.now()}@studenti.polito.it`;
    console.log('Testing signup with email:', testEmail);

    try {
      const response = await axios.post(`${API_URL}/auth/signup`, {
        email: testEmail,
        password: 'Test123!',
        firstName: 'Test',
        lastName: 'User',
        telegramUsername: 'testuser'
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(201);
      expect(result.data.message).toBe('User created successfully');
    } catch (error) {
      const result = handleApiError(error);
      console.error('Signup error:', result);
      throw error;
    }
  });

  // Test login
  test('POST /auth/login - should login user', async () => {
    console.log('Testing login');
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email: 'test@studenti.polito.it',
        password: 'Test123!'
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(result.data.token).toBeDefined();
      authToken = result.data.token;
    } catch (error) {
      const result = handleApiError(error);
      console.error('Login error:', result);
      throw error;
    }
  });

  // Test get current user
  test('GET /auth/me - should get current user', async () => {
    console.log('Testing get current user');
    try {
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        }
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(result.data.user).toBeDefined();
    } catch (error) {
      const result = handleApiError(error);
      console.error('Get current user error:', result);
      throw error;
    }
  });

  // Test get all users
  test('GET /users - should get all users', async () => {
    console.log('Testing get all users');
    try {
      const response = await axios.get(`${API_URL}/users`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        }
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(Array.isArray(result.data.users)).toBe(true);
    } catch (error) {
      const result = handleApiError(error);
      console.error('Get all users error:', result);
      throw error;
    }
  });

  // Test create product
  test('POST /products - should create a new product', async () => {
    console.log('Testing create product');
    try {
      const response = await axios.post(`${API_URL}/products`, {
        title: 'Test Product',
        description: 'This is a test product',
        price: 10.99,
        category: 'Test',
        images: [
          {
            key: 'test-image.jpg',
            url: 'https://example.com/test-image.jpg'
          }
        ]
      }, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        }
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(201);
      expect(result.data.product).toBeDefined();
    } catch (error) {
      const result = handleApiError(error);
      console.error('Create product error:', result);
      throw error;
    }
  });

  // Test get all products
  test('GET /products - should get all products', async () => {
    console.log('Testing get all products');
    try {
      const response = await axios.get(`${API_URL}/products`);

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(Array.isArray(result.data.products)).toBe(true);
    } catch (error) {
      const result = handleApiError(error);
      console.error('Get all products error:', result);
      throw error;
    }
  });

  // Test get single product
  test('GET /products/{item_id} - should get single product', async () => {
    console.log('Testing get single product');
    try {
      // First get all products to get an ID
      const productsResponse = await axios.get(`${API_URL}/products`);
      const productId = productsResponse.data.products[0]?.id;

      if (productId) {
        const response = await axios.get(`${API_URL}/products/${productId}`);
        const result = extractResponseData(response);
        expect(result.status).toBe(200);
        expect(result.data.product).toBeDefined();
      }
    } catch (error) {
      const result = handleApiError(error);
      console.error('Get single product error:', result);
      throw error;
    }
  });

  // Test admin endpoints
  test('GET /admin - should check admin status', async () => {
    console.log('Testing admin status check');
    try {
      const response = await axios.get(`${API_URL}/admin`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        }
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(result.data.isAdmin).toBeDefined();
    } catch (error) {
      const result = handleApiError(error);
      console.error('Admin status check error:', result);
      throw error;
    }
  });

  // Test admin users endpoint
  test('GET /admin/users - should get all users (admin only)', async () => {
    console.log('Testing admin users endpoint');
    try {
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'x-api-key': API_KEY
        }
      });

      const result = extractResponseData(response);
      expect(result.status).toBe(200);
      expect(Array.isArray(result.data.users)).toBe(true);
    } catch (error) {
      const result = handleApiError(error);
      console.error('Admin users endpoint error:', result);
      throw error;
    }
  });
}); 