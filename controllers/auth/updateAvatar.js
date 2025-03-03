const Jimp = require("jimp"); // JavaScript Image Manipulation Program
const path = require("path");
const fs = require("fs/promises");

require("dotenv").config();

const {User} = require("../../models/user");
const {resizeImage} = require("../../helpers");


const avatarsDir = path.join(__dirname, "../../", "public", "avatars"); // Folder avatars



// Update avatar
const updateAvatar = async (req, res) => {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;

    await resizeImage(tempUpload);

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
      });

}

module.exports = updateAvatar;