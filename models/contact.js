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

const productSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    phone: Joi.string().min(7).max(16).required(),
    favorite: Joi.boolean().required(),
  
  });

//   const shemas = {
//     productSchema,
//   };

// TEST Error
contactSchema.post("save", handleMongooseError)

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    productSchema,
};