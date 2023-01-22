const express = require("express");
const router = express.Router();

const productosController = require("../controllers/productosController");

router.get("/productDetail", productosController.detalle);

router.get("/productCart", productosController.carrito);

router.get("/productList", productosController.lista);
module.exports = router;