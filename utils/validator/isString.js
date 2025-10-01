const ApiError = require("../../common/ApiError");
const isRequired = require("./isRequired");

function isString(value, {
    field = "field",
    required = true,
    allowNull = false,
    min = null,
    max = 255,
    trim = true,
    minUppercase = 0,
    minLowercase = 0,
    minNumbers = 0,
    minSymbols = 0,
    regex,
    regexErrorMessage
} = {}) {

    value = isRequired(value, { field, required, allowNull });
    if (value == null) return null;
    if (typeof value !== "string") throw new ApiError(400, `${field}: Value must be a string`);

    // custom required for string
    if (typeof value === "string") {
        if (trim) value = value.trim()
        if (required && !value) throw new ApiError(400, `${field}: Value cannot be empty`);
    }

    if (min != null && value.length < min) throw new ApiError(400, `${field}: String must have at least ${min} characters`);
    if (max != null && value.length > max) throw new ApiError(400, `${field}: String must have at most ${max} characters`);

    const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
    if (uppercaseCount < minUppercase)
        throw new ApiError(
            400,
            `${field}: Must contain at least ${minUppercase} uppercase letter(s)`
        );

    const lowercaseCount = (value.match(/[a-z]/g) || []).length;
    if (lowercaseCount < minLowercase)
        throw new ApiError(
            400,
            `${field}: Must contain at least ${minLowercase} lowercase letter(s)`
        );

    const numberCount = (value.match(/[0-9]/g) || []).length;
    if (numberCount < minNumbers)
        throw new ApiError(400, `${field}: Must contain at least ${minNumbers} number(s)`);

    const symbolCount = (value.match(/[!@#$%^&*(),.?":{}|<>]/g) || []).length;
    if (symbolCount < minSymbols)
        throw new ApiError(
            400,
            `${field}: Must contain at least ${minSymbols} special character(s)`
        );

    if (regex && !regex.test(value)) {
        const defaultMessage = `Value does not match regex ${regex.toString()}`;
        throw new ApiError(400, `${field}: ${regexErrorMessage || defaultMessage}`);
    }

    return value;
}

module.exports = isString;
