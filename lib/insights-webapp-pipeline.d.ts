import * as cdk from 'aws-cdk-lib';
import { BuildConfig } from './build-config';
export declare class InsightsWebappPipeline extends cdk.Stack {
    constructor(app: cdk.App, pipelineName: string, buildConfig: BuildConfig, props?: cdk.StackProps);
}
