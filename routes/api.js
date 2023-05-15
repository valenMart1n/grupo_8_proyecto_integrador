const express = require("express");
const router = express.Router();
const path = require("path");
const apiUsers = require("../controllers/apiUsers");
const apiProducts = require("../controllers/apiProducts");
//Rutas de la api Users
router.get("/users", apiUsers.list);
router.get("/users/:id", apiUsers.detail);
//Rutas de la api Products
router.get("/products", apiProducts.list);
router.get("/products/:id", apiProducts.detail);
module.exports = router;