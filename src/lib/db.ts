import util from 'util';

import mysql, { ConnectionConfig } from 'mysql';

const makeDb = (config: ConnectionConfig) => {
    const connection = mysql.createConnection(config);

    return {
        query: (sql: unknown, args: unknown) => {
            return util.promisify(connection.query).call(connection, sql, args);
        },
        close: () => {
            return util.promisify(connection.end).call(connection);
        },
    };
};

export const db = makeDb({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
