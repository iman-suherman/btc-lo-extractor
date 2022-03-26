/* eslint-disable @typescript-eslint/naming-convention */
import AWS from 'aws-sdk';

import { S3_BUCKET, S3_PREFIX } from './constants';

AWS.config.update({ region: 'ap-southeast-2' });

const s3Bucket = new AWS.S3();

export const getContents = async (jobId: string) => {
    const contents = [];

    const textExtract = await retrieveResult(jobId);

    if (textExtract.Contents.length !== 1) {
        contents.push(
            ...textExtract.Contents.filter((content) => !content.Key.includes('.s3_access_check')).map(
                (content) => content.Key,
            ),
        );
    }

    console.info('contents', JSON.stringify(contents, null, 2));

    return contents;
};

const retrieveResult = async (jobId: string) => {
    const params = {
        Bucket: S3_BUCKET,
        Prefix: `${S3_PREFIX}/${jobId}`,
    };

    const result = await s3Bucket.listObjectsV2(params).promise();

    console.info('result', JSON.stringify(result, null, 2));

    return result;
};
