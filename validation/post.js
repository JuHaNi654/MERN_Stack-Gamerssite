const Validator = require('validator')
const isEmpty = require('./is-Empty')

/**
 * @description Validate new post data
 * @param {Ojbect} data - new post data
 * @returns object of errors and boolean if there is errors
 */


module.exports = function validatePostInput(data) {
    let errors = {}

    data.title = isEmpty(data.title) ? "" : data.title
    data.title = isEmpty(data.content) ? "" : data.content
    if (Validator.isEmpty(data.title)) {
        errors.title = "Title is empty"
    }

    if (!Validator.isLength(data.title, { min: 5, max: 30 })) {
        errors.title = "Title length must be between 5 and 30"
    }

    if (Validator.isEmpty(data.content)) {
        errors.content = "Content is empty"
    }

    if (!Validator.isLength(data.content, { min: 10, max: 100 })) {
        errors.content = "Content length must be between 10 and 100"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}