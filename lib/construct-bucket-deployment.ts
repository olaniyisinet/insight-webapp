import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as path from 'path';
import { DockerImage } from 'aws-cdk-lib';
import { Distribution } from "aws-cdk-lib/aws-cloudfront";
import { BuildConfig } from './build-config';


export interface CloudFrontProps {
    readonly s3Bucket: s3.Bucket;
    readonly distribution: Distribution
}

export class S3BucketDeployment extends Construct {
    constructor(scope: Construct, id: string, buildConfig: BuildConfig, props: CloudFrontProps) {
        super(scope, id);

        if(buildConfig.env === 'dev') {
            // If building in dev mode, then deploy webapp files to the s3 bucket
            // directly from developer local machine
            new BucketDeployment(this, 'webappDeployment', {
                sources: [Source.asset('assets/webapp/dist')],
                destinationBucket: props.s3Bucket,
                distribution: props.distribution,
                distributionPaths: ['/index.html']
            });
        } else {
            // If building in test or prod mode, then deploy webapp files to the s3 bucket
            // from a fresh yarn build with corresponding prod or test parameter
            new BucketDeployment(this, 'webappDeployment', {
                sources: [
                    Source.asset(path.join(__dirname, '../assets/webapp'), {
                        bundling: {
                            image: DockerImage.fromRegistry('node:lts'),
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
