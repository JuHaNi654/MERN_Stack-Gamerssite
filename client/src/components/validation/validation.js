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


export const validateRegisterInput = (data) => {
    let errors = {}

    data.username = checkIfEmpty(data.username) ? "" : data.username
    data.email = checkIfEmpty(data.email) ? "" : data.email
    data.password = checkIfEmpty(data.password) ? "" : data.password
    data.password2 = checkIfEmpty(data.password2) ? "" : data.password2

    if (!Validator.isLength(data.username, { min: 5, max: 20 })) {
        errors.name = "Name length must be between 5 and 20 characters"
    }

    if (Validator.isEmpty(data.username)) {
        errors.name = "Name field is required"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Given Email is invalid"
    }
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }

    if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
        errors.password = "Password length must be between 6 and 15"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirmation password field is required"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = "Passwords must match"
    }

    return {
        errors,
        isValid: checkIfEmpty(errors)
    }
}