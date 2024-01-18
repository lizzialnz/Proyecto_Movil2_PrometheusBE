const sequelize = require('sequelize');
const db = require('../configs/db');
const Categorias = db.define
(
    "categorias",
    {
        idcategorias: 
        {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        descripcion: 
        {
            type: sequelize.STRING(45),
            allowNull: false,
        },
    },
        {
            tableName: "categorias",
            timestamps: false,
        }
    
);
    module.exports = Categorias;