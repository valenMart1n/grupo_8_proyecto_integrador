const db = require('../src/database/models');
const sequelize = db.sequelize;

const Users = db.User;

let bcrypt = require("bcryptjs");
const {validationResult} = require("express-validator");


let usersController = {
    register: (req, res) =>{
        return res.render("users/register");
    },
    login: (req, res) =>{
        if(req.session.rango != undefined){
			res.render("profile");
		}else{
			res.render("users/login");
		}     
    },
    addUser: (req, res) =>{
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            console.log(req.body);
            const valores = req.body;
            const validaciones = errors.array();
            res.render('users/register', {validaciones:validaciones, valores: valores});
        }else{
           
            db.User.create({
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
    },
     profile:(req, res) =>{
      
        return res.render("profile", {profile});
     }   
};

module.exports = usersController;