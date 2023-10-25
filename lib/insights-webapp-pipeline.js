"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsWebappPipeline = void 0;
const cdk = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const pipelines_1 = require("aws-cdk-lib/pipelines");
const insights_webapp_stage_1 = require("./insights-webapp-stage");
const build_config_1 = require("./build-config");
class InsightsWebappPipeline extends cdk.Stack {
    constructor(app, pipelineName, buildConfig, props) {
        super(app, pipelineName, props);
        //Create code pipeline artifact bucket
        const artifactBucket = new s3.Bucket(this, 'artifactBucket', {
            versioned: false,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
        });
        //Create code pipeline
        const pipeline = new pipelines_1.CodePipeline(this, pipelineName, {
            pipelineName: pipelineName,
            artifactBucket: artifactBucket,
            synth: new pipelines_1.ShellStep('Synth', {
                input: pipelines_1.CodePipelineSource.gitHub('RE-24-com/insights-webapp', 'prod-v1', {
                    authentication: cdk.SecretValue.secretsManager('github-token', {
                        jsonField: 'github-token'
                    })
                }),
                commands: ['npm ci', 'npm install -g aws-cdk', 'cdk synth -c pipeline=true', 'npm run build']
            }),
            dockerEnabledForSynth: true
        });
        const testBuildConfig = (0, build_config_1.getConfigByEnv)("test", app);
        const testStageId = 'TestEnvStage';
        const testStage = pipeline.addStage(new insights_webapp_stage_1.InsightsWebappStage(this, testStageId, testBuildConfig, props));
        //Add manual aproval before prod
        testStage.addPost(new pipelines_1.ManualApprovalStep('Manual Approval Before Production'));
        // Production envioranment eployment
        const prodBuildConfig = (0, build_config_1.getConfigByEnv)("prod", app);
        const prodStageId = 'ProdEnvStage';
        const prodStage = pipeline.addStage(new insights_webapp_stage_1.InsightsWebappStage(this, prodStageId, prodBuildConfig, props));
    }
}
exports.InsightsWebappPipeline = InsightsWebappPipeline;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMtd2ViYXBwLXBpcGVsaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zaWdodHMtd2ViYXBwLXBpcGVsaW5lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMscURBQXdHO0FBQ3hHLG1FQUE4RDtBQUM5RCxpREFBNkQ7QUFFN0QsTUFBYSxzQkFBdUIsU0FBUSxHQUFHLENBQUMsS0FBSztJQUNqRCxZQUFZLEdBQVksRUFBRSxZQUFvQixFQUFFLFdBQXdCLEVBQUUsS0FBc0I7UUFDNUYsS0FBSyxDQUFDLEdBQUcsRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFaEMsc0NBQXNDO1FBQ3RDLE1BQU0sY0FBYyxHQUFHLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDekQsU0FBUyxFQUFFLEtBQUs7WUFDaEIsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxpQkFBaUIsRUFBRSxJQUFJO1lBQ3ZCLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTO1NBQ3BELENBQUMsQ0FBQztRQUVILHNCQUFzQjtRQUN0QixNQUFNLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUNsRCxZQUFZLEVBQUUsWUFBWTtZQUMxQixjQUFjLEVBQUUsY0FBYztZQUM5QixLQUFLLEVBQUUsSUFBSSxxQkFBUyxDQUFDLE9BQU8sRUFBRTtnQkFDMUIsS0FBSyxFQUFFLDhCQUFrQixDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRSxTQUFTLEVBQUU7b0JBQ3JFLGNBQWMsRUFBRSxHQUFHLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxjQUFjLEVBQUU7d0JBQzNELFNBQVMsRUFBRSxjQUFjO3FCQUMxQixDQUFDO2lCQUNQLENBQUM7Z0JBQ0YsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFLHdCQUF3QixFQUFFLDRCQUE0QixFQUFFLGVBQWUsQ0FBQzthQUNoRyxDQUNBO1lBQ0QscUJBQXFCLEVBQUUsSUFBSTtTQUM5QixDQUFDLENBQUM7UUFFSCxNQUFNLGVBQWUsR0FBRyxJQUFBLDZCQUFjLEVBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sV0FBVyxHQUFHLGNBQWMsQ0FBQztRQUNuQyxNQUFNLFNBQVMsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksMkNBQW1CLENBQUMsSUFBSSxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUV4RyxnQ0FBZ0M7UUFDaEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLDhCQUFrQixDQUFDLG1DQUFtQyxDQUFDLENBQUMsQ0FBQztRQUUvRSxvQ0FBb0M7UUFDcEMsTUFBTSxlQUFlLEdBQUcsSUFBQSw2QkFBYyxFQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRCxNQUFNLFdBQVcsR0FBRyxjQUFjLENBQUM7UUFDbkMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLDJDQUFtQixDQUFDLElBQUksRUFBRSxXQUFXLEVBQUUsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDNUcsQ0FBQztDQUNKO0FBeENELHdEQXdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgQ29kZVBpcGVsaW5lLCBDb2RlUGlwZWxpbmVTb3VyY2UsIFNoZWxsU3RlcCwgTWFudWFsQXBwcm92YWxTdGVwIH0gZnJvbSAnYXdzLWNkay1saWIvcGlwZWxpbmVzJztcbmltcG9ydCB7IEluc2lnaHRzV2ViYXBwU3RhZ2UgfSBmcm9tICcuL2luc2lnaHRzLXdlYmFwcC1zdGFnZSc7XG5pbXBvcnQgeyBCdWlsZENvbmZpZywgZ2V0Q29uZmlnQnlFbnYgfSBmcm9tICcuL2J1aWxkLWNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBJbnNpZ2h0c1dlYmFwcFBpcGVsaW5lIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgICBjb25zdHJ1Y3RvcihhcHA6IGNkay5BcHAsIHBpcGVsaW5lTmFtZTogc3RyaW5nLCBidWlsZENvbmZpZzogQnVpbGRDb25maWcsIHByb3BzPzogY2RrLlN0YWNrUHJvcHMpIHtcbiAgICAgICAgc3VwZXIoYXBwLCBwaXBlbGluZU5hbWUsIHByb3BzKTtcblxuICAgICAgICAvL0NyZWF0ZSBjb2RlIHBpcGVsaW5lIGFydGlmYWN0IGJ1Y2tldFxuICAgICAgICBjb25zdCBhcnRpZmFjdEJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ2FydGlmYWN0QnVja2V0Jywge1xuICAgICAgICAgICAgdmVyc2lvbmVkOiBmYWxzZSxcbiAgICAgICAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICAgICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICAgICAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTExcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9DcmVhdGUgY29kZSBwaXBlbGluZVxuICAgICAgICBjb25zdCBwaXBlbGluZSA9IG5ldyBDb2RlUGlwZWxpbmUodGhpcywgcGlwZWxpbmVOYW1lLCB7XG4gICAgICAgICAgICBwaXBlbGluZU5hbWU6IHBpcGVsaW5lTmFtZSxcbiAgICAgICAgICAgIGFydGlmYWN0QnVja2V0OiBhcnRpZmFjdEJ1Y2tldCxcbiAgICAgICAgICAgIHN5bnRoOiBuZXcgU2hlbGxTdGVwKCdTeW50aCcsIHtcbiAgICAgICAgICAgICAgICBpbnB1dDogQ29kZVBpcGVsaW5lU291cmNlLmdpdEh1YignUkUtMjQtY29tL2luc2lnaHRzLXdlYmFwcCcsICdwcm9kLXYxJywge1xuICAgICAgICAgICAgICAgICAgICBhdXRoZW50aWNhdGlvbjogY2RrLlNlY3JldFZhbHVlLnNlY3JldHNNYW5hZ2VyKCdnaXRodWItdG9rZW4nLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBqc29uRmllbGQ6ICdnaXRodWItdG9rZW4nXG4gICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBjb21tYW5kczogWyducG0gY2knLCAnbnBtIGluc3RhbGwgLWcgYXdzLWNkaycsICdjZGsgc3ludGggLWMgcGlwZWxpbmU9dHJ1ZScsICducG0gcnVuIGJ1aWxkJ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgICksXG4gICAgICAgICAgICBkb2NrZXJFbmFibGVkRm9yU3ludGg6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdGVzdEJ1aWxkQ29uZmlnID0gZ2V0Q29uZmlnQnlFbnYoXCJ0ZXN0XCIsIGFwcCk7XG4gICAgICAgIGNvbnN0IHRlc3RTdGFnZUlkID0gJ1Rlc3RFbnZTdGFnZSc7XG4gICAgICAgIGNvbnN0IHRlc3RTdGFnZSA9IHBpcGVsaW5lLmFkZFN0YWdlKG5ldyBJbnNpZ2h0c1dlYmFwcFN0YWdlKHRoaXMsIHRlc3RTdGFnZUlkLCB0ZXN0QnVpbGRDb25maWcsIHByb3BzKSk7XG5cbiAgICAgICAgLy9BZGQgbWFudWFsIGFwcm92YWwgYmVmb3JlIHByb2RcbiAgICAgICAgdGVzdFN0YWdlLmFkZFBvc3QobmV3IE1hbnVhbEFwcHJvdmFsU3RlcCgnTWFudWFsIEFwcHJvdmFsIEJlZm9yZSBQcm9kdWN0aW9uJykpO1xuXG4gICAgICAgIC8vIFByb2R1Y3Rpb24gZW52aW9yYW5tZW50IGVwbG95bWVudFxuICAgICAgICBjb25zdCBwcm9kQnVpbGRDb25maWcgPSBnZXRDb25maWdCeUVudihcInByb2RcIiwgYXBwKTtcbiAgICAgICAgY29uc3QgcHJvZFN0YWdlSWQgPSAnUHJvZEVudlN0YWdlJztcbiAgICAgICAgY29uc3QgcHJvZFN0YWdlID0gcGlwZWxpbmUuYWRkU3RhZ2UobmV3IEluc2lnaHRzV2ViYXBwU3RhZ2UodGhpcywgcHJvZFN0YWdlSWQsIHByb2RCdWlsZENvbmZpZywgcHJvcHMpKTtcbiAgICB9XG59Il19