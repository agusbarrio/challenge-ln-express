const jwt = require('jsonwebtoken');

class TokenService {

    #secret = process.env.JWT_SECRET;
    #expiresIn = process.env.JWT_EXPIRES_IN || '1h'

    generateToken(data) {
        return jwt.sign(
            { ...data },
            this.#secret,
            { expiresIn: this.#expiresIn }
        );
    }

    verifyToken(token) {
        return jwt.verify(token, this.#secret);
    }

}

module.exports = new TokenService();
