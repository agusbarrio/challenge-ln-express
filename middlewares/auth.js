const ApiError = require('../common/ApiError');
const tokenService = require('../services/security/tokens')
class AuthMiddleware {

    #throwErrorAndClearTokenCookie = (res) => {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        });
        throw new ApiError(401)
    }

    #extractToken = (req, res) => {
        const token = req.cookies?.token;
        return token;
    }


    authenticate = (req, res, next) => {
        const token = this.#extractToken(req);
        if (!token) this.#throwErrorAndClearTokenCookie(res)

        let tokenData
        try {
            tokenData = tokenService.verifyToken(token);
        } catch {
            this.#throwErrorAndClearTokenCookie(res)
        }

        req.user = tokenData.user
        next();
    };
}




module.exports = new AuthMiddleware();
