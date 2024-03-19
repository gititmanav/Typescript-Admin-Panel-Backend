import Joi from 'joi';


const signUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(30).required(),
    lastName: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).required(),
    phoneNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required(),
    roleId: Joi.number().integer().max(2).required(),
    profile: Joi.object({
        fieldname: Joi.string(),
        originalname: Joi.string(),
        encoding: Joi.string(),
        mimetype: Joi.string(),
        size: Joi.number(),
        destination: Joi.string(),
        filename: Joi.string(),
        path: Joi.string(),
        buffer: Joi.any(), 
    }).required(),
});

export default signUpSchema;