const ApiError = require("../common/ApiError");
const userRepository = require("../repositories/user");
const hashService = require("./security/hash")
const tokenService = require("./security/tokens")


class AuthService {
    async login(username, incommingPassword) {

        const invalidCredentialsError = new ApiError(401, 'Invalid credentials')
        const user = await userRepository.findOneByUsername(username)
        if (!user) throw invalidCredentialsError

        const { password: currentPasswordHash, ...restUser } = user
        const isValidPassword = await hashService.verifyPassword(incommingPassword, currentPasswordHash)
        if (!isValidPassword) throw invalidCredentialsError

        const token = tokenService.generateToken({ user: restUser })
        return token
    }

    async register(username, password) {

        const exists = await userRepository.exists(username)
        if (exists) {
            throw new ApiError(409, 'User already exists')
        }

        const hashPassword = await hashService.hashPassword(password)
        const result = await userRepository.create(username, hashPassword)

        return result
    }
}

module.exports = new AuthService();
