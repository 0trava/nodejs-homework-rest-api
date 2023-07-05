const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require ("joi");



const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        default: false,
        required: true,
    },

}, {versionKey: false, timestamps: true});

const contactAddSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(7).max(16).required(),
    favorite: Joi.boolean().required(),
  
  });

const updateFavoriteSchema = Joi.object ( {
    favorite: Joi.boolean().required(),
})


  const shemas = {
    contactAddSchema,
    updateFavoriteSchema,
  };

// TEST Error
contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    shemas,
};