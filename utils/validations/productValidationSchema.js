const Joi = require('joi');

const createProductValidation = (body) => {
    const schema = Joi.object({
        title: Joi.string().required().label("title"),
        price: Joi.number().required().label("price"),
        quantity: Joi.number().required().label("quantity"),
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
    createProductValidation,
}