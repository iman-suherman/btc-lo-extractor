import { Schedule } from './schedule';

export interface Course {
    name: string;
    code: string;
    schedules: Schedule[];
}
