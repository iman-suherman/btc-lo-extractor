const local = process.env.NODE_ENV === 'development' || false;

export const swagger = {
    swagger: '2.0',
    info: {
        version: 'v1',
        title: 'BTC LO Extractor',
        description: 'Letter Offer Extractor for Brightannica student agency',
        contact: {
            name: 'Iman Suherman',
            email: 'iman.suherman@gmail.com',
        },
    },
    host: local ? 'localhost:3000' : 'extractor.brightannica.com.au',
    basePath: '/',
    schemes: [local ? 'http' : 'https'],
    paths: {
        '/health': {
            get: {
                summary: 'Health Check',
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'Response',
                        schema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    example: 'ok',
                                },
                            },
                        },
                    },
                },
            },
        },
        '/info': {
            get: {
                summary: 'Server Info',
                produces: ['application/json'],
                responses: {
                    '200': {
                        description: 'Response',
                        schema: {
                            type: 'object',
                            properties: {
                                info: {
                                    type: 'object',
                                    properties: {
                                        name: {
                                            type: 'string',
                                            example: 'application-name',
                                        },
                                        version: {
                                            type: 'string',
                                            example: '1.0.0',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/v1/extract': {
            post: {
                summary: 'Extract Invoices From LO',
                consumes: ['application/json'],
                produces: ['application/json'],
                parameters: [
                    {
                        name: 'payload',
                        in: 'body',
                        description: 'Payload body',
                        required: true,
                        schema: {
                            properties: {
                                attachmentsId: {
                                    type: 'number',
                                    example: 7410,
                                },
                                body: {
                                    type: 'string',
                                    example: 'base64-body',
                                },
                            },
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Response',
                        schema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    example: 'ok',
                                },
                                portalAddress: {
                                    type: 'string',
                                    description: 'Result',
                                    example: 'OK',
                                },
                            },
                        },
                    },
                    '400': {
                        description: 'Response',
                        schema: {
                            type: 'object',
                            properties: {
                                status: {
                                    type: 'string',
                                    example: 'error',
                                },
                                error: {
                                    type: 'string',
                                    description: 'Error message',
                                    example: 'Failed to extract body',
                                },
                            },
                        },
                    },
                },
            },
        },
    },
};
