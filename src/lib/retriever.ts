/* eslint-disable @typescript-eslint/naming-convention */
import AWS from 'aws-sdk';

import { Course } from '~/interfaces/course';
import { Result } from '~/interfaces/result';

import { ContentType, S3_BUCKET, S3_PREFIX } from './constants';
import { extractTextAlg, extractTextEve, extractTextSsbt } from './extractText';

AWS.config.update({ region: 'ap-southeast-2' });

const s3 = new AWS.S3();

export const getContents = async (jobId: string): Promise<Result> => {
    const files = [];

    const textExtract = await retrieveResult(jobId);

    if (textExtract.Contents.length !== 1) {
        files.push(
            ...textExtract.Contents.filter((content) => !content.Key.includes('.s3_access_check')).map(
                (content) => content.Key,
            ),
        );
    }

    let contentType = null;

    const contents = [];

    let attachmentId = null;

    for (const file of files) {
        const content = await getS3Content(file);

        if (file.includes('attachment.txt')) {
            attachmentId = parseInt(content);
        } else {
            if (content.includes('Sydney School of Business and Technology')) {
                contentType = ContentType.SSBT;
            }

            if (content.includes('Eve College')) {
                contentType = ContentType.EVE;
            }

            if (content.includes('Australian Learning Group')) {
                contentType = ContentType.ALG;
            }

            contents.push(JSON.parse(content));
        }
    }

    let courses: Course[];

    switch (contentType) {
        case ContentType.SSBT:
            courses = extractTextSsbt(contents[0]);
            break;

        case ContentType.EVE:
            courses = extractTextEve(contents[0]);
            break;

        case ContentType.ALG:
            courses = extractTextAlg(contents[1]);
            break;
    }

    return {
        attachmentId,
        courses,
    };
};

const getS3Content = async (key: string) => {
    const params = { Bucket: S3_BUCKET, Key: key };

    const content = (await s3.getObject(params).promise()).Body.toString('utf-8');

    return content;
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
