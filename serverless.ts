import type { AWS } from '@serverless/typescript';

const serverlessConfiguration: AWS = {
    service: 'lo-extractor-api',
    frameworkVersion: '2',
    useDotenv: true,
    plugins: ['serverless-plugin-typescript', 'serverless-offline', 'serverless-prune-plugin'],
    provider: {
        name: 'aws',
        lambdaHashingVersion: '20201221',
        runtime: 'nodejs14.x',
        region: 'ap-southeast-2',
        stage: '${opt:stage, "dev"}',
        memorySize: 258,
        logRetentionInDays: 30,
        timeout: 10,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
        iam: {
            role: {
                statements: [
                    {
                        Effect: 'Allow',
                        Action: ['ses:SendEmail', 'ses:SendRawEmail'],
                        Resource: '*',
                    },
                    {
                        Effect: 'Allow',
                        Action: ['s3:ListBucket'],
                        Resource: [
                            {
                                'Fn::Join': [
                                    '',
                                    [
                                        {
                                            'Fn::GetAtt': ['S3BucketAssets', 'Arn'],
                                        },
                                    ],
                                ],
                            },
                        ],
                    },
                    {
                        Effect: 'Allow',
                        Action: ['s3:GetObject', 's3:PutObject', 's3:PutObjectAcl', 's3:DeleteObject'],
                        Resource: [
                            {
                                'Fn::Join': [
                                    '',
                                    [
                                        {
                                            'Fn::GetAtt': ['S3BucketAssets', 'Arn'],
                                        },
                                    ],
                                ],
                            },
                            {
                                'Fn::Join': [
                                    '',
                                    [
                                        {
                                            'Fn::GetAtt': ['S3BucketAssets', 'Arn'],
                                        },
                                        '/*',
                                    ],
                                ],
                            },
                        ],
                    },
                ],
            },
        },
    },
    functions: {
        app: {
            handler: 'src/handler.handler',
            events: [
                {
                    http: {
                        method: 'ANY',
                        path: '/',
                        cors: {
                            origin: '*',
                            allowCredentials: true,
                        },
                    },
                },
                {
                    http: {
                        method: 'ANY',
                        path: '/{proxy+}',
                        cors: {
                            origin: '*',
                            allowCredentials: true,
                        },
                    },
                },
            ],
        },
    },
    package: {
        individually: true,
        excludeDevDependencies: true,
    },
    custom: {
        prune: {
            automatic: true,
            number: 3,
        },
        bundle: {
            sourcemaps: true,
            caching: true,
            concurrency: 5,
            externals: 'all',
            excludeFiles: '**/*.test.ts',
            stats: false,
            linting: true,
            generateStatsFiles: false,
        },
        esbuild: {
            packager: 'npm',
            plugins: './plugins.js',
            bundle: true,
            minify: true,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
        s3: { Ref: 'S3BucketAssets' },
    },
    resources: {
        Resources: {
            S3BucketAssets: {
                Type: 'AWS::S3::Bucket',
                Properties: {
                    BucketName: '${self:provider.stage}-${self:service}-assets',
                    CorsConfiguration: {
                        CorsRules: [
                            {
                                AllowedHeaders: ['*'],
                                AllowedMethods: ['GET', 'POST'],
                                AllowedOrigins: ['*'],
                                ExposedHeaders: ['x-amz-server-side-encryption', 'x-amz-request-id', 'x-amz-id-2'],
                                Id: '${self:provider.stage}-${self:service}-CORS-Rules',
                                MaxAge: 1800,
                            },
                        ],
                    },
                    PublicAccessBlockConfiguration: {
                        BlockPublicAcls: false,
                        BlockPublicPolicy: false,
                        IgnorePublicAcls: false,
                        RestrictPublicBuckets: false,
                    },
                },
            },
        },
    },
};

module.exports = serverlessConfiguration;