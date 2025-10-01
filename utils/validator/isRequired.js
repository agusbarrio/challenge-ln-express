const ApiError = require("../../common/ApiError");

function isRequired(value, { field = "field", required = true, allowNull = false } = {}) {
    if (value === undefined || value === '') {
        if (required) throw new ApiError(400, `${field}: Value is required`);
        return null;
    }

    if (value === null && !allowNull) {
        throw new ApiError(400, `${field}: Null is not allowed`);
    }

    return value;
}

module.exports = isRequired;
