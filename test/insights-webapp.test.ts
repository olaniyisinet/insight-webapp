import * as cdk from 'aws-cdk-lib';
import { Template, Match } from 'aws-cdk-lib/assertions';
import * as InsightsWebapp from '../lib/insights-webapp-stack';
import { getConfig } from '../lib/build-config';

test('S3 Buckets Created', () => {
  const app = new cdk.App();
  const buildConfig = getConfig(app);
  // WHEN
  const stack = new InsightsWebapp.InsightsWebappStack(app, 'MyTestStack', buildConfig);
  // THEN

  const template = Template.fromStack(stack);

  template.resourceCountIs('AWS::S3::Bucket', 2);
});
