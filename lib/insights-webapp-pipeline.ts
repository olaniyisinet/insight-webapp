import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { CodePipeline, CodePipelineSource, ShellStep, ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { InsightsWebappStage } from './insights-webapp-stage';
import { BuildConfig, getConfigByEnv } from './build-config';

export class InsightsWebappPipeline extends cdk.Stack {
    constructor(app: cdk.App, pipelineName: string, buildConfig: BuildConfig, props?: cdk.StackProps) {
        super(app, pipelineName, props);

        //Create code pipeline artifact bucket
        const artifactBucket = new s3.Bucket(this, 'artifactBucket', {
            versioned: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
        });

        //Create code pipeline
        const pipeline = new CodePipeline(this, pipelineName, {
            pipelineName: pipelineName,
            artifactBucket: artifactBucket,
            synth: new ShellStep('Synth', {
                input: CodePipelineSource.gitHub('RE-24-com/insights-webapp', 'prod-v1', {
                    authentication: cdk.SecretValue.secretsManager('github-token', {
                        jsonField: 'github-token'
                      })
                }),
                commands: ['npm ci', 'npm install -g aws-cdk', 'cdk synth -c pipeline=true', 'npm run build']
            }
            ),
            dockerEnabledForSynth: true
        });

        const testBuildConfig = getConfigByEnv("test", app);
        const testStageId = 'TestEnvStage';
        const testStage = pipeline.addStage(new InsightsWebappStage(this, testStageId, testBuildConfig, props));

        //Add manual aproval before prod
        testStage.addPost(new ManualApprovalStep('Manual Approval Before Production'));

        // Production envioranment eployment
        const prodBuildConfig = getConfigByEnv("prod", app);
        const prodStageId = 'ProdEnvStage';
        const prodStage = pipeline.addStage(new InsightsWebappStage(this, prodStageId, prodBuildConfig, props));
    }
}