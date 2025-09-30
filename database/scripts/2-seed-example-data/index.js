const path = require("path");
const DbScript = require("../DbScript");
const { readFileSync } = require('fs');

new DbScript(
    '2-seed-example-data',
    async (mysqlConnection) => {

        console.log('Starting DB seed...');

        // check that table names match json file names
        const tables = [
            'producto_estado',
            'producto_tipo',
            'producto_categoria',
            'clientes',
            'productos',
            'lista_precios',
            'pedidos'
        ];

        for (const table of tables) {


            console.log(`Seeding table: ${table}`);
            const data = JSON.parse(readFileSync(path.join(__dirname, './example-data', `${table}.json`), 'utf-8'));
            if (data.length === 0) continue;

            const columns = Object.keys(data[0]).join(',');

            const values = data.map(row =>
                '(' + Object.values(row)
                    .map(v => {
                        if (v === null || v === undefined || v === '') return 'NULL';
                        return typeof v === 'string' ? `'${v.replace(/'/g, "\\'")}'` : v
                    })
                    .join(',') + ')'
            ).join(',');

            const sql = `INSERT INTO ${table} (${columns}) VALUES ${values}`;
            console.log(sql)
            await mysqlConnection.query(sql);
            console.log(`Data inserted into ${table} (${data.length} records)`);

        }

        await mysqlConnection.end();
        console.log('Seed DB successfully completed.');

    }).run()

