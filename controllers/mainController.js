

let mainController = {
    index: (req, res) =>{
        console.log("Lo de las cookies: " + req.cookies.recordame);
        return res.render("index");
    }
   
}
module.exports = mainController;