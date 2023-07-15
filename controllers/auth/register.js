const bcrypt = require('bcryptjs');
const gravatar = require("gravatar");
// const {nanoid} = require("nanoid");
const { randomUUID } = require('crypto');


require("dotenv").config();

const {BASE_URL} = process.env;

const {User} = require("../../models/user");
const {HttpError, sendEmail} = require('../../helpers');

// SignUp
const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) { throw HttpError(409, "Email in use")};


    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email); // Add avatar from Gravatar library
    const verificationToken = randomUUID();
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: "Сonfirm your registration",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to confirm your registration</a>`,

    };

    await sendEmail(verifyEmail);



    res.status(201).json ({
        email: newUser.email,
        subscription: newUser.subscription,
    });
}

module.exports = register;