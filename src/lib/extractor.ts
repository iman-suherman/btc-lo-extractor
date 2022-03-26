/* eslint-disable @typescript-eslint/naming-convention */
import AWS from 'aws-sdk';

import { StartDocumentAnalysisRequest } from '@aws-sdk/client-textract';

import { S3_BUCKET, S3_PREFIX } from './constants';

AWS.config.update({ region: 'ap-southeast-2' });

const textract = new AWS.Textract();

const s3Bucket = new AWS.S3();

const uploadToS3 = async (attachmentsId: number, data: string) => {
    const buf = Buffer.from(data, 'base64');

    const key = `${attachmentsId}.pdf`;

    const object = {
        Key: key,
        Body: buf,
        Bucket: S3_BUCKET,
        ContentEncoding: 'base64',
        ContentType: 'application/pdf',
    };

    await s3Bucket.putObject(object).promise();

    return key;
};

export const extractor = async (attachmentsId: number, data: string) => {
    const key = await uploadToS3(attachmentsId, data);

    console.info('key:', key);

    const params: StartDocumentAnalysisRequest = {
        DocumentLocation: {
            /* required */
            S3Object: {
                Bucket: S3_BUCKET,
                Name: key,
            },
        },
        FeatureTypes: ['TABLES'],
        NotificationChannel: {
            RoleArn: 'arn:aws:iam::020350247430:role/lo-extractor-api-prod-ap-southeast-2-lambdaRole',
            SNSTopicArn: 'arn:aws:sns:ap-southeast-2:020350247430:prod-lo-extractor-api-notification',
        },
        OutputConfig: {
            S3Bucket: S3_BUCKET,
            S3Prefix: S3_PREFIX,
        },
    };

    const result = await textract.startDocumentAnalysis(params).promise();

    console.info('result:', result);

    return { key, result };
};
