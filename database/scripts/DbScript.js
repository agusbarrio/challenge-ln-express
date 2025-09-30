
// cargar dotenv solo en desarrollo
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

class DbScript {
    /**
     * @param {string} name
     * @param {(mysqlConnection: import('mysql2/promise').Connection) => Promise<void>} callback
     */
    constructor(
        name,
        callback,
    ) {
        this.name = name;
        this.callback = callback;
    }

    async run() {
        try {
            console.log('Connecting to the database...');
            const mysql = require('mysql2/promise');
            const mysqlConnection = await mysql.createConnection({
                uri: process.env.DB_URI,
                multipleStatements: true
            })
            console.log(`Starting DB script: ${this.name}...`);
            await this.callback(mysqlConnection);
            console.log('DB script successfully completed.');
            process.exit(0);
        } catch (err) {
            console.error('Error running DB script:', err);
            process.exit(1);
        }
    }
}

module.exports = DbScript;