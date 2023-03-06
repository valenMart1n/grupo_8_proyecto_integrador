const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/products.json');
let listaProductos = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

productosController = {
    detalle: (req, res) =>{
		if(req.session.rango != "admin"){
			let list = getProductList()
			const product = list.find(products => products.id == req.params.id);
			return res.render("productDetail_admin", {product});
		}else{
			const product = listaProductos.find(products => products.id == req.params.id);
			return res.render("productDetail_cliente", {product});
		}     
       
    },
    carrito: (req, res) =>{
		if(req.session.rango != undefined){
			res.render("productCart");
		}else{
			res.redirect("/users/login");
		}        
    },
    lista: (req, res) =>{
        let list = getProductList();
		let nro = list.length + 1;
		let productos = {
			nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            imagen: req.file?.filename ? req.file.filename:"default-image.png",
            colores: req.body.color,
			precio: req.body.precio,
			categoria: req.body.category,
            id: nro
            
		}
		
		list.push(productos);
		fs.writeFileSync(productsFilePath, JSON.stringify(list, null, 2));
		res.redirect("/productos/productList");
    },
    listaProductos: (req, res) => {
		let listaProductos = getProductList();
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
			imagen: req.body.imagen
		}
		guardarProducto(productToEdit);
		return res.redirect("/productos/productList");

	},
    eliminar : (req, res) => {
        eliminarProducto(req.params.id);
		res.redirect("/productos/productList");
	}

}
function getProductList(){
    let listFilePath = path.join(__dirname, '../data/products.json');
	let list = JSON.parse(fs.readFileSync(listFilePath, 'utf-8'));
	return list;
}
function guardarProducto(productToEdit){
	const products = getProductList();

	const productList = products.map(prod => {
		if(prod.id == productToEdit.id){
			return productToEdit;
		}
		return prod;
	});
	fs.writeFileSync(productsFilePath, JSON.stringify(productList, null, 2));

}

function eliminarProducto(id){
	let listFilePath = path.join(__dirname, '../data/products.json');
	let list = JSON.parse(fs.readFileSync(listFilePath, 'utf-8'));
	list = list.filter(product => product.id != id);
	fs.writeFileSync(listFilePath, JSON.stringify(list, null, 2));

}



module.exports = productosController, listaProductos;