import { TIMEZONE } from '~/config';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import advanced from 'dayjs/plugin/advancedFormat';

dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(advanced);

export const nowAustralia = (addTime?: number, addType?: 'week' | 'day') => {
    // convert time now to timezone
    const now = dayjs().tz(TIMEZONE);

    if (addTime && addType) {
        return now.add(addTime, addType).startOf('day').toISOString();
    } else {
        return now.startOf('day').toISOString();
    }
};

export const nowAustraliaDB = (addTime?: number, addType?: 'week' | 'day') => {
    return dayjs(nowAustralia(addTime, addType)).tz('UTC').toISOString();
};
