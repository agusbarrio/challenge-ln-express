const hashService = require("../../../services/security/hash");
const DbScript = require("../DbScript");

new DbScript(
    "3-seed-first-user",
    async (mysqlConnection) => {
        const username = process.env.FIRST_USERNAME;
        const password = process.env.FIRST_PASSWORD;

        if (!username || !password) {
            throw new Error("FIRST_USERNAME and FIRST_PASSWORD must be set in environment variables");
        }

        const hashPassword = await hashService.hashPassword(password)

        const sql = "INSERT INTO usuarios (username, password) VALUES(?, ?)";

        await mysqlConnection.query(sql, [username, hashPassword]);
        await mysqlConnection.end();
    }
).run();
