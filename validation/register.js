const Validator = require('validator')
const isEmpty = require("./is-Empty")

/**
 * @description Validate new user data
 * @param {Ojbect} data - new user object data 
 * @returns object of errors and boolean if there is errors
 */
const validateRegisterInput = (data) => {
    let errors = {}

    data.username = isEmpty(data.username) ? "" : data.username
    data.email = isEmpty(data.email) ? "" : data.email
    data.password = isEmpty(data.password) ? "" : data.password
    data.password2 = isEmpty(data.password2) ? "" : data.password2

    if (!Validator.isLength(data.username, { min: 5, max: 20 })) {
        errors.name = "Name length must be between 5 and 20 characters"
    }

    if (Validator.isEmpty(data.username)) {
        errors.name = "Name field is required"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required"
    }

    if (!Validator.isEmail(data.email)) {
        errors.email = "Given Email is invalid"
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password field is required"
    }

    if (!Validator.isLength(data.password, { min: 6, max: 15 })) {
        errors.password = "Password length must be between 6 and 15"
    }

    if (Validator.isEmpty(data.password2)) {
        errors.password2 = "Confirmation password field is required"
    }

    if (!Validator.equals(data.password, data.password2)) {
        errors.password = "Passwords must match"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}


module.exports = validateRegisterInput