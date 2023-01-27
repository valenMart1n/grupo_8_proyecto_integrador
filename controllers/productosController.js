const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

productosController = {
    detalle: (req, res) =>{
        return res.render("productDetail");
    },
    carrito: (req, res) =>{
        return res.render("productCart");
    },
    lista: (req, res) =>{
        return res.render("list",  { listaProductos: listaProductos });
    },
    addProducts: (req, res) =>{
        return res.render("addProducts")
    }
}


module.exports = productosController, listaProductos;