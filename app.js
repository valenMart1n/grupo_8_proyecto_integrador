const express = require("express");

const app = express();

let mainRoutes = require("./routes/main");
let productosRoutes = require("./routes/productos");

app.use(express.static("public"));

app.set("view engine", "ejs");

app.use("/", mainRoutes);

app.use("/productos", productosRoutes);


app.listen(3030, () => console.log("Servidor Abierto en puerto 3030"));