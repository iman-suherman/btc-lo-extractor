import { expect } from 'chai';

import { evaluateId } from './updater';

const applicationFee = 1;

const paymentPlan = 2;

const material = 3;

const tuitionFee = 4;

describe('Updater', function () {
    it('should evaluateId for Application Fee', function () {
        const productId = evaluateId({
            feeName: 'Application Fee',
            applicationFee,
            paymentPlan,
            material,
            tuitionFee,
        });

        expect(productId).to.be.eql(applicationFee);
    });

    it('should evaluateId for Enrolment Fee', function () {
        const productId = evaluateId({
            feeName: 'Enrolment Fee',
            applicationFee,
            paymentPlan,
            material,
            tuitionFee,
        });

        expect(productId).to.be.eql(applicationFee);
    });

    it('should evaluateId for Tuition fee', function () {
        const productId = evaluateId({
            feeName: 'CHC30121 Tuition fee',
            applicationFee,
            paymentPlan,
            material,
            tuitionFee,
        });

        expect(productId).to.be.eql(tuitionFee);
    });

    it('should evaluateId for Material fee', function () {
        const productId = evaluateId({
            feeName: 'CHC30121 Material fee',
            applicationFee,
            paymentPlan,
            material,
            tuitionFee,
        });

        expect(productId).to.be.eql(material);
    });
});
