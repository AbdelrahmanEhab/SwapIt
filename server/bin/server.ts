#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import environmentConfig from './stack-config'
import { ApiStack } from '../lib/api-stack';

const app = new cdk.App();
new ApiStack(app, 'SwapItAPI', environmentConfig); 