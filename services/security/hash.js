const crypto = require('crypto');

class HashService {
    #algorithm = 'sha512';
    #iterations = 100000;
    #keylen = 64;
    #saltLength = 16;

    #pbkdf2(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(password, salt, this.#iterations, this.#keylen, this.#algorithm, (err, derivedKey) => {
                if (err) return reject(err);
                resolve(derivedKey.toString('hex'));
            });
        });
    }

    async hashPassword(password) {
        const salt = crypto.randomBytes(this.#saltLength).toString('hex');
        const hash = await this.#pbkdf2(password, salt);
        return `${salt}:${hash}`;
    }

    async verifyPassword(password, hashedPassword) {
        const [salt, originalHash] = hashedPassword.split(':');
        const hash = await this.#pbkdf2(password, salt);
        return crypto.timingSafeEqual(Buffer.from(hash, 'hex'), Buffer.from(originalHash, 'hex'));
    }


}

module.exports = new HashService();
