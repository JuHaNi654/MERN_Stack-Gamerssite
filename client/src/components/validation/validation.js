import Validator from 'validator'
const checkIfEmpty = (value) => {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
}

export const validateLoginInput = (data) => {
    let errors = {}
    data.email = checkIfEmpty(data.email) ? "" : data.email
    data.password = checkIfEmpty(data.password) ? "" : data.password

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email"
    }

    if (Validator.isEmpty(data.password)) {
        errors.pw = "Password is required"
    }

    return {
        errors,
        isValid: checkIfEmpty(errors)
    }
}
