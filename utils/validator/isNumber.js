const ApiError = require("../../common/ApiError");
const isRequired = require("./isRequired");

function isNumber(value, { field = "field", required = true, allowNull = false, min = null, max = null, integer = false } = {}) {
    value = isRequired(value, { field, required, allowNull });
    if (value == null) return null;

    const num = Number(value);
    if (isNaN(num)) throw new ApiError(400, `${field}: Value must be a number`);
    if (integer && !Number.isInteger(num)) throw new ApiError(400, `${field}: Value must be an integer`);

    if (min != null && num < min) throw new ApiError(400, `${field}: Number must be >= ${min}`);
    if (max != null && num > max) throw new ApiError(400, `${field}: Number must be <= ${max}`);

    return num;
}

module.exports = isNumber;
