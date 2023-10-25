import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { BuildConfig } from './build-config';
export interface CloudFrontProps {
    readonly s3Bucket: s3.Bucket;
    readonly distribution: Distribution;
}
export declare class S3BucketDeployment extends Construct {
    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props: CloudFrontProps);
}
