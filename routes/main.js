const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController");

const multer = require("multer");

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
  let folder = path.join(__dirname, "../../public/images/products");
      callback(null, folder);  
  },
    filename: (req, file, callback) => {
   let imageName = Date.now() + path.extname(file.originalname);
  callback(null, imageName);
  }
  });
  const fileUpload = multer({ storage});


router.get("/", mainController.index);
//router.post("/",fileUpload.single("datos"),mainController.index);



module.exports = router;