import { Construct } from 'constructs';
import {
    OriginAccessIdentity,
    AllowedMethods,
    ViewerProtocolPolicy,
    Distribution,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { BuildConfig } from './build-config';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { CfnOutput } from "aws-cdk-lib/core";
import { Certificate } from "aws-cdk-lib/aws-certificatemanager";

export interface CloudFrontProps {
    readonly s3Bucket: s3.Bucket;
    readonly originAccessIdentity: OriginAccessIdentity;
}

export class CloudFrontDistribution extends Construct {

    public readonly distribution: Distribution;

    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props: CloudFrontProps) {
        super(scope, id);

        const certificate = Certificate.fromCertificateArn(this, "Certificate", buildConfig.certificateArn);

        const cloudFrontDistribution = new Distribution(this, id, {
            defaultBehavior: {
                origin: new S3Origin(props.s3Bucket, {
                    originAccessIdentity: props.originAccessIdentity
                }
                ),
                compress: true,
                viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                allowedMethods: AllowedMethods.ALLOW_GET_HEAD_OPTIONS
            },
            defaultRootObject: "index.html",
            certificate: certificate,
            domainNames: [buildConfig.url]
        });


        new CfnOutput(this, `${buildConfig.envPrefix}CloudfrontDomainUrl`, {
            value: cloudFrontDistribution.distributionDomainName,
            exportName: `${buildConfig.envPrefix}CloudfrontDomainUrl`,
        });

        this.distribution = cloudFrontDistribution;
    }
}