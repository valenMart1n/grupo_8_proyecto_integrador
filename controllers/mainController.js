

let mainController = {
    index: (req, res) =>{
        console.log("Lo de las cookies: " + req.cookies.recordame);
        if(req.cookies.rango != undefined){
            req.session.rango = req.cookies.rango;
            console.log("Lo de las cookies2: " + req.cookies.rango);
        }
        
        return res.render("index");
    }
   
}
module.exports = mainController;