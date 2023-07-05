const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {User} = require("../models/user");
const {HttpError} = require('../helpers');
const {ctrlWrapper} = require('../middlewares');

const {SECRET_KEY} = process.env;

// SignUp
const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) { throw HttpError(409, "Email in use")};


    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});

    res.status(201).json ({
        email: newUser.email,
        subscription: newUser.subscription,
    });
}


// SignIn
const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) { throw HttpError(401, "Email or password is wrong")};

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) { throw HttpError(401, "Email or password is wrong")};

    const token = jwt.sign(user._id, SECRET_KEY, {expiresIn: "23h"});

    // res.json ({
    //     token,
    // })
}



module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
}
