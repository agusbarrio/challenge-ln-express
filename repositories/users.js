const db = require("../db");

class UserRepository {
    async findOneByUsername(username) {
        const [rows] = await db.query("SELECT * FROM usuarios WHERE username = ?", [username]);
        return rows.length ? rows[0] : null;
    }
    async exists(username) {
        const [rows] = await db.query("SELECT 1 FROM usuarios WHERE username = ?", [username]);
        return rows.length > 0;
    }
    async create(username, password) {
        const [result] = await db.query(
            "INSERT INTO usuarios (username, password) VALUES (?, ?)",
            [username, password]
        );
        return {
            id: result.insertId,
            username,
        };
    }
}

module.exports = new UserRepository();
