const bcrypt = require('bcryptjs');
const gravatar = require("gravatar"); // library to generate avatar


require("dotenv").config();

const {User} = require("../../models/user");
const {HttpError} = require('../../helpers');

// SignUp
const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) { throw HttpError(409, "Email in use")};


    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email); // Add avatar from Gravatar library
    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json ({
        email: newUser.email,
        subscription: newUser.subscription,
    });
}

module.exports = register;