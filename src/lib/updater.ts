import { Result } from '~/interfaces/result';

import { db } from './db';

export const updateResult = async (result: Result): Promise<void> => {
    console.info('result:', JSON.stringify(result, null, 2));

    const { attachmentId } = result;

    const someRows = await db.query('SELECT * FROM vtiger_attachments WHERE attachmentsid = ?', [attachmentId]);

    console.info('someRows:', JSON.stringify(someRows, null, 2));
};
