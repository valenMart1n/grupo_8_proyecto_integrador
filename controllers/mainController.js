const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

let mainController = {
    index: (req, res) =>{
        return res.render("index");
    }
   
}
module.exports = mainController, listaProductos;