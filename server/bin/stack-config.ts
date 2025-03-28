import { ICdkTsApiGatewayStackProps } from './stack-config-types';

/**
 * Environment configuration for the CDK stack
 */
const environmentConfig: ICdkTsApiGatewayStackProps = {
  tags: {
    Project: 'SwapIt',
    Environment: process.env.NODE_ENV || 'development',
    Application: 'SwapItApiGateway',
  },
  lambda: {
    desc: 'Lambda function for SwapIt API',
    memory: 512, // Increased for better performance
    timeout: 30,
  },
  api: {
    name: 'SwapIt-API',
    desc: 'REST API for SwapIt marketplace',
    modelName: 'SwapItModel',
    rootResource: 'v1',
  },
  usageplan: {
    name: 'swapit-usage-plan',
    desc: 'Usage plan for SwapIt API',
    limit: 10000, // Daily request limit
    rateLimit: 50,  // Requests per second
    burstLimit: 100, // Maximum concurrent requests
  },
  apiKey: {
    name: 'swapit-api-key',
    desc: 'API Key for SwapIt API authentication',
  },
  validators: {
    bodyValidator: {
        requestValidatorName: 'body-validator',
        validateRequestBody: true,
        validateRequestParameters: false,
    },
    paramValidator: {
        requestValidatorName: 'param-validator',
        validateRequestBody: false,
        validateRequestParameters: true,
    },
    bodyAndParamValidator: {
        requestValidatorName: 'body-and-param-validator',
        validateRequestBody: true,
        validateRequestParameters: true,
    },
  }
};

export default environmentConfig;