const sequelize = require('sequelize');
const db = require('../configs/db');
const bcrypt = require('bcrypt');

const Usuario = db.define(
    "usuarios",
    {
        idusuario: {
            type: sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
            
        },
        nombre_completo: {
            type: sequelize.STRING(255),
            allowNull: false,
        },
        nombre_usuario: {
            type: sequelize.STRING(45),
            allowNull: false, 
            unique: 
            {
                msg: 'El usuario debe ser unico'
            },
            
        },
        correo: {
            type: sequelize.STRING(255),
            allowNull: false,
        },
        telefono: {
            type: sequelize.STRING(15),
            allowNull: false,
        },
        contrasena_encriptada: {
            type: sequelize.STRING(255),
            allowNull: false,
            validate:
            {
                notEmpty:
                {
                   msg: 'Ingrese la contrasena'
                }
            },
        },
        direccion_usuario: {
            type: sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        tableName: "usuarios",
        timestamps: false,
        hooks : {
            beforeCreate(Usuario) {
              const hash = bcrypt.hashSync(Usuario.contrasena_encriptada, 10);
              Usuario.contrasena_encriptada = hash;
            },
            beforeUpdate(Usuario){
              const hash = bcrypt.hashSync(Usuario.contrasena_encriptada, 10);
              Usuario.contrasena_encriptada = hash;
            }
          },  
    },

   
);
Usuario.prototype.verificarContrasena = (con, com)=>{
    return bcrypt.compareSync(con, com);
}

module.exports = Usuario;
