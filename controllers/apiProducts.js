const db = require('../src/database/models');
let resultado;
let apiProducts = {
    list: async (req, res) =>{
        res.json({
            count: await db.Product.count(),
            countByCategory:
            {
                Buzos: Array.from(await db.Product.findAll({where: {categoria: "buzo"}})).length,
                Remeras: Array.from(await db.Product.findAll({where: {categoria: "remera"}})).length,
                Pantalones: Array.from(await db.Product.findAll({where: {categoria: "pantalon"}})).length

            },
            productos:  resultado = Array.from(await db.Product.findAll()).map(function(datos){
                return {
                    id: datos.producto_id,
                    nombre: datos.nombre,
                    descripcion: datos.descripcion,
                    detalle: "http://localhost:3030/api/products/" + datos.producto_id
                }
            })
        })
    },
    detail: async(req, res) =>{
        await db.Product.findOne({
            where: {
                producto_id: req.params.id
            }
        }).then(resultados =>{
        res.json({
            id: resultados.dataValues.producto_id,
            nombre: resultados.dataValues.nombre,
            descripcion: resultados.dataValues.descripcion,
            color: resultados.dataValues.color,
            precio: resultados.dataValues.precio,
            url: resultados.dataValues.imagen

         })

    })  
    }
    
}
module.exports = apiProducts;