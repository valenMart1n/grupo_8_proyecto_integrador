const express = require("express");

const app = express();

const methodOverride =  require('method-override');

let mainRoutes = require("./routes/main");
let productosRoutes = require("./routes/productos");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(methodOverride('_method'));
app.use(express.static("public"));


app.set("view engine", "ejs");

app.use("/", mainRoutes);

app.use("/productos", productosRoutes);



app.listen(3030, () => console.log("Servidor Abierto en puerto 3030"));