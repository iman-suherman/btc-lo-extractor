import { Request, Response, Router } from 'express';

import { extractor } from '../../lib/extractor';

const v1 = Router();

v1.post('/extract', async (req: Request, res: Response) => {
    const { attachmentsId, body } = req.body;

    const result = await extractor(attachmentsId, body);

    res.status(200).json({ code: 200, result });
});

export default v1;
