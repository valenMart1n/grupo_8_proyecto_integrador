const db = require('../src/database/models')

productosController = {
    detalle: async (req, res) => {
        if (req.session.rango == "admin") {
            const product = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("productDetail_admin", { product });
        } else {
            const product = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("productDetail_cliente", { product });
        }

    },
    carrito: (req, res) => {
        if (req.session.rango != undefined) {
            res.render("productCart");
        } else {
            res.redirect("/users/login");
        }
    },
    listaProductos: async(req, res) => {
        let listaProductos = await db.Product.findAll();
        return res.render("list", { listaProductos });
    },
    addProducts: (req, res) => {
        return res.render("addProducts")
    },
    storeProducts: async (req, res) => {
        db.Product.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            color: req.body.color,
            precio: req.body.precio,
            categoria: req.body.category,
            imagen: req.file ? req.file.filename : "default-image.png"
        });
        res.render("list", {listaProductos: await db.Product.findAll()});
    },
    editar: async(req, res) => {
        
        const productToEdit = await db.Product.findOne({where: {producto_id: req.params.id}})
        return res.render("edit", { productToEdit });
        
    },
    update: async(req, res) => {
        const id = req.params.id;
        db.Product.update(
            {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            color: req.body.color,
            precio: req.body.precio,
            categoria: req.body.category,
            imagen: req.file ? req.file.filename : "default-image.png"
            },
            {
                where: {producto_id : id}
            }

        )
        return res.render("list", {listaProductos: await db.Product.findAll()});

    },
    eliminar: (req, res) => {
        eliminarProducto(req.params.id);
        res.redirect("/productos/productList");
    }

}

function getProductList() {


}

function guardarProducto(productToEdit) {
    const products = getProductList();

    const productList = products.map(prod => {
        if (prod.id == productToEdit.id) {
            return productToEdit;
        }
        return prod;
    });


}

function eliminarProducto(id) {
    list = list.filter(product => product.id != id);


}



module.exports = productosController;