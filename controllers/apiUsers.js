const db = require('../src/database/models');
let resultado;
let detalle;
let apiUsers = {
    list: async (req, res) =>{
        res.json({
            count: await db.Usuario.count(),
            users: resultado = Array.from(await db.Usuario.findAll()).map(function(datos){
                return {
                    id: datos.id,
                    nombre: datos.nombre,
                    apellido: datos.apellido,
                    email: datos.email,
                    detalle: "http://localhost:3030/api/users/" + datos.id
                }
            })
            
        })
            },
    detail: async (req, res) =>{
        await db.Usuario.findOne({
            where: {
                id: req.params.id
            }
        }).then(resultados =>{
        res.json({
            id: resultados.dataValues.id,
            nombre: resultados.dataValues.nombre,
            apellido: resultados.dataValues.apellido,
            email: resultados.dataValues.email,
            sexo: resultados.dataValues.sexo,
            url: resultados.dataValues.imagen

         })

    })  
       
    }
   
}
module.exports = apiUsers;