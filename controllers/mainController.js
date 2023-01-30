const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let mainController = {
    index: (req, res) =>{
        return res.render("index");
    },
    register: (req, res) =>{
        return res.render("register");
    },
    login: (req, res) =>{
        return res.render("login");
    }
   
}
module.exports = mainController, listaProductos;