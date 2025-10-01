const authService = require('../services/auth');
const Validator = require('../utils/validator');

class AuthController {
    async login(req, res) {
        const username = Validator.isString(req.body.username, { field: "username" })
        const password = Validator.isString(req.body.password, { field: "password" })
        const token = await authService.login(username, password)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        res.status(200).send('login')
    }
    async register(req, res) {
        const username = Validator.isString(req.body.username, { field: "username" })
        const password = Validator.isString(req.body.password, {
            field: "password",
            min: 6,
            max: 30,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1
        })
        await authService.register(username, password)
        res.status(201).send('registered');
    }
    async test(req, res) {
        res.status(201).send('test');
    }

}

module.exports = new AuthController();
