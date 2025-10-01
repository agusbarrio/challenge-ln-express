const ApiError = require("../../common/ApiError");
const isRequired = require("./isRequired");

function isEnum(value, options = [], { field = "field", required = true, allowNull = false } = {}) {
    value = isRequired(value, { field, required, allowNull });
    if (value == null) return null;

    if (!options.includes(value)) {
        throw new ApiError(400, `${field}: Value must be one of: ${options.join(", ")}`);
    }
    return value;
}

module.exports = isEnum;
