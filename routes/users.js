const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");
const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
  let folder = path.join(__dirname, "../public/images");
      callback(null, folder);  
  },
    filename: (req, file, callback) => {
   let imageName = Date.now() + path.extname(file.originalname);
  callback(null, imageName);
  }
  });
  const fileUpload = multer({ storage});

  router.get("/register", usersController.register);

  router.get("/login", usersController.login);

  module.exports = router;