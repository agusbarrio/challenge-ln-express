const authService = require('../services/auth')

class AuthController {
    async login(req, res) {
        // TODO validar username y password
        const token = await authService.login(req.body)
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 1000
        });
        res.status(200).send('login')
    }
    async register(req, res) {
        // TODO validar username y password
        await authService.register(req.body)
        res.status(201).send('registered');
    }
    async test(req, res) {
        res.status(201).send('test');
    }

}

module.exports = new AuthController();
