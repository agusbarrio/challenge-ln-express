const errorMessages = require("./constants/errorMessages");

class ApiError extends Error {
    constructor(status = 500, message) {
        super(message || errorMessages[status] || "Internal server error");
        this.status = status;
        this.isOperational = true;
    }
}

module.exports = ApiError;
