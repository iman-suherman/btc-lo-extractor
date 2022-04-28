/* eslint-disable @typescript-eslint/naming-convention */
export interface Invoice {
    subject: string;
    contactid: number;
    invoicedate: string;
    subtotal: number;
    total: number;
    taxtype: string;
    accountid: number;
    invoicestatus: string;
    invoice_no: string;
    currency_id: number;
    conversion_rate: number;
    pre_tax_total: number;
    balance: number;
    productId: number;
    feeName: string;
}
