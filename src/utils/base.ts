import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

export const DATA_NOT_FOUND = 'DATA_NOT_FOUND';

export const sendEmail = (to, subject, html) => {
    const configuration =
        process.env.SES_ACCESS && process.env.SES_SECRET && process.env.SES_REGION
            ? {
                  credentials: {
                      accessKeyId: process.env.SES_ACCESS,
                      secretAccessKey: process.env.SES_SECRET,
                  },
                  region: process.env.SES_REGION,
              }
            : {
                  region: process.env.AWS_DEFAULT_REGION,
              };

    const sesClient = new SESClient(configuration);

    let ToAddresses = to;
    if (!Array.isArray(to)) {
        ToAddresses = [to];
    }
    const params = {
        Destination: {
            ToAddresses,
        },
        Message: {
            /* required */
            Body: {
                /* required */
                Html: {
                    Charset: 'UTF-8',
                    Data: html,
                },
            },
            Subject: {
                Charset: 'UTF-8',
                Data: subject,
            },
        },
        Source: process.env.APP_EMAIL,
    };

    return sesClient.send(new SendEmailCommand(params));
};
