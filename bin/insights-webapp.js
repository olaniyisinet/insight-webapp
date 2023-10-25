#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("aws-cdk-lib");
const insights_webapp_stack_1 = require("../lib/insights-webapp-stack");
const insights_webapp_pipeline_1 = require("../lib/insights-webapp-pipeline");
const build_config_1 = require("../lib/build-config");
const app = new cdk.App();
const buildConfig = (0, build_config_1.getConfig)(app);
if (buildConfig.pipelineMode) {
    // production and test environments getting created thought the pipeline
    // So, prifixing the pipeline as 'Prod'
    // run the pieline mode via [cdk deploy/destroy -c pipeline=true]
    const pipelineName = 'ProdInsightsWebappPipeline';
    new insights_webapp_pipeline_1.InsightsWebappPipeline(app, pipelineName, buildConfig, {
        env: {
            account: buildConfig.awsAccountId,
            region: buildConfig.region
        }
    });
    app.synth();
}
else {
    // if not piepline mode then create the corresponding environment manually
    const stackId = `${buildConfig.envPrefix}WebappStack`;
    new insights_webapp_stack_1.InsightsWebappStack(app, stackId, buildConfig, {
        stackName: stackId,
        env: {
            account: buildConfig.awsAccountId,
            region: buildConfig.region
        }
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMtd2ViYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zaWdodHMtd2ViYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLG1DQUFtQztBQUNuQyx3RUFBbUU7QUFDbkUsOEVBQXlFO0FBQ3pFLHNEQUFnRDtBQUVoRCxNQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxHQUFHLEVBQUUsQ0FBQztBQUMxQixNQUFNLFdBQVcsR0FBRyxJQUFBLHdCQUFTLEVBQUMsR0FBRyxDQUFDLENBQUM7QUFFbkMsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO0lBQzFCLHdFQUF3RTtJQUN4RSx1Q0FBdUM7SUFDdkMsaUVBQWlFO0lBQ2pFLE1BQU0sWUFBWSxHQUFHLDRCQUE0QixDQUFDO0lBQ2xELElBQUksaURBQXNCLENBQUMsR0FBRyxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUU7UUFDdkQsR0FBRyxFQUFFO1lBQ0wsT0FBTyxFQUFFLFdBQVcsQ0FBQyxZQUFZO1lBQ2pDLE1BQU0sRUFBRSxXQUFXLENBQUMsTUFBTTtTQUN6QjtLQUNKLENBQUMsQ0FBQztJQUVILEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztDQUVmO0tBQU07SUFDSCwwRUFBMEU7SUFDMUUsTUFBTSxPQUFPLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxhQUFhLENBQUM7SUFDdEQsSUFBSSwyQ0FBbUIsQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtRQUMvQyxTQUFTLEVBQUUsT0FBTztRQUNsQixHQUFHLEVBQUU7WUFDTCxPQUFPLEVBQUUsV0FBVyxDQUFDLFlBQVk7WUFDakMsTUFBTSxFQUFFLFdBQVcsQ0FBQyxNQUFNO1NBQ3pCO0tBQ0osQ0FBQyxDQUFDO0NBQ04iLCJzb3VyY2VzQ29udGVudCI6WyIjIS91c3IvYmluL2VudiBub2RlXG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgSW5zaWdodHNXZWJhcHBTdGFjayB9IGZyb20gJy4uL2xpYi9pbnNpZ2h0cy13ZWJhcHAtc3RhY2snO1xuaW1wb3J0IHsgSW5zaWdodHNXZWJhcHBQaXBlbGluZSB9IGZyb20gJy4uL2xpYi9pbnNpZ2h0cy13ZWJhcHAtcGlwZWxpbmUnO1xuaW1wb3J0IHsgZ2V0Q29uZmlnIH0gZnJvbSAnLi4vbGliL2J1aWxkLWNvbmZpZyc7XG5cbmNvbnN0IGFwcCA9IG5ldyBjZGsuQXBwKCk7XG5jb25zdCBidWlsZENvbmZpZyA9IGdldENvbmZpZyhhcHApO1xuXG5pZiAoYnVpbGRDb25maWcucGlwZWxpbmVNb2RlKSB7XG4gICAgLy8gcHJvZHVjdGlvbiBhbmQgdGVzdCBlbnZpcm9ubWVudHMgZ2V0dGluZyBjcmVhdGVkIHRob3VnaHQgdGhlIHBpcGVsaW5lXG4gICAgLy8gU28sIHByaWZpeGluZyB0aGUgcGlwZWxpbmUgYXMgJ1Byb2QnXG4gICAgLy8gcnVuIHRoZSBwaWVsaW5lIG1vZGUgdmlhIFtjZGsgZGVwbG95L2Rlc3Ryb3kgLWMgcGlwZWxpbmU9dHJ1ZV1cbiAgICBjb25zdCBwaXBlbGluZU5hbWUgPSAnUHJvZEluc2lnaHRzV2ViYXBwUGlwZWxpbmUnO1xuICAgIG5ldyBJbnNpZ2h0c1dlYmFwcFBpcGVsaW5lKGFwcCwgcGlwZWxpbmVOYW1lLCBidWlsZENvbmZpZywge1xuICAgICAgICBlbnY6IHtcbiAgICAgICAgYWNjb3VudDogYnVpbGRDb25maWcuYXdzQWNjb3VudElkLFxuICAgICAgICByZWdpb246IGJ1aWxkQ29uZmlnLnJlZ2lvblxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBhcHAuc3ludGgoKTtcblxufSBlbHNlIHtcbiAgICAvLyBpZiBub3QgcGllcGxpbmUgbW9kZSB0aGVuIGNyZWF0ZSB0aGUgY29ycmVzcG9uZGluZyBlbnZpcm9ubWVudCBtYW51YWxseVxuICAgIGNvbnN0IHN0YWNrSWQgPSBgJHtidWlsZENvbmZpZy5lbnZQcmVmaXh9V2ViYXBwU3RhY2tgO1xuICAgIG5ldyBJbnNpZ2h0c1dlYmFwcFN0YWNrKGFwcCwgc3RhY2tJZCwgYnVpbGRDb25maWcsIHtcbiAgICAgICAgc3RhY2tOYW1lOiBzdGFja0lkLFxuICAgICAgICBlbnY6IHtcbiAgICAgICAgYWNjb3VudDogYnVpbGRDb25maWcuYXdzQWNjb3VudElkLFxuICAgICAgICByZWdpb246IGJ1aWxkQ29uZmlnLnJlZ2lvblxuICAgICAgICB9XG4gICAgfSk7XG59XG4iXX0=