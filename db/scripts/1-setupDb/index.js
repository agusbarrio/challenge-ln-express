const path = require("path");
const DbScript = require("../DbScript");
const { readFileSync } = require('fs');

new DbScript(
    '1-setup-db',
    async (mysqlConnection) => {
        const sql = readFileSync(path.join(__dirname, './script.sql'), 'utf-8');
        await mysqlConnection.query(sql);
        await mysqlConnection.end();
    }).run()