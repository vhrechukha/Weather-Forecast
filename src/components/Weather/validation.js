const Joi = require('@hapi/joi');

/**
 * @exports
 * @method validateCity
 * @param { city, _csrf }
 * @summary validate city and _csrf
 * @returns
 */
function validateCity(city, _csrf) {
    return Joi.object({
        city: Joi
            .string()
            .required(),
        _csrf: Joi
            .string()
            .required(),
    })
        .validate({
            city,
            _csrf,
        },
        { allowUnknown: true });
}

module.exports = {
    validateCity,
};
