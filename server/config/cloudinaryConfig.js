require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const generateUploadSignature = () => {
  const timestamp = Math.round(new Date().getTime() / 1000); // UNIX timestamp
  const paramsToSign = `timestamp=${timestamp}&upload_preset=${process.env.CLOUDINARY_UPLOAD_PRESET}`;

  const signature = cloudinary.utils.api_sign_request(paramsToSign, process.env.CLOUDINARY_API_SECRET);
  return { signature, timestamp };
};

module.exports = generateUploadSignature;
