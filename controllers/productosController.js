const db = require('../src/database/models')
const { Sequelize, Op, Model, DataTypes } = require('sequelize');
productosController = {
    detalle: async (req, res) => {
        if(req.cookies.rango != undefined){
            req.session.rango = req.cookies.rango;
            if (req.session.rango == "admin") {
            const product = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("productDetail_admin", { product });
            } else {
            const product = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("productDetail_cliente", { product });}
        }else if(req.session.rango == "admin"){
            const product = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("productDetail_admin", { product });
        }else if(req.session.rango != "admin"){
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
        if(req.session.rango == "admin"){
            let listaProductos = await db.Product.findAll();
            return res.render("list", { listaProductos, req: req });

       }else if(req.session.rango != "admin"){
        let listaProductos = await db.Product.findAll();
        return res.render("list_admin", { listaProductos, req: req });
       }
    },
    addProducts: (req, res) => {
        if(req.cookies.rango != undefined){
            req.session.rango = req.cookies.rango;
            if (req.session.rango == "admin") {
            return res.render("addProducts")
            }
        }else if(req.session.rango == "admin"){
                return res.render("addProducts")
        
        }
    },
    storeProducts:  async(req, res) => {
        await db.Product.create({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            color: req.body.color,
            precio: req.body.precio,
            categoria: req.body.categoria,
            imagen: req.file ? req.file.filename : "default-image.png"
        })
        res.redirect("/productos/productList");
        
    },
    editar: async(req, res) => {
        if(req.cookies.rango != undefined){
            req.session.rango = req.cookies.rango;
            if (req.session.rango == "admin") {
        const productToEdit = await db.Product.findOne({where: {producto_id: req.params.id}})
        return res.render("edit", { productToEdit });
            }
        } else if(req.session.rango == "admin"){
            const productToEdit = await db.Product.findOne({where: {producto_id: req.params.id}})
            return res.render("edit", { productToEdit });
        }
        
    },
    update: async(req, res) => {
        const id = req.params.id;
        await db.Product.update(
            {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            color: req.body.color,
            precio: req.body.precio,
            categoria: req.body.categoria,
            imagen: req.file ? req.file.filename : await db.Product.findOne({where: {producto_id: id}}).then(resultado => resultado.dataValues.imagen)
            },
            {
                where: {producto_id : id}
            }

        )
        res.redirect("/productos/productList");

    },
    eliminar: async(req, res) => {
        await db.Product.destroy({
            where: {producto_id: req.params.id}
        });
        res.redirect("/productos/productList");
    },
    search: async(req, res)=>{

        let prod = await db.Product.findAll({where: {nombre: {[Sequelize.Op.like]:"%"+ req.query.query +"%"}}})
          return res.render("list", { listaProductos: prod});
      
    
    },
    filtro: async(req, res)=>{
        let listaProductos = await db.Product.findAll({where: {categoria: req.params.categoria}})
        return res.render("list", { listaProductos});
    }

}



module.exports = productosController;