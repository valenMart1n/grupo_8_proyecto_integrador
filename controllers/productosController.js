productosController = {
    detalle: (req, res) =>{
        return res.render("productDetail");
    },
    carrito: (req, res) =>{
        return res.render("productCart");
    },
    lista: (req, res) =>{
        return res.render("list",  { listaProductos: listaProductos });
    },
    addProducts: (req, res) =>{
        return res.render("addProducts")
    }
}
listaProductos = [{
    nombre: "CAMISETA ARGENTINA 2023",
    descripcion: "La nueva camiseta de la selección argentina con tres estrellas",
    imagen: "/images/Camiseta1.png",
    imagen2: "/images/Camiseta2.png",
    colores: "Celeste y Blanca",
    categoria: "Remera",
    precio: "$23.000",
    id: 1
}];

module.exports = productosController, listaProductos;