import 'dotenv/config';
import { hash } from '~/utils/Hash';

export const APP_KEY = process.env.APP_KEY;
export const APP_KEY_DEVICE = process.env.APP_KEY_DEVICE || hash(`${hash(APP_KEY)}_DEVICE`);

export const APP_KEY_ADMIN = process.env.APP_KEY_ADMIN || hash(`${hash(APP_KEY)}_ADMIN`);
export const APP_KEY_ADMIN_REFRESH = hash(`${hash(APP_KEY_ADMIN)}_ADMIN_REFRESH`);
export const APP_KEY_USER = process.env.APP_KEY_USER || hash(`${hash(APP_KEY)}_USER`);
export const APP_KEY_USER_REFRESH = hash(`${hash(APP_KEY_USER)}_USER_REFRESH`);
export const APP_KEY_USER_AGENT = process.env.APP_KEY_USER_AGENT || hash(`${hash(APP_KEY)}_USER_AGENT`);
export const APP_KEY_USER_AGENT_REFRESH = hash(`${hash(APP_KEY_USER_AGENT)}_USER_AGENT_REFRESH`);

export const REDIS_HOST = process.env.REDIS_HOST || '127.0.0.1';
export const REDIS_PORT = parseInt(process.env.REDIS_PORT) || 6379;
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || null;
export const REDIS_TLS = process.env.REDIS_TLS || false;
export const REDIS_PREFIX = process.env.REDIS_PREFIX || 'app:';

// REDIS TTL in Hours
export const REDIS_TTL = parseInt(process.env.REDIS_TTL) || 3;

// aws detail
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_DEFAULT_REGION = process.env.AWS_DEFAULT_REGION || 'ap-southeast-3';

// s3 detail
export const AWS_S3_BUCKET = process.env.AWS_S3_BUCKET;

// timezone
export const TIMEZONE = process.env.TIMEZONE || 'Australia/Sydney';
