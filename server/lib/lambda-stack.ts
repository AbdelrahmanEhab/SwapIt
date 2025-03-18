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

    // Lambda funtions for resolving API requests for each API endpoint
    
    const authResolver = new lambda.Function(this, 'LambdaResolver', {
      functionName: 'Authentication Lambda Resolver',
      description: props.lambda.desc,
      handler: 'auth.handler',
      code: new lambda.AssetCode('dist/src/auth'),
      runtime: lambda.Runtime.NODEJS_LATEST,
      memorySize: props.lambda.memory,
      timeout: cdk.Duration.seconds(props.lambda.timeout)
    })

    const authIntegration = new apigateway.LambdaIntegration(authResolver);

    const userResolver = new lambda.Function(this, 'LambdaResolver', {
      functionName: 'Users Lambda Resolver',
      description: props.lambda.desc,
      handler: 'users.handler',
      code: new lambda.AssetCode('dist/src/users'),
      runtime: lambda.Runtime.NODEJS_LATEST,
      memorySize: props.lambda.memory,
      timeout: cdk.Duration.seconds(props.lambda.timeout)
    })

    const userIntegration = new apigateway.LambdaIntegration(userResolver);

    const productResolver = new lambda.Function(this, 'LambdaResolver', {
      functionName: 'Products Lambda Resolver',
      description: props.lambda.desc,
      handler: 'products.handler',
      code: new lambda.AssetCode('dist/src/products'),
      runtime: lambda.Runtime.NODEJS_LATEST,
      memorySize: props.lambda.memory,
      timeout: cdk.Duration.seconds(props.lambda.timeout)
    })

    const productIntegration = new apigateway.LambdaIntegration(productResolver);

    const adminResolver = new lambda.Function(this, 'LambdaResolver', {
      functionName: 'Admin Lambda Resolver',
      description: props.lambda.desc,
      handler: 'admin.handler',
      code: new lambda.AssetCode('dist/src/admin'),
      runtime: lambda.Runtime.NODEJS_LATEST,
      memorySize: props.lambda.memory,
      timeout: cdk.Duration.seconds(props.lambda.timeout)
    })

    const adminIntegration = new apigateway.LambdaIntegration(adminResolver);

    // DynamoDB Tables
    const usersTable = new dynamodb.Table(this, 'UsersTable', {
      partitionKey: { name: 'email', type: dynamodb.AttributeType.STRING },
      tableName: 'users',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const productsTable = new dynamodb.Table(this, 'ProductsTable', {
      partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'timestamp', type: dynamodb.AttributeType.NUMBER },
      tableName: 'ProductsTable',
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    // S3 Bucket
    const bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const lambdaFunctions = [authResolver, adminResolver, userResolver, productResolver];

    lambdaFunctions.forEach(lambdaFunc => {
        usersTable.grantReadWriteData(lambdaFunc);
        productsTable.grantReadWriteData(lambdaFunc);
        bucket.grantReadWrite(lambdaFunc);
    });
    
  }
}