const JoiBase = require('joi');
const JoiDate = require("@joi/date")
const Joi = JoiBase.extend(JoiDate)

// const TIME_REGEX = /^\b((1[0-2]|0?[1-9]):([0-5][0-9])([AaPp][Mm]))$/
const TIME_REGEX = /^([0-9]{2})\:([0-9]{2})$/

const FoodAddSchema = Joi.object({
    dateOfConsumption: Joi.date().required(),
    timeOfConsumption: Joi.string().regex(TIME_REGEX).required(),
    name : Joi.string().required(),
    calorie : Joi.number().required(),
    userId: Joi.string()
})

const IdSchema = Joi.object({
    id: Joi.string().required(),
})

const ProductIdSchema = Joi.object({
    productId: Joi.string().required(),
    id: Joi.string().required(),
})

const ProductSchema = Joi.object({
    _id: Joi.string().required(),
    calorie: Joi.number().required(),
    name: Joi.string().required(),
    time: Joi.string().regex(TIME_REGEX).required()
})

const FoodSchema = Joi.object({
    dateOfConsumption: Joi.date().required()
})

module.exports = {
    FoodAddValidation : FoodAddSchema,
    FoodIdValidation: IdSchema,
    FoodProductValidation: ProductSchema,
    ProductIdValidation: ProductIdSchema,
    FoodSchemaValidation: FoodSchema
}