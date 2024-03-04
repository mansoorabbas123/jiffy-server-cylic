const Joi = require('joi');
const passwordComplexity = require('joi-password-complexity');

const loginBodyValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("email"),
        password: Joi.string().required().label("password")
    })
    return schema.validate(body);
}

const refreshTokenBodyValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("refreshToken"),
    })
    return schema.validate(body);
}

const createCategoryValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required().label("title"),
        description: Joi.string().required().label("description"),
        image: Joi.array().items(
            Joi.any().custom((value, helpers) => {
                if (!value) return value; // Ignore if no image provided
                if (value.size > 1024 * 1024 * 5) { // 5MB
                    return helpers.error('file.size');
                }
                if (!['image/jpeg', 'image/png'].includes(value.mimetype)) {
                    return helpers.error('file.type');
                }
                return value;
            })
        )
    })
    return schema.validate(body);
}

module.exports = {
    loginBodyValidation,
    refreshTokenBodyValidation,
    createCategoryValidation,
}