import * as cdk from 'aws-cdk-lib';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import environmentConfig from '../bin/stack-config'
import { ICdkTsApiGatewayStackProps, IValidators } from '../bin/stack-config-types';
import { LambdaStack } from './lambda-stack';
import { Construct } from 'constructs';

export class ApiStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: ICdkTsApiGatewayStackProps) {
    super(scope, id, props);

    const lambdaStack = new LambdaStack(this, 'LambdaStack', environmentConfig);
    const {authIntegration, productIntegration, userIntegration, adminIntegration} = lambdaStack;

    // API Gateway RestAPI
    const api = new apigateway.RestApi(this, 'RestAPI', {
        restApiName: props.api.name,
        description: props.api.desc,
        defaultCorsPreflightOptions: {
            allowOrigins: apigateway.Cors.ALL_ORIGINS, // to be set to my website only
            allowMethods: ['GET', 'POST', 'PATCH', 'DELETE']
        },
    })

    const createValidator = (input: IValidators) => new apigateway.RequestValidator(
      this,
      input.requestValidatorName,
      {
        restApi: api,
        requestValidatorName: input.requestValidatorName,
        validateRequestBody: input.validateRequestBody,
        validateRequestParameters: input.validateRequestParameters
      },
    );

    const bodyValidator = createValidator(props.validators.bodyValidator)
    const paramValidator = createValidator(props.validators.paramValidator)
    const bodyAndParamValidator = createValidator(props.validators.bodyAndParamValidator)

    
    // Root Resource
    const rootResource = api.root.addResource(props.api.rootResource)
    
    // Endpoint Resources
    const usersResource = rootResource.addResource('users')
    const adminResource = rootResource.addResource('admin')
    const productsResource = rootResource.addResource('products')
    const authResource = rootResource.addResource('auth')

    // Users Methods
    usersResource.addMethod('GET', userIntegration, {
        operationName: "Get All Users",
        apiKeyRequired: false, // Public
    });

    usersResource.addMethod('POST', userIntegration, {
        operationName: "Create User",
        apiKeyRequired: false, // Public
    });

    // Products Methods
    productsResource.addMethod('GET', productIntegration, {
        operationName: "Get All Products",
        apiKeyRequired: false, // Public
    });

    productsResource.addMethod('POST', productIntegration, {
        operationName: "Post Product",
        apiKeyRequired: false, // Public
    });

    const items = productsResource.addResource('{item_id}');

    items.addMethod('GET', productIntegration, {
        operationName: "Get Product By Id",
        apiKeyRequired: false, // Public
    });

    items.addMethod('PATCH', productIntegration, {
        operationName: "Patch Product By Id",
        apiKeyRequired: false, // Public
    });

    items.addMethod("DELETE", productIntegration, {
        operationName: "Delete Product By Id",
        apiKeyRequired: false, // Public
    });

    // Auth Methods for Login and Signup
    const loginResource = authResource.addResource('login');
    const signupResource = authResource.addResource('signup');
    const meResource = authResource.addResource('me');  // New endpoint for current user data

    loginResource.addMethod('POST', authIntegration, {
        operationName: "User Login",
        apiKeyRequired: false, // Public
    });

    signupResource.addMethod('POST', authIntegration, {
        operationName: "User Signup",
        apiKeyRequired: false, // Public
    });

    meResource.addMethod('GET', authIntegration, {
        operationName: "Get Current User Info",
        apiKeyRequired: true, // Requires authentication
    });

    // Admin Methods
    adminResource.addMethod('GET', adminIntegration, {
        operationName: "Get Admin Status",
        apiKeyRequired: true, // Admin only
    });

    // Admin - Manage Users
    const usersAdmin = adminResource.addResource('users');

    usersAdmin.addMethod('GET', adminIntegration, {
        operationName: "Get All Users (Admin)",
        apiKeyRequired: true, // Admin only
    });

    const userAdminItem = usersAdmin.addResource('{user_id}');

    userAdminItem.addMethod('DELETE', adminIntegration, {
        operationName: "Delete User By Id (Admin)",
        apiKeyRequired: true, // Admin only
    });

    // Admin - Assign User to Admin
    adminResource.addMethod('POST', adminIntegration, {
        operationName: "Assign User as Admin",
        apiKeyRequired: true, // Admin only
    });

    // API Usageplan
    const usageplan = api.addUsagePlan('UsagePlan', {
        name: props.usageplan.name,
        description: props.usageplan.desc,
        apiStages: [{
          api: api,
          stage: api.deploymentStage,
        }],
        quota: {
          limit: props.usageplan.limit,
          period: apigateway.Period.DAY,
        },
        throttle: {
          rateLimit: props.usageplan.rateLimit,
          burstLimit: props.usageplan.burstLimit,
        },
      });
  
    // API Key for authorization
    const apiKey = api.addApiKey('ApiKey', {
      apiKeyName: props.apiKey.name,
      description: props.apiKey.desc,
    });
    
    usageplan.addApiKey(apiKey);
  }
}