import moment from 'moment';

export const extractTextSsbt = (content: any) => {
    const courses = [];

    let course: any = {};
    let schedules = [];
    let initiated = false;

    const blocks = content.Blocks.filter((block) => !block?.TextType);

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const { Text: text } = block;

        if (text) {
            if (!course.name) {
                if (text.startsWith('Course Name:')) {
                    const { name, code } = extractSsbtCourse(blocks[i + 1].Text);

                    course = initCourse(name, code);

                    initiated = true;
                }
            }

            if (initiated) {
                if (text.startsWith('Course Name:')) {
                    course.schedules = schedules;

                    courses.push(course);

                    const { name, code } = extractSsbtCourse(text);

                    course = initCourse(name, code);

                    schedules = [];
                } else {
                    if (text.substring(2, 3) === '/' && text.substring(5, 6) === '/') {
                        schedules.push(initSchedule(text, blocks[i + 1].Text, getAmount(blocks[i + 2]?.Text)));
                    }
                }
            }
        }
    }

    course.schedules = schedules;

    courses.push(course);

    return courses.filter((course) => course.schedules.length);
};

export const extractTextEve = (content: any) => {
    const courses = [];

    let course: any = {};

    const schedules = [];
    let initiated = false;

    const blocks = content.Blocks.filter((block) => !block?.TextType);

    let courseCode: string;
    let courseName: string;

    for (let i = 0; i < blocks.length; i++) {
        const block = blocks[i];

        const { Text: text } = block;

        if (text) {
            if (!course.name) {
                if (text === 'Course Fee') {
                    courseCode = blocks[i + 1].Text;

                    courseName = blocks[i + 2].Text;

                    course = initCourse(courseName, courseCode);

                    initiated = true;
                }
            } else if (initiated) {
                if (text === 'Total fee due to pay now' || text === courseCode) {
                    const feeName = blocks[i + 1].Text;

                    if (courseName !== feeName) {
                        const periods = blocks[i + 3].Text?.split(' ');

                        const dates = periods[0].split('/');

                        const startdate = moment(`${dates[2]}-${dates[1]}-${dates[0]}`).subtract(3, 'days');

                        schedules.push(
                            initSchedule(startdate.format('DD/MM/YYYY'), feeName, getAmount(blocks[i + 2]?.Text)),
                        );
                    }
                }
            }
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

const initSchedule = (dueDate, feeName, amount) => {
    return {
        dueDate,
        feeName,
        amount,
    };
};

const initCourse = (name: string, code: string) => {
    return {
        name,
        code,
        schedules: [],
    };
};
