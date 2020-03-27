const Validator = require('validator')
const isEmpty = require('./is-Empty')

/**
 * @description Validate new comment
 * @param {Ojbect} data - new comment object
 * @returns object of errors and boolean if there is errors
 */


module.exports = function validateCommentInput(data) {
    let errors = {}

    data.postId = isEmpty(data.postId) ? data.postId : ''
    data.comment = isEmpty(data.comment) ? data.comment : ''

    if (Validator.isEmpty(data.postId)) {
        errors.postId = "Post id field is empty"
    }

    if (Validator.isEmpty(data.comment)) {
        errors.comment = "Comment field is empty"
    }

    if (!Validator.isLength(data.comment, { min: 5, max: 50 })) {
        errors.comment = "Comment length must be between 5 and 50"
    }


    return {
        errors,
        isValid: isEmpty(errors)
    }
}