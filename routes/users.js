const express = require("express");
const router = express.Router();
const path = require("path");
const usersController = require("../controllers/usersController");
const multer = require("multer");
const {body} = require('express-validator');
const { mainModule } = require("process");



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

  router.get("/register" ,usersController.register);
  router.post("/",fileUpload.single("imagen"), [
    body('nombre', 'Ingrese un nombre')
        .exists()
        .isLength({min:1}),
    body('apellido', 'Ingrese su apellido')
        .exists()
        .isLength({min:1}),
    body('email', 'Ingrese un E-mail válido')
        .exists()
        .isEmail(),
    body('password', 'Ingrese una contraseña')        
        .exists()
        .isLength({min:1}),
], usersController.addUser);

  router.get("/login", usersController.login);

  router.get("/profile/:id", usersController.profile);

  router.get("/userInfo", usersController.profile);

  module.exports = router;