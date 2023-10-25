"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3BucketDeployment = void 0;
const aws_s3_deployment_1 = require("aws-cdk-lib/aws-s3-deployment");
const constructs_1 = require("constructs");
const path = require("path");
const aws_cdk_lib_1 = require("aws-cdk-lib");
class S3BucketDeployment extends constructs_1.Construct {
    constructor(scope, id, buildConfig, props) {
        super(scope, id);
        if (buildConfig.env === 'dev') {
            // If building in dev mode, then deploy webapp files to the s3 bucket
            // directly from developer local machine
            new aws_s3_deployment_1.BucketDeployment(this, 'webappDeployment', {
                sources: [aws_s3_deployment_1.Source.asset('assets/webapp/dist')],
                destinationBucket: props.s3Bucket,
                distribution: props.distribution,
                distributionPaths: ['/index.html']
            });
        }
        else {
            // If building in test or prod mode, then deploy webapp files to the s3 bucket
            // from a fresh yarn build with corresponding prod or test parameter
            new aws_s3_deployment_1.BucketDeployment(this, 'webappDeployment', {
                sources: [
                    aws_s3_deployment_1.Source.asset(path.join(__dirname, '../assets/webapp'), {
                        bundling: {
                            image: aws_cdk_lib_1.DockerImage.fromRegistry('node:lts'),
                            command: [
                                'bash', '-c', [
                                    'yarn install',
                                    `yarn build --mode ${buildConfig.env}`,
                                    'cp -r /asset-input/dist/* /asset-output/',
                                ].join(' && '),
                            ],
                        },
                    }),
                ],
                destinationBucket: props.s3Bucket,
                distribution: props.distribution,
                distributionPaths: ['/index.html']
            });
        }
    }
}
exports.S3BucketDeployment = S3BucketDeployment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RydWN0LWJ1Y2tldC1kZXBsb3ltZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uc3RydWN0LWJ1Y2tldC1kZXBsb3ltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFFQUF5RTtBQUV6RSwyQ0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLDZDQUEwQztBQVUxQyxNQUFhLGtCQUFtQixTQUFRLHNCQUFTO0lBQzdDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsV0FBd0IsRUFBRSxLQUFzQjtRQUN0RixLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLElBQUcsV0FBVyxDQUFDLEdBQUcsS0FBSyxLQUFLLEVBQUU7WUFDMUIscUVBQXFFO1lBQ3JFLHdDQUF3QztZQUN4QyxJQUFJLG9DQUFnQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRTtnQkFDM0MsT0FBTyxFQUFFLENBQUMsMEJBQU0sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDN0MsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDckMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILDhFQUE4RTtZQUM5RSxvRUFBb0U7WUFDcEUsSUFBSSxvQ0FBZ0IsQ0FBQyxJQUFJLEVBQUUsa0JBQWtCLEVBQUU7Z0JBQzNDLE9BQU8sRUFBRTtvQkFDTCwwQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxFQUFFO3dCQUNuRCxRQUFRLEVBQUU7NEJBQ04sS0FBSyxFQUFFLHlCQUFXLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQzs0QkFDM0MsT0FBTyxFQUFFO2dDQUNMLE1BQU0sRUFBRSxJQUFJLEVBQUU7b0NBQ1YsY0FBYztvQ0FDZCxxQkFBcUIsV0FBVyxDQUFDLEdBQUcsRUFBRTtvQ0FDdEMsMENBQTBDO2lDQUM3QyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7NkJBQ2pCO3lCQUNKO3FCQUNKLENBQUM7aUJBQ0w7Z0JBQ0QsaUJBQWlCLEVBQUUsS0FBSyxDQUFDLFFBQVE7Z0JBQ2pDLFlBQVksRUFBRSxLQUFLLENBQUMsWUFBWTtnQkFDaEMsaUJBQWlCLEVBQUUsQ0FBQyxhQUFhLENBQUM7YUFDckMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0NBQ0o7QUFyQ0QsZ0RBcUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQnVja2V0RGVwbG95bWVudCwgU291cmNlIH0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1zMy1kZXBsb3ltZW50XCI7XG5pbXBvcnQgKiBhcyBzMyBmcm9tICdhd3MtY2RrLWxpYi9hd3MtczMnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgRG9ja2VySW1hZ2UgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBEaXN0cmlidXRpb24gfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLWNsb3VkZnJvbnRcIjtcbmltcG9ydCB7IEJ1aWxkQ29uZmlnIH0gZnJvbSAnLi9idWlsZC1jb25maWcnO1xuXG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xvdWRGcm9udFByb3BzIHtcbiAgICByZWFkb25seSBzM0J1Y2tldDogczMuQnVja2V0O1xuICAgIHJlYWRvbmx5IGRpc3RyaWJ1dGlvbjogRGlzdHJpYnV0aW9uXG59XG5cbmV4cG9ydCBjbGFzcyBTM0J1Y2tldERlcGxveW1lbnQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICAgIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIGJ1aWxkQ29uZmlnOiBCdWlsZENvbmZpZywgcHJvcHM6IENsb3VkRnJvbnRQcm9wcykge1xuICAgICAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgICAgIGlmKGJ1aWxkQ29uZmlnLmVudiA9PT0gJ2RldicpIHtcbiAgICAgICAgICAgIC8vIElmIGJ1aWxkaW5nIGluIGRldiBtb2RlLCB0aGVuIGRlcGxveSB3ZWJhcHAgZmlsZXMgdG8gdGhlIHMzIGJ1Y2tldFxuICAgICAgICAgICAgLy8gZGlyZWN0bHkgZnJvbSBkZXZlbG9wZXIgbG9jYWwgbWFjaGluZVxuICAgICAgICAgICAgbmV3IEJ1Y2tldERlcGxveW1lbnQodGhpcywgJ3dlYmFwcERlcGxveW1lbnQnLCB7XG4gICAgICAgICAgICAgICAgc291cmNlczogW1NvdXJjZS5hc3NldCgnYXNzZXRzL3dlYmFwcC9kaXN0JyldLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uQnVja2V0OiBwcm9wcy5zM0J1Y2tldCxcbiAgICAgICAgICAgICAgICBkaXN0cmlidXRpb246IHByb3BzLmRpc3RyaWJ1dGlvbixcbiAgICAgICAgICAgICAgICBkaXN0cmlidXRpb25QYXRoczogWycvaW5kZXguaHRtbCddXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIElmIGJ1aWxkaW5nIGluIHRlc3Qgb3IgcHJvZCBtb2RlLCB0aGVuIGRlcGxveSB3ZWJhcHAgZmlsZXMgdG8gdGhlIHMzIGJ1Y2tldFxuICAgICAgICAgICAgLy8gZnJvbSBhIGZyZXNoIHlhcm4gYnVpbGQgd2l0aCBjb3JyZXNwb25kaW5nIHByb2Qgb3IgdGVzdCBwYXJhbWV0ZXJcbiAgICAgICAgICAgIG5ldyBCdWNrZXREZXBsb3ltZW50KHRoaXMsICd3ZWJhcHBEZXBsb3ltZW50Jywge1xuICAgICAgICAgICAgICAgIHNvdXJjZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgU291cmNlLmFzc2V0KHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9hc3NldHMvd2ViYXBwJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ1bmRsaW5nOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2U6IERvY2tlckltYWdlLmZyb21SZWdpc3RyeSgnbm9kZTpsdHMnKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21tYW5kOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdiYXNoJywgJy1jJywgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3lhcm4gaW5zdGFsbCcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgeWFybiBidWlsZCAtLW1vZGUgJHtidWlsZENvbmZpZy5lbnZ9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdjcCAtciAvYXNzZXQtaW5wdXQvZGlzdC8qIC9hc3NldC1vdXRwdXQvJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcgJiYgJyksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgZGVzdGluYXRpb25CdWNrZXQ6IHByb3BzLnMzQnVja2V0LFxuICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbjogcHJvcHMuZGlzdHJpYnV0aW9uLFxuICAgICAgICAgICAgICAgIGRpc3RyaWJ1dGlvblBhdGhzOiBbJy9pbmRleC5odG1sJ11cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19