const Joi = require('joi');

const UserSchema = Joi.object({
    name: Joi.string().required(),
    email : Joi.string().email().required(),
    password : Joi.string().min(5).required(),
    isAdmin: Joi.boolean()
})

const UserLoginSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().min(5).required()
})

const InviteFriendSchema = Joi.object({
    name: Joi.string().required(),
    email : Joi.string().email().required()
})

const UserIdParamSchema = Joi.object({
    userId: Joi.string().required()
})

module.exports = {
    UserValidation : UserSchema,
    UserLoginValidation: UserLoginSchema,
    InviteFriendValidation: InviteFriendSchema,
    UserIdValidation: UserIdParamSchema
}