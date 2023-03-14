const express = require("express");
const router = express.Router();
const path = require("path");
const productosController = require("../controllers/productosController");
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
const fileUpload = multer({ storage });

router.get("/productDetail/:id", productosController.detalle);

router.get("/productCart", productosController.carrito);

router.get("/productList", productosController.listaProductos);

router.get("/create", productosController.addProducts)
router.post("/productList", fileUpload.single("imagen"), productosController.storeProducts)

router.get('/edit/:id', productosController.editar);
router.put('/edit/:id', fileUpload.single("imagen"), productosController.update);

router.delete('/delete/:id', productosController.eliminar);
module.exports = router;