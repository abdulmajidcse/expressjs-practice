const multer = require("multer");
const storage = require("./../config/filestorage");

const upload = multer({
  storage: storage(),
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "photo") {
      const mimeType = file.mimetype;
      if (
        mimeType === "image/jpg" ||
        mimeType === "image/jpeg" ||
        mimeType === "image/png"
      ) {
        // accept the file
        return cb(null, true);
      } else {
        // reject the file
        const error = [
          {
            msg: "Only jpg, jpeg and png format allowed",
            param: "photo",
            location: "body",
          },
        ];
        return cb(error, false);
      }
    } else {
      // reject this file
      cb(null, false);
    }
  },
});

module.exports = upload;
