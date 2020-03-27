
/**
 * @description Check if givin value is empty/null/undefined
 * @param {Any} value - given value 
 * @returns boolean
 */
const isEmpty = (value) => {
    return value === undefined ||
        value === null ||
        (typeof value === 'object' && Object.keys(value).length === 0) ||
        (typeof value === 'string' && value.trim().length === 0)
}


module.exports = isEmpty