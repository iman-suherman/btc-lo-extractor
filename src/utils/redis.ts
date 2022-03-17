import Redis from 'ioredis';
import { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT, REDIS_PREFIX, REDIS_TTL } from '../config';

export const redis = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
    password: REDIS_PASSWORD,
    keyPrefix: REDIS_PREFIX,
});

export const redisGet = (key) => {
    return redis.get(key);
};

/**
 * Redis Set by TTL Expired (Default 3 Hours)
 *
 * @param key Redis Key
 * @param value Redis Value
 * @param expired Redis Key Expired in Hours
 */
export const redisSet = (key: string, value: string, expired?: number) => {
    if (!expired) {
        return redis.set(key, value);
    } else {
        // get expired from key or from env and x to 1 hours (60 * 60 seconds)
        const expiredTTL = (expired ? expired : REDIS_TTL) * (60 * 60);
        // set redis, and return
        return redis.set(key, value, 'ex', expiredTTL);
    }
};

export const redisDel = (key) => {
    return redis.del(key);
};

export const redisCheckAndDelete = async (key: string) => {
    const check = await redisGet(key);

    // delete data if exist
    if (check) {
        return redisDel(key);
    }

    return null;
};

export const redisCheckAndUpdate = async (key: string, dataNew: string, expired?: number) => {
    const check = await redisGet(key);
    const oldData = JSON.parse(check);
    const newData = JSON.parse(dataNew);

    // eslint-disable-next-line no-console
    console.log(dataNew);

    // merge update data if exist
    if (check) {
        return redisSet(key, JSON.stringify({ ...oldData, ...newData }), expired);
    }

    return null;
};
