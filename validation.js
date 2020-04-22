// Joi validation
const Joi = require('@hapi/joi');

// register validation
const registerValidation = data => {
   const joiSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required()
}) 

return joiSchema.validate(data);
}

// login validation
const loginValidation = data => {
    const joiSchema = Joi.object({
     email: Joi.string().min(6).required().email(),
     password: Joi.string().min(6).required()
 }) 
 
 return joiSchema.validate(data);
 }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;