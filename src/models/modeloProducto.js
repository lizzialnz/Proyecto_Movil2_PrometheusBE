const sequelize = require("sequelize");
const db = require("../configs/db");
const Producto = db.define(
  "productos",
  {
    idproductos: {
      type: sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]+$/],
          msg: "ID del tipo invalido.",
        },
      },
    },

    nombre_producto: {
      type: sequelize.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ingrese el nombre",
        },
      },
    },
    cantidad_producto: {
      type: sequelize.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]+$/],
          msg: "ingrese cantidad",
        },
      },
    },
    precio_producto: {
      type: sequelize.DOUBLE,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]+$/],
          msg: "ingrese precio",
        },
      },
    },
    marca_producto: {
      type: sequelize.STRING(45),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Ingrese la marca",
        },
      },
    },
    idcategorias: {
      type: sequelize.INTEGER,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]+$/],
          msg: "ID de categorias invalido.",
        },
      },
    },

    costo: {
      type: sequelize.DOUBLE,
      allowNull: false,
      validate: {
        is: {
          args: [/^[0-9]+$/],
          msg: "ingrese costo",
        },
      },
    },
    imagen_producto: {
      type: sequelize.STRING(250),
      allowNull: true,
    },
  },
  {
    tableName: "productos",
    timestamps: false,
  }
);
module.exports = Producto;
