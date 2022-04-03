import { expect } from 'chai';

import contentEve from '../testData/eve1.json';
import contentSsbt from '../testData/ssbt1.json';
import { extractTextEve, extractTextSsbt } from './extractText';

describe('Extract text', function () {
    it('should extract text for SSBT', function () {
        const result = extractTextSsbt(contentSsbt);

        expect(result).to.be.eql([
            {
                name: 'Certificate III in Early Childhood Education and Care',
                code: ' CHC30121',
                schedules: [
                    { dueDate: '24/12/2021', feeName: 'Enrolment Fee', amount: 250 },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Tuition fee', amount: 2000 },
                    { dueDate: '24/12/2021', feeName: 'CHC30121 Material fee', amount: 300 },
                    { dueDate: '11/04/2022', feeName: 'CHC30121 Tuition fee', amount: 2000 },
                    { dueDate: '11/07/2022', feeName: 'CHC30121 Tuition fee', amount: 2000 },
                    { dueDate: '10/10/2022', feeName: 'CHC30121 Tuition fee', amount: 2000 },
                ],
            },
            {
                name: 'Diploma of Early Childhood Education and Care',
                code: ' CHC50121',
                schedules: [
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Tuition fee', amount: 2000 },
                    { dueDate: '09/01/2023', feeName: 'CHC50121 Material Fee', amount: 400 },
                    { dueDate: '13/04/2023', feeName: 'CHC50121 Tuition fee', amount: 2000 },
                    { dueDate: '10/07/2023', feeName: 'CHC50121 Tuition fee', amount: 2000 },
                    { dueDate: '18/10/2023', feeName: 'CHC50121 Tuition fee', amount: 2000 },
                ],
            },
        ]);
    });

    it('should extract text for Eve', function () {
        const result = extractTextEve(contentEve);

        expect(result).to.be.eql([
            {
                name: 'Certificate IV in Entrepreneurship and New Business',
                code: 'BSB40320',
                schedules: [
                    {
                        dueDate: '18/03/2022',
                        feeName: '1st All upfront + material + miscellaneous fees',
                        amount: 1100,
                    },
                    {
                        dueDate: '27/05/2022',
                        feeName: '2nd Tuition Fee+Material Fee',
                        amount: 1100,
                    },
                    {
                        dueDate: '05/08/2022',
                        feeName: '3rd Tuition Fee+Material Fee',
                        amount: 1100,
                    },
                    {
                        dueDate: '14/10/2022',
                        feeName: '4th Tuition Fee+Material Fee',
                        amount: 1100,
                    },
                    {
                        dueDate: '06/01/2023',
                        feeName: '5th Tuition Fee+Material Fee',
                        amount: 1100,
                    },
                ],
            },
        ]);
    });
});
