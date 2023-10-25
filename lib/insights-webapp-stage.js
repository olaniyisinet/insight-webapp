"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsWebappStage = void 0;
const cdk = require("aws-cdk-lib");
const insights_webapp_stack_1 = require("./insights-webapp-stack");
class InsightsWebappStage extends cdk.Stage {
    constructor(scope, id, buildConfig, props) {
        super(scope, id, props);
        const stackId = `${buildConfig.envPrefix}WebappStack`;
        new insights_webapp_stack_1.InsightsWebappStack(this, stackId, buildConfig, {
            stackName: stackId,
            env: {
                account: buildConfig.awsAccountId,
                region: buildConfig.region
            }
        });
    }
}
exports.InsightsWebappStage = InsightsWebappStage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMtd2ViYXBwLXN0YWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zaWdodHMtd2ViYXBwLXN0YWdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUVuQyxtRUFBOEQ7QUFJOUQsTUFBYSxtQkFBb0IsU0FBUSxHQUFHLENBQUMsS0FBSztJQUU5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLFdBQXdCLEVBQUUsS0FBc0I7UUFDdEYsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsTUFBTSxPQUFPLEdBQUcsR0FBRyxXQUFXLENBQUMsU0FBUyxhQUFhLENBQUM7UUFDdEQsSUFBSSwyQ0FBbUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRTtZQUNoRCxTQUFTLEVBQUUsT0FBTztZQUNsQixHQUFHLEVBQUU7Z0JBQ0QsT0FBTyxFQUFFLFdBQVcsQ0FBQyxZQUFZO2dCQUNqQyxNQUFNLEVBQUUsV0FBVyxDQUFDLE1BQU07YUFDN0I7U0FDSixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0o7QUFiRCxrREFhQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0IHsgSW5zaWdodHNXZWJhcHBTdGFjayB9IGZyb20gJy4vaW5zaWdodHMtd2ViYXBwLXN0YWNrJztcbmltcG9ydCB7IEJ1aWxkQ29uZmlnIH0gZnJvbSAnLi9idWlsZC1jb25maWcnO1xuXG5cbmV4cG9ydCBjbGFzcyBJbnNpZ2h0c1dlYmFwcFN0YWdlIGV4dGVuZHMgY2RrLlN0YWdlIHtcblxuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIGJ1aWxkQ29uZmlnOiBCdWlsZENvbmZpZywgcHJvcHM/OiBjZGsuU3RhZ2VQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICAgICAgY29uc3Qgc3RhY2tJZCA9IGAke2J1aWxkQ29uZmlnLmVudlByZWZpeH1XZWJhcHBTdGFja2A7XG4gICAgICAgIG5ldyBJbnNpZ2h0c1dlYmFwcFN0YWNrKHRoaXMsIHN0YWNrSWQsIGJ1aWxkQ29uZmlnLCB7XG4gICAgICAgICAgICBzdGFja05hbWU6IHN0YWNrSWQsXG4gICAgICAgICAgICBlbnY6IHtcbiAgICAgICAgICAgICAgICBhY2NvdW50OiBidWlsZENvbmZpZy5hd3NBY2NvdW50SWQsXG4gICAgICAgICAgICAgICAgcmVnaW9uOiBidWlsZENvbmZpZy5yZWdpb25cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufSJdfQ==