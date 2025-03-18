import { ICdkTsApiGatewayStackProps } from './stack-config-types';

const environmentConfig: ICdkTsApiGatewayStackProps = {
  tags: {
    Developer: 'Abdelrahman Ahmed',
    Application: 'SwapItApiGateway',
  },
  lambda: {
    desc: 'Lambda resolver used for Api Gateway',
    memory: 256,
    timeout: 30,
  },
  api: {
    name: 'SwapIt-API',
    desc: 'Rest API for SwapIt marketplace',
    modelName: 'DemoModel',
    rootResource: 'v1',
  },
  usageplan: {
    name: 'demo-usage-plan',
    desc: 'Usage plan used for Api Gateway',
    limit: 100, // per day
    rateLimit: 20,
    burstLimit: 10,
  },
  apiKey: {
    name: 'api-key',
    desc: 'Api Key',
  },
  validators: {
    bodyValidator: {
        requestValidatorName: 'demo-body-validator',
        validateRequestBody: true,
        validateRequestParameters: false,
    },
    paramValidator: {
        requestValidatorName: 'demo-param-validator',
        validateRequestBody: false,
        validateRequestParameters: true,
    },
    bodyAndParamValidator: {
        requestValidatorName: 'demo-body-and-param-validator',
        validateRequestBody: true,
        validateRequestParameters: true,
    },
  }
};

export default environmentConfig;