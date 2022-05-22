import moment from 'moment';

import { Course } from '~/interfaces/course';

export const extractTextSsbt = (content: any) => {
    const courses = [];

    let course: any = {};
    let schedules = [];
    let initiated = false;
    let courseCode;

    const blocks = content.Blocks.filter((block) => !block?.TextType && block?.Text);

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const { Text: text } = block;

        if (!course.name) {
            if (text.startsWith('Course Name:')) {
                const { name, code } = extractSsbtCourse(blocks[i + 1].Text);

                courseCode = code;

                course = initCourse(name, code);

                initiated = true;
            }
        }

        if (initiated) {
            if (text.startsWith('Course Name:')) {
                course.schedules = schedules;

                courses.push(course);

                const { name, code } = extractSsbtCourse(text);

                courseCode = code;

                course = initCourse(name, code);

                schedules = [];
            } else {
                const tests = text.split('/');

                if (tests.length === 3) {
                    schedules.push(initSchedule(text, blocks[i + 1].Text, getAmount(blocks[i + 2]?.Text), courseCode));
                }
            }
        }
    }

    course.schedules = schedules;

    courses.push(course);

    return courses.filter((course) => course.schedules.length);
};

export const extractTextEve = (content: any): Course[] => {
    const courses = [];

    const schedules = [];
    let initiated = false;

    const blocks = content.Blocks.filter((block) => !block?.TextType);

    const courseCodes: any[] = [];

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const { Text: text } = block;

        if (text) {
            if (!courses.length) {
                if (text === 'Course Fee') {
                    let courseCode = blocks[i + 1].Text;

                    let courseName = blocks[i + 2].Text;

                    courseCodes.push({ courseCode, courseName });

                    let course = initCourse(courseName, courseCode);

                    courses.push(course);

                    courseCode = blocks[i + 8].Text;

                    if (courseCode?.startsWith('BSB')) {
                        courseName = blocks[i + 9].Text;

                        courseCodes.push({ courseCode, courseName });

                        course = initCourse(courseName, courseCode);

                        courses.push(course);
                    }

                    initiated = true;
                }
            } else if (initiated) {
                const courseCode = text === 'Total fee due to pay now' ? courseCodes[0].courseCode : text;

                const course = courseCodes.find((course) => course.courseCode === courseCode);

                if (course) {
                    const feeName = blocks[i + 1].Text;

                    if (course.courseName !== feeName) {
                        const periods = blocks[i + 3].Text?.split(' ');

                        const dates = periods[0].split('/');

                        const startdate = moment(`${dates[2]}-${dates[1]}-${dates[0]}`).subtract(3, 'days');

                        schedules.push(
                            initSchedule(
                                startdate.format('DD/MM/YYYY'),
                                feeName,
                                getAmount(blocks[i + 2]?.Text),
                                course.courseCode,
                            ),
                        );
                    }
                }
            }
        }
    }

    return courses
        .map((course) => {
            const courseSchedules = schedules.filter((schedule) => schedule.courseCode === course.code);

            const { name, code } = course;

            return {
                name,
                code,
                schedules: courseSchedules,
            };
        })
        .filter((course) => course.schedules.length);
};

export const extractTextAlg = (content: any): Course[] => {
    const courses = [];

    let course: any = {};

    const schedules = [];
    let initiated = false;
    let ended = false;

    const blocks = content.Blocks.filter((block) => !block?.TextType && block?.Text);

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const { Text: text } = block;

        const keyStart = 'FEE DUE DATES';

        const keyEnd = 'TOTAL FOR COURSE';

        if (text.startsWith(keyStart) && text.length <= keyStart.length + 1) {
            const { name, code } = extractAlgCourse(blocks[i + 1].Text);

            if (!initiated) {
                course = initCourse(name, code);

                initiated = true;
            }

            for (let a = i + 1; a < blocks.length; a = a + 4) {
                const subBlock = blocks[a];

                const { Text: subText } = subBlock;

                const dueDate = blocks[a + 3]?.Text || '';

                if (dueDate.startsWith(keyEnd)) {
                    ended = true;
                    break;
                }

                schedules.push(initSchedule(dueDate, blocks[a + 1]?.Text, getAmount(blocks[a + 2]?.Text), subText));
            }
        }

        if (ended) {
            break;
        }
    }

    course.schedules = schedules;

    courses.push(course);

    return courses.filter((course) => course.schedules.length);
};

const getAmount = (text) => parseFloat(text.replace('$', '').replace(',', ''));

const extractSsbtCourse = (text) => {
    const textCourses = text.split(' - ');

    const codes = textCourses[0].split(':');

    const name = textCourses[1];

    const code = codes[1];

    return { name, code };
};

const extractAlgCourse = (text: string) => ({ name: text, code: text });

const initSchedule = (dueDate, feeName, amount, courseCode) => {
    return {
        dueDate,
        feeName,
        amount,
        courseCode,
    };
};

const initCourse = (name: string, code: string) => {
    return {
        name,
        code,
        schedules: [],
    };
};
