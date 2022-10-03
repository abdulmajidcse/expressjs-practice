const multer = require("multer");
const path = require("path");
const { randomUUID } = require("crypto");

const storage = (customPath = "", customFileName = "") => {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `public/uploads/${customPath}`);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName =
        (customFileName.trim().length === 0
          ? randomUUID()
          : customFileName.trim()) + ext;
      cb(null, fileName);
    },
  });
};

module.exports = storage;
