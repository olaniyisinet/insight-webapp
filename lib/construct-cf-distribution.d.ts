import { Construct } from 'constructs';
import { OriginAccessIdentity, Distribution } from "aws-cdk-lib/aws-cloudfront";
import { BuildConfig } from './build-config';
import * as s3 from 'aws-cdk-lib/aws-s3';
export interface CloudFrontProps {
    readonly s3Bucket: s3.Bucket;
    readonly originAccessIdentity: OriginAccessIdentity;
}
export declare class CloudFrontDistribution extends Construct {
    readonly distribution: Distribution;
    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props: CloudFrontProps);
}
