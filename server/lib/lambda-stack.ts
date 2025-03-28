import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import {ICdkTsApiGatewayStackProps} from '../bin/stack-config-types';
import { Construct } from 'constructs';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';

export class LambdaStack extends cdk.Stack {
    public readonly authIntegration: apigateway.LambdaIntegration;
    public readonly userIntegration: apigateway.LambdaIntegration;
    public readonly productIntegration: apigateway.LambdaIntegration;
    public readonly adminIntegration: apigateway.LambdaIntegration;

    constructor(scope: Construct, id: string, props: ICdkTsApiGatewayStackProps) {
        super(scope, id, props);

        // DynamoDB Tables
        const usersTable = new dynamodb.Table(this, 'UsersTable', {
            partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
            tableName: 'users',
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
        });

        const productsTable = new dynamodb.Table(this, 'ProductsTable', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
            tableName: 'ProductsTable',
            billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY, // For development only
        });

        // S3 Bucket for product images
        const bucket = new s3.Bucket(this, 'ProductImagesBucket', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            cors: [{
                allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT, s3.HttpMethods.POST],
                allowedOrigins: ['*'], // TODO: Restrict to your domain
                allowedHeaders: ['*'],
            }],
        });

        // Common Lambda configuration
        const commonLambdaProps = {
            runtime: lambda.Runtime.NODEJS_18_X,
            memorySize: props.lambda.memory,
            timeout: cdk.Duration.seconds(props.lambda.timeout),
            environment: {
                USERS_TABLE: usersTable.tableName,
                PRODUCTS_TABLE: productsTable.tableName,
                BUCKET_NAME: bucket.bucketName,
                JWT_SECRET: process.env.JWT_SECRET || 'your-secret-key', // TODO: Use AWS Secrets Manager
            },
            code: lambda.Code.fromAsset('dist/src'),
        };

        // Lambda functions with unique logical IDs
        const authResolver = new lambda.Function(this, 'AuthResolver', {
            ...commonLambdaProps,
            functionName: 'SwapIt-Auth-Lambda',
            description: 'Authentication Lambda handler',
            handler: 'auth.handler',
        });

        const userResolver = new lambda.Function(this, 'UserResolver', {
            ...commonLambdaProps,
            functionName: 'SwapIt-User-Lambda',
            description: 'User management Lambda handler',
            handler: 'users.handler',
        });

        const productResolver = new lambda.Function(this, 'ProductResolver', {
            ...commonLambdaProps,
            functionName: 'SwapIt-Product-Lambda',
            description: 'Product management Lambda handler',
            handler: 'products.handler',
        });

        const adminResolver = new lambda.Function(this, 'AdminResolver', {
            ...commonLambdaProps,
            functionName: 'SwapIt-Admin-Lambda',
            description: 'Admin management Lambda handler',
            handler: 'admin.handler',
        });

        // Grant permissions
        const lambdaFunctions = [authResolver, adminResolver, userResolver, productResolver];
        lambdaFunctions.forEach(lambdaFunc => {
            usersTable.grantReadWriteData(lambdaFunc);
            productsTable.grantReadWriteData(lambdaFunc);
            bucket.grantReadWrite(lambdaFunc);
        });

        // Create Lambda integrations with proxy configuration
        this.authIntegration = new apigateway.LambdaIntegration(authResolver, {
            proxy: true,
            allowTestInvoke: true,
        });

        this.userIntegration = new apigateway.LambdaIntegration(userResolver, {
            proxy: true,
            allowTestInvoke: true,
        });

        this.productIntegration = new apigateway.LambdaIntegration(productResolver, {
            proxy: true,
            allowTestInvoke: true,
        });

        this.adminIntegration = new apigateway.LambdaIntegration(adminResolver, {
            proxy: true,
            allowTestInvoke: true,
        });
    }
}