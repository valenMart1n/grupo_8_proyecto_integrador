const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser")


const app = express();

const methodOverride =  require('method-override');

let mainRoutes = require("./routes/main");
let api = require("./routes/api");
let productosRoutes = require("./routes/productos");
let usersRoutes = require("./routes/users");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(cookieParser("S3CR3T0"));
app.use(methodOverride('_method'));
app.use(express.static("public"));


app.set("view engine", "ejs");


app.use(session({secret: "session", resave: false, saveUninitialized: false}));

app.use("/", mainRoutes);

app.use("/api", api);

app.use("/productos", productosRoutes);

app.use("/users", usersRoutes);




app.listen(3030, () => console.log("Servidor Abierto en puerto 3030"));