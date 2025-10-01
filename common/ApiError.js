const errorMessages = require("./constants/errorMessages");

class ApiError extends Error {
    constructor(status = 500, description) {
        super(errorMessages[status] || "Internal server error");
        this.status = status;
        this.description = description
        this.isOperational = true;
    }
}

module.exports = ApiError;
