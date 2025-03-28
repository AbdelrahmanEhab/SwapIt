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
        binaryMediaTypes: ['*/*'],
        defaultCorsPreflightOptions: {
            allowOrigins: apigateway.Cors.ALL_ORIGINS,
            allowMethods: apigateway.Cors.ALL_METHODS,
            allowHeaders: [
                'Content-Type',
                'X-Amz-Date',
                'Authorization',
                'X-Api-Key',
                'X-Amz-Security-Token',
                'Access-Control-Allow-Origin',
                'Access-Control-Allow-Headers',
                'Access-Control-Allow-Methods',
                'Accept',
                'Origin',
                'Host',
                'Referer',
                'User-Agent'
            ],
            allowCredentials: true,
            maxAge: cdk.Duration.days(1),
        },
        deployOptions: {
            stageName: 'prod',
            tracingEnabled: true,
            dataTraceEnabled: true,
            metricsEnabled: true,
            loggingLevel: apigateway.MethodLoggingLevel.INFO,
        },
    });

    // Enable CloudWatch logging
    const logGroup = new cdk.aws_logs.LogGroup(this, 'ApiGatewayLogs', {
        retention: cdk.aws_logs.RetentionDays.ONE_WEEK,
    });

    // Response Models
    const errorModel = api.addModel('ErrorResponse', {
        contentType: 'application/json',
        modelName: 'ErrorResponse',
        schema: {
            type: apigateway.JsonSchemaType.OBJECT,
            properties: {
                message: { type: apigateway.JsonSchemaType.STRING },
                errorType: { type: apigateway.JsonSchemaType.STRING },
            },
        },
    });

    const successModel = api.addModel('SuccessResponse', {
        contentType: 'application/json',
        modelName: 'SuccessResponse',
        schema: {
            type: apigateway.JsonSchemaType.OBJECT,
            properties: {
                message: { type: apigateway.JsonSchemaType.STRING },
                data: { type: apigateway.JsonSchemaType.OBJECT },
            },
        },
    });

    // Method Response Models
    const methodResponses: apigateway.MethodResponse[] = [
        {
            statusCode: '200',
            responseModels: {
                'application/json': successModel,
            },
        },
        {
            statusCode: '400',
            responseModels: {
                'application/json': errorModel,
            },
        },
        {
            statusCode: '401',
            responseModels: {
                'application/json': errorModel,
            },
        },
        {
            statusCode: '403',
            responseModels: {
                'application/json': errorModel,
            },
        },
        {
            statusCode: '404',
            responseModels: {
                'application/json': errorModel,
            },
        },
        {
            statusCode: '500',
            responseModels: {
                'application/json': errorModel,
            },
        },
    ];

    // Request Validators
    const createValidator = (input: IValidators) => new apigateway.RequestValidator(
        this,
        input.requestValidatorName,
        {
            restApi: api,
            requestValidatorName: input.requestValidatorName,
            validateRequestBody: input.validateRequestBody,
            validateRequestParameters: input.validateRequestParameters,
        },
    );

    const bodyValidator = createValidator(props.validators.bodyValidator);
    const paramValidator = createValidator(props.validators.paramValidator);
    const bodyAndParamValidator = createValidator(props.validators.bodyAndParamValidator);

    // Root Resource
    const rootResource = api.root.addResource(props.api.rootResource);
    
    // Endpoint Resources
    const usersResource = rootResource.addResource('users');
    const adminResource = rootResource.addResource('admin');
    const productsResource = rootResource.addResource('products');
    const authResource = rootResource.addResource('auth');

    // Common method options
    const getMethodOptions: apigateway.MethodOptions = {
        methodResponses,
        requestValidator: paramValidator,
        apiKeyRequired: false,
    };

    const postMethodOptions: apigateway.MethodOptions = {
        methodResponses,
        requestValidator: bodyValidator,
        apiKeyRequired: false,
    };

    const protectedMethodOptions: apigateway.MethodOptions = {
        methodResponses,
        requestValidator: bodyValidator,
        apiKeyRequired: true,
    };

    // Users Methods
    usersResource.addMethod('GET', userIntegration, getMethodOptions);
    usersResource.addMethod('POST', userIntegration, postMethodOptions);

    // Products Methods
    productsResource.addMethod('GET', productIntegration, getMethodOptions);
    productsResource.addMethod('POST', productIntegration, protectedMethodOptions);

    const items = productsResource.addResource('{item_id}');
    items.addMethod('GET', productIntegration, getMethodOptions);
    items.addMethod('PATCH', productIntegration, protectedMethodOptions);
    items.addMethod('DELETE', productIntegration, protectedMethodOptions);

    // Auth Methods
    const loginResource = authResource.addResource('login');
    const signupResource = authResource.addResource('signup');
    const meResource = authResource.addResource('me');

    loginResource.addMethod('POST', authIntegration, postMethodOptions);
    signupResource.addMethod('POST', authIntegration, postMethodOptions);
    meResource.addMethod('GET', authIntegration, protectedMethodOptions);

    // Admin Methods
    adminResource.addMethod('GET', adminIntegration, protectedMethodOptions);
    adminResource.addMethod('POST', adminIntegration, protectedMethodOptions);

    const usersAdmin = adminResource.addResource('users');
    usersAdmin.addMethod('GET', adminIntegration, protectedMethodOptions);

    const userAdminItem = usersAdmin.addResource('{user_id}');
    userAdminItem.addMethod('DELETE', adminIntegration, protectedMethodOptions);

    // API Usage Plan
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

    // API Key
    const apiKey = api.addApiKey('ApiKey', {
        apiKeyName: props.apiKey.name,
        description: props.apiKey.desc
    });
    
    usageplan.addApiKey(apiKey);

    // Output the API endpoint URL
    new cdk.CfnOutput(this, 'ApiEndpoint', {
        value: api.url,
        description: 'API Gateway endpoint URL',
    });
  }
}