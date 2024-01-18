const sequelize = require('sequelize');
const db = require('../configs/db');
const Detalles_Factura = db.define(
    "detalles_factura",
    {
        iddetalles_Factura: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "ID no es valido."
                }
            },
        },
        cantidad: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "cantidad no valida"
                }
            },
        },
        subtotal: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "impuesto no valido"
                }
            },
        },
        impuesto: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "impuesto no valido"
                }
            },
        },
        total: {
            type: sequelize.DOUBLE,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "total no valido "
                }
            },
        },
        idfacturas: {
            type: sequelize.INTEGER,
            allowNull: true,
        },
        idproductos: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "ID de producto invalido."
                }
            },
        },
        nombre_producto: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate:
            {
                notEmpty:
                {
                   msg: 'Ingrese nombre de producto'
                }
            },
        },
        idusuario: {
            type: sequelize.INTEGER,
            allowNull: false,
            validate: {
                is:{
                    args: [/^[0-9]+$/],
                    msg: "ID de usuario invalido."
                }
            },
        },
        nombre_usuario: {
            type: sequelize.STRING(45),
            allowNull: false,
            validate:
            {
                notEmpty:
                {
                   msg: 'Ingrese nombre de usuario'
                }
            },
        },
    },
    {
        tableName: "detalles_factura",
        timestamps: false,
    }
);
module.exports = Detalles_Factura;