const Jimp = require("jimp");


const resizeImage = async (tempUpload) => {
    await Jimp.read(tempUpload)
    .then((avatar) => {
      return avatar
        .resize(250, 250) // resize
        .write(tempUpload); // save
    })
    .catch((err) => {
      throw err;
    });

    return tempUpload;
}

module.exports = resizeImage;
