const db = require('../src/database/models');
const sequelize = db.sequelize;

const Users = db.Usuario;

let bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");


let usersController = {
    register: (req, res) =>{
        if(req.session.rango != undefined){
            res.redirect("/users/profile");
        }else{
            return res.render("users/register");
        }
    },
    login: (req, res) =>{
        if(req.session.rango != undefined){
			res.redirect("/users/profile");
		}else if(req.cookies.recordame != undefined){
            res.redirect("/users/profile");
        }else{
			res.render("users/login");
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
            req.session.id = resultados.dataValues.id;
            req.session.rango = resultados.dataValues.rango;
            if(req.body.recordame != undefined){
            res.cookie("recordame", email, {maxAge: 999999999999});
            res.cookie("rango", resultados.dataValues.rango, {maxAge: 999999999999});
            }
          
            res.redirect("/");
            }else{
                res.render("users/login", {mensaje: "Correo o contraseña incorrectos"});
            }
        });
    }
        
    },
     profile:(req, res) =>{
        let email = req.cookies.recordame;

        return res.render("perfil", {profile});
     }   
};

module.exports = usersController;