import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';

const client = new S3Client({ region: process.env.AWS_DEFAULT_REGION });

export const generateUploadUrl = async (filename) => {
    return createPresignedPost(client, {
        Bucket: process.env.S3_BUCKET,
        Key: filename,
        Fields: { acl: 'public-read' },
        Conditions: [
            { bucket: process.env.S3_BUCKET },
            ['eq', '$acl', 'public-read'],
            ['content-length-range', 1, 25 * 1024 * 1024],
        ],
        Expires: 900,
    });
};

export const generateGetUrl = async (filename) => {
    return getSignedUrl(
        client,
        new GetObjectCommand({
            Bucket: process.env.S3_BUCKET,
            Key: filename,
        }),
    );
};
