"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsightsWebappStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const s3 = require("aws-cdk-lib/aws-s3");
const aws_cloudfront_1 = require("aws-cdk-lib/aws-cloudfront");
const construct_cf_distribution_1 = require("./construct-cf-distribution");
const construct_bucket_deployment_1 = require("./construct-bucket-deployment");
class InsightsWebappStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, buildConfig, props) {
        super(scope, id, props);
        //Origin access identity for CF and S3 bucket
        const oaiId = `${buildConfig.envPrefix}OriginAccessIdentity`;
        let originAccessIdentity = new aws_cloudfront_1.OriginAccessIdentity(this, oaiId, {
            comment: `${buildConfig.env} origin access identity`
        });
        //Create the S3 bucket to host the web app
        const webAppbucket = new s3.Bucket(this, 'webappBucket', {
            versioned: false,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY,
            autoDeleteObjects: true,
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
        });
        webAppbucket.grantRead(originAccessIdentity);
        //Create cloud front distribution
        const cfDistribution = new construct_cf_distribution_1.CloudFrontDistribution(this, "webappDistribution", buildConfig, {
            s3Bucket: webAppbucket,
            originAccessIdentity: originAccessIdentity
        });
        //Deploying the webapp files to the bucket
        new construct_bucket_deployment_1.S3BucketDeployment(this, 'webappDeployment', buildConfig, {
            s3Bucket: webAppbucket,
            distribution: cfDistribution.distribution
        });
    }
}
exports.InsightsWebappStack = InsightsWebappStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5zaWdodHMtd2ViYXBwLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaW5zaWdodHMtd2ViYXBwLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUErRDtBQUMvRCx5Q0FBeUM7QUFDekMsK0RBQWtFO0FBRWxFLDJFQUFxRTtBQUNyRSwrRUFBbUU7QUFHbkUsTUFBYSxtQkFBb0IsU0FBUSxtQkFBSztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLFdBQXdCLEVBQUUsS0FBa0I7UUFDcEYsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsNkNBQTZDO1FBQzdDLE1BQU0sS0FBSyxHQUFHLEdBQUcsV0FBVyxDQUFDLFNBQVMsc0JBQXNCLENBQUM7UUFDN0QsSUFBSSxvQkFBb0IsR0FBRyxJQUFJLHFDQUFvQixDQUFDLElBQUksRUFBRSxLQUFLLEVBQUc7WUFDaEUsT0FBTyxFQUFFLEdBQUcsV0FBVyxDQUFDLEdBQUcseUJBQXlCO1NBQ3JELENBQUMsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRTtZQUN2RCxTQUFTLEVBQUUsS0FBSztZQUNoQixhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1lBQ3BDLGlCQUFpQixFQUFFLElBQUk7WUFDdkIsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFNBQVM7U0FDbEQsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1FBRTdDLGlDQUFpQztRQUNqQyxNQUFNLGNBQWMsR0FBRyxJQUFJLGtEQUFzQixDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRSxXQUFXLEVBQUU7WUFDekYsUUFBUSxFQUFFLFlBQVk7WUFDdEIsb0JBQW9CLEVBQUUsb0JBQW9CO1NBQzNDLENBQUMsQ0FBQztRQUVILDBDQUEwQztRQUMxQyxJQUFJLGdEQUFrQixDQUFDLElBQUksRUFBRSxrQkFBa0IsRUFBRSxXQUFXLEVBQUU7WUFDNUQsUUFBUSxFQUFFLFlBQVk7WUFDdEIsWUFBWSxFQUFFLGNBQWMsQ0FBQyxZQUFZO1NBQzFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQS9CRCxrREErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcywgUmVtb3ZhbFBvbGljeSB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHMzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zMyc7XG5pbXBvcnQgeyBPcmlnaW5BY2Nlc3NJZGVudGl0eSB9IGZyb20gXCJhd3MtY2RrLWxpYi9hd3MtY2xvdWRmcm9udFwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgeyBDbG91ZEZyb250RGlzdHJpYnV0aW9uIH0gZnJvbSAnLi9jb25zdHJ1Y3QtY2YtZGlzdHJpYnV0aW9uJztcbmltcG9ydCB7IFMzQnVja2V0RGVwbG95bWVudCB9IGZyb20gXCIuL2NvbnN0cnVjdC1idWNrZXQtZGVwbG95bWVudFwiO1xuaW1wb3J0IHsgQnVpbGRDb25maWcgfSBmcm9tICcuL2J1aWxkLWNvbmZpZyc7XG5cbmV4cG9ydCBjbGFzcyBJbnNpZ2h0c1dlYmFwcFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBidWlsZENvbmZpZzogQnVpbGRDb25maWcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy9PcmlnaW4gYWNjZXNzIGlkZW50aXR5IGZvciBDRiBhbmQgUzMgYnVja2V0XG4gICAgY29uc3Qgb2FpSWQgPSBgJHtidWlsZENvbmZpZy5lbnZQcmVmaXh9T3JpZ2luQWNjZXNzSWRlbnRpdHlgO1xuICAgIGxldCBvcmlnaW5BY2Nlc3NJZGVudGl0eSA9IG5ldyBPcmlnaW5BY2Nlc3NJZGVudGl0eSh0aGlzLCBvYWlJZCAsIHtcbiAgICAgIGNvbW1lbnQ6IGAke2J1aWxkQ29uZmlnLmVudn0gb3JpZ2luIGFjY2VzcyBpZGVudGl0eWBcbiAgICB9KTtcblxuICAgIC8vQ3JlYXRlIHRoZSBTMyBidWNrZXQgdG8gaG9zdCB0aGUgd2ViIGFwcFxuICAgIGNvbnN0IHdlYkFwcGJ1Y2tldCA9IG5ldyBzMy5CdWNrZXQodGhpcywgJ3dlYmFwcEJ1Y2tldCcsIHtcbiAgICAgIHZlcnNpb25lZDogZmFsc2UsXG4gICAgICByZW1vdmFsUG9saWN5OiBSZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICBhdXRvRGVsZXRlT2JqZWN0czogdHJ1ZSxcbiAgICAgIGJsb2NrUHVibGljQWNjZXNzOiBzMy5CbG9ja1B1YmxpY0FjY2Vzcy5CTE9DS19BTExcbiAgICB9KTtcbiAgICB3ZWJBcHBidWNrZXQuZ3JhbnRSZWFkKG9yaWdpbkFjY2Vzc0lkZW50aXR5KTtcblxuICAgIC8vQ3JlYXRlIGNsb3VkIGZyb250IGRpc3RyaWJ1dGlvblxuICAgIGNvbnN0IGNmRGlzdHJpYnV0aW9uID0gbmV3IENsb3VkRnJvbnREaXN0cmlidXRpb24odGhpcywgXCJ3ZWJhcHBEaXN0cmlidXRpb25cIiwgYnVpbGRDb25maWcsIHtcbiAgICAgIHMzQnVja2V0OiB3ZWJBcHBidWNrZXQsXG4gICAgICBvcmlnaW5BY2Nlc3NJZGVudGl0eTogb3JpZ2luQWNjZXNzSWRlbnRpdHlcbiAgICB9KTtcblxuICAgIC8vRGVwbG95aW5nIHRoZSB3ZWJhcHAgZmlsZXMgdG8gdGhlIGJ1Y2tldFxuICAgIG5ldyBTM0J1Y2tldERlcGxveW1lbnQodGhpcywgJ3dlYmFwcERlcGxveW1lbnQnLCBidWlsZENvbmZpZywge1xuICAgICAgczNCdWNrZXQ6IHdlYkFwcGJ1Y2tldCxcbiAgICAgIGRpc3RyaWJ1dGlvbjogY2ZEaXN0cmlidXRpb24uZGlzdHJpYnV0aW9uXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==