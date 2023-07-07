const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar"); // library to generate avatar
const Jimp = require("jimp"); // JavaScript Image Manipulation Program
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const {User} = require("../models/user");
const {HttpError} = require('../helpers');
const {ctrlWrapper} = require('../middlewares');
// const { path } = require('../app');

const {SECRET_KEY} = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars"); // Folder avatars

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


// SignIn
const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) { throw HttpError(401, "Email or password is wrong")};

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) { throw HttpError(401, "Email or password is wrong")};

    const payload = {
        id: user._id
    }
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});

    res.json ({
        token,
    })
}

// LogOut
const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({
        message: 'No Content',
      });
}

// Get User info
const getCurrent = async (req, res) => {
    const  {email, subscription} = req.user;
    res.json ({
        email,
        subscription,
    })

}

// Update subscription
const updateSubscription = async (req, res) => {
    const {_id} = req.user;
    const  {subscription} = req.body;
    await User.findByIdAndUpdate(_id, req.body, { new: true });
    res.json ({
        subscription,
    })
}

// Update avatar
const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;

    await Jimp.read(tempUpload)
        .then((avatar) => {
            return avatar
            .resize(250, 250) // resize
            .quality(60) // set JPEG quality
            .write(tempUpload); // save
        })
        .catch((err) => {
            throw err;
        });

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
      });

}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    logout: ctrlWrapper(logout),
    getCurrent: ctrlWrapper(getCurrent),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}
