const express = require("express");
const app = express();
const path = require("path");

app.listen(3030, () => console.log("Servidor Abierto en puerto 3030"));
app.use(express.static("public"));
app.get("/", function(req, res){
    let htmlPath = path.resolve(__dirname, "./views/index.html");
    res.sendFile(htmlPath);
});
app.get("/productDetail", function(req, res){
    let htmlPath = path.resolve(__dirname, "./views/productDetail.html");
    res.sendFile(htmlPath);
});
app.get("/productCart", function(req, res){
    let htmlPath = path.resolve(__dirname, "./views/productCart.html");
    res.sendFile(htmlPath);
});
app.get("/login", function(req, res){
    let htmlPath = path.resolve(__dirname, "./views/login.html");
    res.sendFile(htmlPath);
});
app.get("/register", function(req, res){
    let htmlPath = path.resolve(__dirname, "./views/register.html");
    res.sendFile(htmlPath);
});
