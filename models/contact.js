const {Schema, model} = require("mongoose");
const {handleMongooseError} = require("../helpers");
const Joi = require ("joi");



const contactSchema = new Schema({
    name: {
        type: String,
        // required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "user",
        require: true,
    }

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


  const schemas = {
    contactAddSchema,
    updateFavoriteSchema,
  };

// TEST Error
contactSchema.post("save", handleMongooseError);

const Contact = model("contact", contactSchema);

module.exports = {
    Contact,
    schemas,
};