const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
const listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

productosController = {
    detalle: (req, res) =>{
        const product = listaProductos.find(products => products.id == req.params.id);
		return res.render("productDetail", {product});
    },
    carrito: (req, res) =>{
        return res.render("productCart");
    },
    lista: (req, res) =>{
        let nro = listaProductos.length + 1;
		let productos = {
			nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.file.filename,
            colores: req.body.color,
			precio: req.body.precio,
			categoria: req.body.category,
            id: nro
            
		}
		
		listaProductos.push(productos);
		fs.writeFileSync(productsFilePath, JSON.stringify(listaProductos, null, 2));
		res.render("list", {listaProductos});
    },
    listaUser: (req, res) => {
        res.render("list", {listaProductos});
    },
    addProducts: (req, res) =>{
        return res.render("addProducts")
    },

    editar: (req, res) => {
		const productToEdit = listaProductos.find(prod => prod.id == req.params.id);
		return res.render("edit", {productToEdit});
	},
	
	update: (req, res) => {
		const id = req.params.id;
		const productToEdit = {
			id,
			...req.body,
			image: req.file?.filename ? req.file.filename:"default-image.png"
		}
		guardarProducto(productToEdit);
		return res.redirect("/productos");

	},
    eliminar : (req, res) => {
        eliminarProducto(req.params.id);
		return res.redirect("list");
	}

}
function getProductList(path){
    return JSON.parse(fs.readFileSync(path, "utf-8"));
}
function guardarProducto(productToEdit){
	const products = getProductList(productsFilePath);

	const productList = products.map(prod => {
		if(prod.id == productToEdit.id){
			return productToEdit;
		}
		return prod;
	});
	fs.writeFileSync(productsFilePath, JSON.stringify(productList, null, 2));

}

function eliminarProducto(id){
	let products = getProductList(productsFilePath);
	products = products.filter(product => product.id != id);
	fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));

}



module.exports = productosController, listaProductos;