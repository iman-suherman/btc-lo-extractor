import httpStatus from 'http-status';

import packageFile from '../../package.json';

export const healthHandler = (_req, res) => res.status(httpStatus.OK).json({ status: 'ok' });

export const infoHandler = (_req, res) => {
    const responseMessage = {
        info: {
            name: packageFile.name,
            version: packageFile.version,
        },
    };

    res.json(responseMessage);
};
