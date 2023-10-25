#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { InsightsWebappStack } from '../lib/insights-webapp-stack';
import { InsightsWebappPipeline } from '../lib/insights-webapp-pipeline';
import { getConfig } from '../lib/build-config';

const app = new cdk.App();
const buildConfig = getConfig(app);

if (buildConfig.pipelineMode) {
    // production and test environments getting created thought the pipeline
    // So, prifixing the pipeline as 'Prod'
    // run the pieline mode via [cdk deploy/destroy -c pipeline=true]
    const pipelineName = 'ProdInsightsWebappPipeline';
    new InsightsWebappPipeline(app, pipelineName, buildConfig, {
        env: {
        account: buildConfig.awsAccountId,
        region: buildConfig.region
        }
    });

    app.synth();

} else {
    // if not piepline mode then create the corresponding environment manually
    const stackId = `${buildConfig.envPrefix}WebappStack`;
    new InsightsWebappStack(app, stackId, buildConfig, {
        stackName: stackId,
        env: {
        account: buildConfig.awsAccountId,
        region: buildConfig.region
        }
    });
}
