const {Schema, model} = require("mongoose");
const Joi = require ("joi");

const {handleMongooseError} = require("../helpers");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSchema = new Schema ({
    name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        match: emailRegexp,
        required: [true, 'Email is required'],
        unique: true, // Chack is email exist
    },
    password: {
        type: String,
        minlenght: 6,
        required: [true, 'Set password for user'],
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter",
      },
    token: {
        type: String,
    },
    avatarURL: {
        type: String,
    },
    verify: {
        type: Boolean,
        default: false,
    },
    verificationToken: {
        type: String,
        required: [true, 'Verify token is required'],
    },


}, {versionKey: false, timestamps: true});


// TEST Error
userSchema.post("save", handleMongooseError);

const registerSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
  });


const loginSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
    password: Joi.string().min(6).required(),
});

const subscriptionSchema = Joi.object({
    subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    registerSchema,
    loginSchema,
    subscriptionSchema,
    emailSchema,
}



const User = model("user", userSchema);

module.exports = {
    User,
    schemas,
}