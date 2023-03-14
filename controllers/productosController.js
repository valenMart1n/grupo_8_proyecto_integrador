const db = require('../src/database/models')

productosController = {
    detalle: (req, res) => {
        if (req.session.rango == "admin") {
            let list = getProductList()
            const product = list.find(products => products.id == req.params.id);
            return res.render("productDetail_admin", { product });
        } else {
            const product = listaProductos.find(products => products.id == req.params.id);
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
    storeProducts: (req, res) => {
        db.Product.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            color: req.body.color,
            precio: req.body.precio,
            category: req.body.category,
            imagen: req.file ? req.file.filename : "default-image.png"
        });
        res.render("/productos/productList");
    },
    editar: (req, res) => {

        const productToEdit = listaProductos.find(prod => prod.id == req.params.id);
        return res.render("edit", { productToEdit });
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