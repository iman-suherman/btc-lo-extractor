import { expect } from 'chai';

import contentAlg from '../testData/alg2.json';
import contentEve1 from '../testData/eve1.json';
import contentEve2 from '../testData/eve2.json';
import contentSsbtAdvit from '../testData/ssbt-advit.json';
import contentSsbtLong from '../testData/ssbt-long.json';
import contentSsbt from '../testData/ssbt1.json';
import { extractTextAlg, extractTextEve, extractTextSsbt } from './extractText';

describe('Extract text', function () {
    it('should extract text for SSBT', function () {
        const result = extractTextSsbt(contentSsbt);

        expect(result).to.be.eql([
            {
                name: 'Certificate III in Early Childhood Education and Care',
                code: ' CHC30121',
                schedules: [
                    { dueDate: '24/12/2021', feeName: 'Enrolment Fee', amount: 250, courseCode: ' CHC30121' },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Material fee', amount: 300, courseCode: ' CHC30121' },
                    { dueDate: '11/04/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '11/07/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '10/10/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                ],
            },
            {
                name: 'Diploma of Early Childhood Education and Care',
                code: ' CHC50121',
                schedules: [
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Material Fee', amount: 400, courseCode: ' CHC50121' },
                    { dueDate: '13/04/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '10/07/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '18/10/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                ],
            },
        ]);
    });

    it('should extract text for SSBT Advit', function () {
        const result = extractTextSsbt(contentSsbtAdvit);

        console.info('result:', JSON.stringify(result));

        expect(result).to.be.eql([
            {
                name: 'Advanced Diploma of Information Technology',
                code: ' ICT60220',
                schedules: [
                    { dueDate: '26/11/2021', feeName: 'Enrolment Fee', amount: 250, courseCode: ' ICT60220' },
                    {
                        dueDate: '26/11/2021',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '26/11/2021', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '11/07/2022',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '11/07/2022', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '10/10/2022',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '10/10/2022', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '09/01/2023',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '09/01/2023', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '10/04/2023',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '10/04/2023', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '10/07/2023',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '10/07/2023', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '09/10/2023',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '09/10/2023', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                    {
                        dueDate: '08/01/2024',
                        feeName: 'Tuition-ADVIT-TNE-NSW-Q12021',
                        amount: 2300,
                        courseCode: ' ICT60220',
                    },
                    { dueDate: '08/01/2024', feeName: 'Material Fee', amount: 100, courseCode: ' ICT60220' },
                ],
            },
        ]);
    });

    it('should extract text for SSBT Long', function () {
        const result = extractTextSsbt(contentSsbtLong);

        console.info('result:', JSON.stringify(result));

        expect(result).to.be.eql([
            {
                name: 'Advanced Diploma of Hospitality Management',
                code: ' SIT60316',
                schedules: [
                    { dueDate: '12/04/2021', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '12/04/2021', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '12/04/2021', feeName: 'Enrolment Fee', amount: 250, courseCode: ' SIT60316' },
                    { dueDate: '11/07/2021', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '11/07/2021', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '10/10/2021', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '10/10/2021', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '9/01/2022', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '9/01/2022', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '10/04/2022', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '10/04/2022', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '10/07/2022', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '10/07/2022', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '9/10/2022', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '9/10/2022', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                    { dueDate: '9/01/2023', feeName: 'Material Fee', amount: 50, courseCode: ' SIT60316' },
                    { dueDate: '9/01/2023', feeName: 'Tuition Fee', amount: 1600, courseCode: ' SIT60316' },
                ],
            },
        ]);
    });

    it('should extract text for Eve', function () {
        const result = extractTextEve(contentEve1);

        expect(result).to.be.eql([
            {
                name: 'Certificate IV in Entrepreneurship and New Business',
                code: 'BSB40320',
                schedules: [
                    {
                        dueDate: '18/03/2022',
                        feeName: '1st All upfront + material + miscellaneous fees',
                        amount: 1100,
                        courseCode: 'BSB40320',
                    },
                    {
                        dueDate: '27/05/2022',
                        feeName: '2nd Tuition Fee+Material Fee',
                        amount: 1100,
                        courseCode: 'BSB40320',
                    },
                    {
                        dueDate: '05/08/2022',
                        feeName: '3rd Tuition Fee+Material Fee',
                        amount: 1100,
                        courseCode: 'BSB40320',
                    },
                    {
                        dueDate: '14/10/2022',
                        feeName: '4th Tuition Fee+Material Fee',
                        amount: 1100,
                        courseCode: 'BSB40320',
                    },
                    {
                        dueDate: '06/01/2023',
                        feeName: '5th Tuition Fee+Material Fee',
                        amount: 1100,
                        courseCode: 'BSB40320',
                    },
                ],
            },
        ]);
    });

    it('should extract text for Eve of multiple courses', function () {
        const result = extractTextEve(contentEve2);

        expect(result).to.be.eql([
            {
                name: 'Certificate IV in Human Resource Management',
                code: 'BSB40420',
                schedules: [
                    {
                        dueDate: '07/01/2022',
                        feeName: '1st All upfront + material + miscellaneous fees',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                    {
                        dueDate: '08/04/2022',
                        feeName: '2nd Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                    {
                        dueDate: '08/07/2022',
                        feeName: '3rd Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                    {
                        dueDate: '07/10/2022',
                        feeName: '4th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                    {
                        dueDate: '06/01/2023',
                        feeName: '5th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                    {
                        dueDate: '07/04/2023',
                        feeName: '6th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB40420',
                    },
                ],
            },
            {
                name: 'Diploma of Human Resource Management',
                code: 'BSB50320',
                schedules: [
                    {
                        dueDate: '07/07/2023',
                        feeName: '7th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '06/10/2023',
                        feeName: '8th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '05/01/2024',
                        feeName: '9th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '05/04/2024',
                        feeName: '10th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '05/07/2024',
                        feeName: '11th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '04/10/2024',
                        feeName: '12th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                    {
                        dueDate: '03/01/2025',
                        feeName: '13th Tuition Fee+Material Fee',
                        amount: 1350,
                        courseCode: 'BSB50320',
                    },
                ],
            },
        ]);
    });

    it.only('should extract text for ALG', function () {
        const result = extractTextAlg(contentAlg);

        console.info('result:', JSON.stringify(result));

        expect(result).to.be.eql([
            {
                name: 'Certificate III in Early Childhood Education and Care',
                code: ' CHC30121',
                schedules: [
                    { dueDate: '24/12/2021', feeName: 'Enrolment Fee', amount: 250, courseCode: ' CHC30121' },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Material fee', amount: 300, courseCode: ' CHC30121' },
                    { dueDate: '11/04/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '11/07/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                    { dueDate: '10/10/2022', feeName: 'CHC30121 Tuition fee', amount: 2000, courseCode: ' CHC30121' },
                ],
            },
            {
                name: 'Diploma of Early Childhood Education and Care',
                code: ' CHC50121',
                schedules: [
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Material Fee', amount: 400, courseCode: ' CHC50121' },
                    { dueDate: '13/04/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '10/07/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                    { dueDate: '18/10/2023', feeName: 'CHC50121 Tuition fee', amount: 2000, courseCode: ' CHC50121' },
                ],
            },
        ]);
    });
});
