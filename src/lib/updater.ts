/* eslint-disable @typescript-eslint/naming-convention */
import moment from 'moment';

import { Invoice } from '~/interfaces/invoice';
import { Result } from '~/interfaces/result';

import { db } from './db';

export const updateResult = async (result: Result): Promise<void> => {
    const { attachmentId } = result;

    const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');

    const { smcreatorid, smownerid, modifiedby, smgroupid } = await getDataFromDB(
        'SELECT * FROM vtiger_crmentity WHERE setype = ? and crmid = ?',
        ['Documents Attachment', attachmentId],
    );

    const { crmid } = await getDataFromDB('SELECT * FROM vtiger_seattachmentsrel WHERE attachmentsid = ?', [
        attachmentId,
    ]);

    const { crmid: contactid } = await getDataFromDB('SELECT * FROM vtiger_senotesrel WHERE notesid = ?', [crmid]);

    const { accountid } = await getDataFromDB('SELECT * FROM vtiger_contactdetails WHERE contactid = ?', [contactid]);

    let { id: invoiceid } = await getDataFromDB('SELECT * FROM vtiger_crmentity_seq', []);

    const { crmid: applicationFee } = await getProductId('Application Fee');

    const { crmid: paymentPlan } = await getProductId('Payment Plan');

    const { crmid: material } = await getProductId('Material');

    const { crmid: tuitionFee } = await getProductId('Tuition Fee');

    console.info('result:', JSON.stringify(result, null, 2));

    const invoices: Invoice[] = [];

    result.courses.forEach((course) =>
        course.schedules.forEach((schedule) => {
            const { amount, feeName, dueDate } = schedule;

            const dates = dueDate.split('/');

            const baseDate = moment(`${dates[2]}-${dates[1]}-${dates[0]}`);

            const subject = `${baseDate.format('MMM YYYY')} - ${feeName}`;

            const invoicedate = baseDate.format('YYYY-MM-DD');

            const invoice_no = `INV${baseDate.format('MMYYYY')}`;

            const productId = evaluateId({
                feeName,
                applicationFee,
                paymentPlan,
                material,
                tuitionFee,
            });

            if (productId) {
                const invoice: Invoice = {
                    subject,
                    contactid,
                    invoicedate,
                    subtotal: amount,
                    total: amount,
                    taxtype: 'group',
                    accountid,
                    invoicestatus: 'Sent',
                    invoice_no,
                    currency_id: 1,
                    conversion_rate: 1,
                    pre_tax_total: amount,
                    balance: amount,
                    productId,
                    feeName,
                };

                invoices.push(invoice);
            }
        }),
    );

    console.info('invoices:', invoices);

    for (const invoice of invoices) {
        invoiceid = invoiceid + 1;

        await db.query('UPDATE vtiger_crmentity_seq SET id = ?', [invoiceid]);

        const {
            subject,
            contactid,
            invoicedate,
            subtotal,
            total,
            taxtype,
            accountid,
            invoicestatus,
            invoice_no,
            currency_id,
            conversion_rate,
            pre_tax_total,
            balance,
            feeName,
        } = invoice;

        const crmentityData = {
            crmid: invoiceid,
            smcreatorid,
            smownerid,
            modifiedby,
            setype: 'Invoice',
            createdtime: dateNow,
            modifiedtime: dateNow,
            version: 0,
            presence: 1,
            deleted: 0,
            smgroupid,
            source: 'CRM',
            label: feeName,
        };

        await insertIntoDb('vtiger_crmentity', crmentityData);

        const invoiceData = {
            invoiceid,
            subject,
            contactid,
            invoicedate,
            subtotal,
            total,
            taxtype,
            accountid,
            invoicestatus,
            invoice_no,
            currency_id,
            conversion_rate,
            pre_tax_total,
            balance,
        };

        await insertIntoDb('vtiger_invoice', invoiceData);

        const productData = {
            id: invoiceid,
            productid: invoice.productId,
            sequence_no: 1,
            quantity: 1,
            listprice: total,
            incrementondel: 1,
            tax1: 0,
            tax2: 0,
            tax3: 0,
            purchase_cost: 0,
            margin: total,
        };

        await insertIntoDb('vtiger_inventoryproductrel', productData);
    }
};

export const evaluateId = ({
    feeName,
    applicationFee,
    paymentPlan,
    material,
    tuitionFee,
}: {
    feeName: string;
    applicationFee: number;
    paymentPlan: number;
    material: number;
    tuitionFee: number;
}): number => {
    let productId: number;

    if (
        feeName.toLowerCase().includes('Application Fee'.toLowerCase()) ||
        feeName.toLowerCase().includes('Enrolment Fee'.toLowerCase())
    ) {
        productId = applicationFee;
    }

    if (feeName.toLowerCase().includes('Payment Plan'.toLowerCase())) {
        productId = paymentPlan;
    }

    if (feeName.toLowerCase().includes('Material'.toLowerCase())) {
        productId = material;
    }

    if (feeName.toLowerCase().includes('Tuition Fee'.toLowerCase())) {
        productId = tuitionFee;
    }

    return productId;
};

const insertIntoDb = async (table: string, data: any) => {
    const keys = [];

    const marks = [];

    const values = [];

    for (const [key, value] of Object.entries(data)) {
        keys.push(key);

        marks.push('?');

        values.push(value);
    }

    await db.query(`INSERT INTO ${table} (${keys.join(', ')}) VALUE (${marks.join(', ')})`, values);
};

const getDataFromDB = async (query: string, variables: any[]) => {
    const data = await db.query(query, variables);

    return data[0];
};

const getProductId = async (label: string) =>
    await getDataFromDB('SELECT * FROM vtiger_crmentity WHERE setype = ? AND label = ?', ['Products', label]);
