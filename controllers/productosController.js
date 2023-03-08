


productosController = {
    detalle: (req, res) =>{
		if(req.session.rango == "admin"){
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
		
		res.redirect("/productos/productList");
    },
    listaProductos: (req, res) => {
		
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
    

}
function guardarProducto(productToEdit){
	const products = getProductList();

	const productList = products.map(prod => {
		if(prod.id == productToEdit.id){
			return productToEdit;
		}
		return prod;
	});


}

function eliminarProducto(id){
	list = list.filter(product => product.id != id);


}



module.exports = productosController;