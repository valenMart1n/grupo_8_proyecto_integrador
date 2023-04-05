module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        producto_id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        venta_id: {
            type: dataTypes.INTEGER
        },
        nombre: {
            type: dataTypes.STRING
        },
        color: {
            type: dataTypes.STRING
        },
        categoria: {
            type: dataTypes.STRING
        },
        precio: {
            type: dataTypes.DECIMAL
        },
        descripcion: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        },
        stock: {
            type: dataTypes.INTEGER
        }
    };
    let config = {
        tableName: 'productos',
        timestamps: false
    };
    const Product = sequelize.define(alias, cols, config)

    return Product
}