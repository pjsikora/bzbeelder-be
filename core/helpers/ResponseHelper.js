const ERROR_MSG = {
    message: 'error'
}
const SUCCESS_MSG = {
    message: 'success',
    errors: null
}

const errorResponse = (errors) => {
    return {
        ...ERROR_MSG,
        errors: errors
    }
}

/**
 * 
 * @param {array} rows 
 * @param {number} limit 
 * @param {number} total 
 */
const successResponse = (data, limit = null, total = null) => {
    return {
        ...SUCCESS_MSG,
        errors: null,
        data, 
        limit,
        total
    }
}

module.exports = {
    successResponse,
    errorResponse
}