
//this is structure of api response msg;

module.exports.successResponse = (payload, msg = 'Success') => {
    const response = {
        msg,
        error: false,
        payload
    }

    return response;
}

module.exports.errorResponse = (payload, msg = 'Failed') => {
    const response = {
        msg,
        error: true,
        payload
    }

    return response;
}

module.exports.somethingWentWrongResponse = () => {
    const response = {
        msg : 'Failed',
        error: true,
        payload : 'Something went wrong, try again'
    }

    return response;
}

//upstream response
module.exports.upstreamSuccessResponse = (payload) => {
    const response = {
        error: false,
        payload
    }

    return response;
}

module.exports.upstreamErrorResponse = (payload) => {
    const response = {
        error: true,
        payload
    }

    return response;
}