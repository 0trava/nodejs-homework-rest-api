
require("dotenv").config();

const {User} = require("../../models/user");
const {HttpError, sendEmail} = require('../../helpers');

const {BASE_URL} = process.env;



const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if (!user) {
        throw HttpError(401, "Email not found"); 
    };

    if (user.verify) {
        throw HttpError(400, "Verification has already been passed"); 
    }

    const verifyEmail = {
        to: email,
        subject: "Сonfirm your registration",
        html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to confirm your registration</a>`,

    };

    await sendEmail(verifyEmail);

    res.status(200).json ({
        message: "Verification email sent",
    });



}

module.exports = resendVerifyEmail;