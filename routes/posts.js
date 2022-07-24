const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/uploads/" });
const { postIndex, postStore } = require("./../controllers/postsController");
const { checkSchema } = require("express-validator");

router.get("/", postIndex);
// router.post("/", upload.single("photo"), postStore);
router.post(
  "/",
  //   body("name")
  //     .notEmpty()
  //     .withMessage("Name is required")
  //     .isString()
  //     .withMessage("Name must be a string")
  //     .isLength({ max: 10 })
  //     .withMessage("Name must be max 10 characters"),
  //   body("email")
  //     .notEmpty()
  //     .withMessage("Email is required")
  //     .isEmail()
  //     .withMessage("Email is not a valid email address"),
  checkSchema(
    {
      name: {
        notEmpty: {
          errorMessage: "Name is required",
        },
        isString: {
          errorMessage: "Name must be a string",
        },
      },
      email: {
        notEmpty: {
          errorMessage: "Email is required",
        },
        isEmail: {
          errorMessage: "Email must be a valid email address",
        },
      },
    },
    ["body"]
  ),
  postStore
);

module.exports = router;
