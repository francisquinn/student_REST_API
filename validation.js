// Joi validation
const Joi = require('@hapi/joi');
const passwordComplexity = require('joi-password-complexity');

const passworedOptions = {
    min : 8,
    max : 255,
    lowerCase : 1,
    upperCase : 1,
    numeric : 1,
    symbol: 0,
    requirementCount: 4,
};

// register validation
const registerValidation = data => {
   const joiSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().min(6).required().email(),
    password: passwordComplexity(passworedOptions)
    
}) 

return joiSchema.validate(data);
}

// login validation
const loginValidation = data => {
    const joiSchema = Joi.object({
     email: Joi.string().min(6).required().email(),
     password: Joi.string().min(8).required()
 }) 
 
 return joiSchema.validate(data);
 }

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;