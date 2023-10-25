import { Stack, StackProps, RemovalPolicy } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { OriginAccessIdentity } from "aws-cdk-lib/aws-cloudfront";
import { Construct } from 'constructs';
import { CloudFrontDistribution } from './construct-cf-distribution';
import { S3BucketDeployment } from "./construct-bucket-deployment";
import { BuildConfig } from './build-config';

export class InsightsWebappStack extends Stack {
  constructor(scope: Construct, id: string, buildConfig: BuildConfig, props?: StackProps) {
    super(scope, id, props);

    //Origin access identity for CF and S3 bucket
    const oaiId = `${buildConfig.envPrefix}OriginAccessIdentity`;
    let originAccessIdentity = new OriginAccessIdentity(this, oaiId , {
      comment: `${buildConfig.env} origin access identity`
    });

    //Create the S3 bucket to host the web app
    const webAppbucket = new s3.Bucket(this, 'webappBucket', {
      versioned: false,
      removalPolicy: RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL
    });
    webAppbucket.grantRead(originAccessIdentity);

    //Create cloud front distribution
    const cfDistribution = new CloudFrontDistribution(this, "webappDistribution", buildConfig, {
      s3Bucket: webAppbucket,
      originAccessIdentity: originAccessIdentity
    });

    //Deploying the webapp files to the bucket
    new S3BucketDeployment(this, 'webappDeployment', buildConfig, {
      s3Bucket: webAppbucket,
      distribution: cfDistribution.distribution
    });
  }
}
