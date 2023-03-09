module.exports = (sequelize, dataTypes) => {
    let alias = 'Venta';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        fecha_venta: {
            type: dataTypes.DATE
        }
    };
    let config = {
        tableName: 'ventas',
        timestamps: false
    };
    const Venta = sequelize.define(alias, cols, config)

    return Venta
}