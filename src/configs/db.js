const sequelize = require('sequelize');
const db = new sequelize(
    'proyectomovil2',
    'movil2',
    'movil2',
    {
        host: '127.0.0.1',
        dialect: 'mysql',
        port: '3306',
    }  
); 
module.exports=db;