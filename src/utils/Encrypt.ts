import * as crypto from 'crypto';
import { Buffer } from 'buffer';
import { APP_KEY } from '../config';

const ALGORITHM = {
    // GCM is an authenticated encryption mode that not only provides confidentiality but also provides integrity in a secured way
    BLOCK_CIPHER: 'aes-256-gcm',
    // 128 bit auth tag is recommended for GCM
    AUTH_TAG_BYTE_LEN: 16,
    // NIST recommends 96 bits or 12 bytes IV for GCM to promote interoperability, efficiency, and simplicity of design
    IV_BYTE_LEN: 12,
    // NOTE: 256 (in algorithm name) is key size (block size for AES is always 128)
    KEY_BYTE_LEN: 32,
    // to prevent rainbow table attacks
    SALT_BYTE_LEN: 16,
};

export const encrypt = (data: string) => {
    // generate iv and salt
    const iv = crypto.randomBytes(ALGORITHM.IV_BYTE_LEN);
    const salt = crypto.randomBytes(ALGORITHM.SALT_BYTE_LEN);

    // generate key based on salt
    const key = crypto.pbkdf2Sync(APP_KEY, salt, 2145, 32, 'sha512');

    // create cipher
    const cipher = crypto.createCipheriv(ALGORITHM.BLOCK_CIPHER, key, iv);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let encryptedMessage = cipher.update(data);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    encryptedMessage = Buffer.concat([encryptedMessage, cipher.final()]);
    const encryptData = Buffer.concat([iv, salt, encryptedMessage, cipher.getAuthTag()]);
    return encryptData.toString('base64');
};

export const decrypt = (data: string) => {
    // convert base64 to string
    const ciphertext = Buffer.from(data, 'base64');

    // slice buffer for decrypt
    const iv = ciphertext.slice(0, 12);
    const salt = ciphertext.slice(12, 28);
    const encryptedMessage = ciphertext.slice(28, -16);
    const authTag = ciphertext.slice(-16);

    // generate key based on salt
    const key = crypto.pbkdf2Sync(APP_KEY, salt, 2145, 32, 'sha512');

    // decrypt decipher
    const decipher = crypto.createDecipheriv(ALGORITHM.BLOCK_CIPHER, key, iv);
    decipher.setAuthTag(authTag);

    // decrypt data
    const messagetext = decipher.update(encryptedMessage);

    // return response with string
    return Buffer.concat([messagetext, decipher.final()]).toString();
};
