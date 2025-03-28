import { StackProps } from 'aws-cdk-lib';

export interface ICdkTsApiGatewayStackProps extends StackProps {
    /**
     * Lambda function configuration
     */
    lambda: {
        /** Lambda function description */
        desc: string;
        /** Memory allocation in MB */
        memory: number;
        /** Timeout in seconds */
        timeout: number;
    };

    /**
     * API Gateway configuration
     */
    api: {
        /** API name */
        name: string;
        /** API description */
        desc: string;
        /** API model name */
        modelName: string;
        /** API root resource path */
        rootResource: string;
    };

    /**
     * Usage plan configuration
     */
    usageplan: {
        /** Usage plan name */
        name: string;
        /** Usage plan description */
        desc: string;
        /** Daily request limit */
        limit: number;
        /** Requests per second */
        rateLimit: number;
        /** Maximum concurrent requests */
        burstLimit: number;
    };

    /**
     * API key configuration
     */
    apiKey: {
        /** API key name */
        name: string;
        /** API key description */
        desc: string;
    };

    /**
     * Request validators configuration
     */
    validators: {
        /** Validator for request body only */
        bodyValidator: IValidators;
        /** Validator for request parameters only */
        paramValidator: IValidators;
        /** Validator for both body and parameters */
        bodyAndParamValidator: IValidators;
    };
}

/**
 * Request validator configuration
 */
export interface IValidators {
    /** Name of the request validator */
    requestValidatorName: string;
    /** Whether to validate request body */
    validateRequestBody: boolean;
    /** Whether to validate request parameters */
    validateRequestParameters: boolean;
}