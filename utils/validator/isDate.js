const ApiError = require("../../common/ApiError");
const isRequired = require("./isRequired");

function isDate(value, { field = "field", required = true, allowNull = false, min, max } = {}) {
    value = isRequired(value, { field, required, allowNull });
    if (value == null) return null;

    const date = new Date(value);
    if (isNaN(date.getTime())) throw new ApiError(400, `${field}: Value must be a valid date`);

    if (min && date < new Date(min)) throw new ApiError(400, `${field}: Date must be >= ${min}`);
    if (max && date > new Date(max)) throw new ApiError(400, `${field}: Date must be <= ${max}`);

    return date;
}

module.exports = isDate;
