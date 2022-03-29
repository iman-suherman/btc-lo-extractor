/* eslint-disable @typescript-eslint/naming-convention */
import AWS from 'aws-sdk';

import { S3_BUCKET, S3_PREFIX } from './constants';
import { extractText } from './extractText';

AWS.config.update({ region: 'ap-southeast-2' });

const s3 = new AWS.S3();

export const getContents = async (jobId: string) => {
    const files = [];

    const textExtract = await retrieveResult(jobId);

    if (textExtract.Contents.length !== 1) {
        files.push(
            ...textExtract.Contents.filter((content) => !content.Key.includes('.s3_access_check')).map(
                (content) => content.Key,
            ),
        );
    }

    console.info('files', files);

    const content = await getS3Content(files[0]);

    console.info('First file:', content);

    extractText(content);
};

const getS3Content = async (key: string) => {
    const params = { Bucket: S3_BUCKET, Key: key };

    const content = (await s3.getObject(params).promise()).Body.toString('utf-8');

    return JSON.parse(content);
};

const retrieveResult = async (jobId: string) => {
    const params = {
        Bucket: S3_BUCKET,
        Prefix: `${S3_PREFIX}/${jobId}`,
    };

    const result = await s3.listObjectsV2(params).promise();

    console.info('result', JSON.stringify(result, null, 2));

    return result;
};
