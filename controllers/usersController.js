const db = require('../src/database/models');
const sequelize = db.sequelize;

const Users = db.Usuario;

let bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");
let secretId;

let usersController = {
    register: (req, res) =>{
        if(req.session.rango != undefined){
            res.redirect("/users/profile/" + secretId);
        }else{
            return res.render("users/register", { req: req });
        }
    },
    login: (req, res) =>{
        if(req.session.rango != undefined){
			res.redirect("/users/profile/" + secretId)
            console.log(secretId)
		}else if(req.cookies.recordame != undefined){
            res.redirect("/users/profile/" + secretId);
        }else{
			res.render("users/login", { req: req });
     }
		     
    },
    addUser: async (req, res) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(req.body);
            const valores = req.body;
            const validaciones = errors.array();
            res.render('users/register', {validaciones:validaciones, valores: valores});
        }else{
            let email = req.body.email;
            await db.Usuario.findOne({
            where: {
                email
            }
        }).then(resultados =>{
            if(resultados != undefined){
            res.render("users/register");    
            }else{
                db.Usuario.create({
                    nombre: req.body.nombre,
                    apellido: req.body.apellido,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 10),
                    imagen: req.file?.filename ? req.file.filename:"default-image.png",
                    rango: "cliente",
                    sexo: req.body.sexo
                    
                });
                req.session.rango = "cliente";
                res.redirect("/");
            }
        });           
        }
    },
    admin: async(req, res)=>{
       let listaUsers = await db.Usuario.findAll();
       
       return res.render("admin", {listaUsers});
    },
    loginUser: async (req, res) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
           
            const valores = req.body;
            const validaciones = errors.array();
            res.render('users/login', {validaciones:validaciones, valores: valores});
        }else{
        let email = req.body.email;
        await db.Usuario.findOne({
            where: {
                email
            }
        }).then(resultados =>{
            if(bcrypt.compareSync(req.body.password, resultados.dataValues.password)){
            console.log(resultados.dataValues);
            secretId= resultados.dataValues.id;
            req.session.rango = resultados.dataValues.rango;
            if(req.body.recordame != undefined){
            res.cookie("recordame", email, {maxAge: 999999999999});
            res.cookie("rango", resultados.dataValues.rango, {maxAge: 999999999999});
            }
          
            res.render('index', { req: req });
            }else{
                res.render("users/login", {mensaje: "Correo o contraseña incorrectos"});
            }
        });
    }
        
    },
    profile:(req, res) =>{
        const userId = req.params.id;
        
        Users.findOne({
            where: { id: userId }
          })
          .then(user => {
            console.log(user.imagen);
            res.render('perfil', { usuario: user, req: req });
          })
          .catch(error => {
            console.log(error);
          });
     },
     logout:(req,res) =>{
    
            req.session.rango = undefined;
            res.clearCookie ("recordame");
            res.clearCookie ("rango");
            res.render("index")
     },
     updateUser: async(req, res) => {

        const id = req.params.id;
        const usuario = await db.Usuario.findOne({where: {id: req.params.id}})
        await db.Usuario.update(
            {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            email: req.body.email,
            imagen: req.file ? req.file.filename : await db.Usuario.findOne({where: {id}}, {attributes: ['imagen']}).imagen
            },
            {
                where: {id}
            }

        )
        return  res.redirect("/users/profile/" + id)

    }

};

module.exports = usersController;