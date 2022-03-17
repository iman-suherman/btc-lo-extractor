import { createHmac } from 'crypto';

export const hash = (text: string, encode: 'base64' | 'hex' = 'base64') => {
    return createHmac('sha512', text).digest(encode);
};
