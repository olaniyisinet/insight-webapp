import * as cdk from 'aws-cdk-lib';
import { Construct } from "constructs";
import { InsightsWebappStack } from './insights-webapp-stack';
import { BuildConfig } from './build-config';


export class InsightsWebappStage extends cdk.Stage {

    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: cdk.StageProps) {
        super(scope, id, props);
        const stackId = `${buildConfig.envPrefix}WebappStack`;
        new InsightsWebappStack(this, stackId, buildConfig, {
            stackName: stackId,
            env: {
                account: buildConfig.awsAccountId,
                region: buildConfig.region
            }
        });
    }
}