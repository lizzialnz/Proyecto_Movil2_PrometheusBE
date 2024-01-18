const passport = require('passport');
const ModeloCliente = require('../models/modeloUsuario');
const estrategiaJWT = require("passport-jwt").Strategy;
const extraerJWT = require("passport-jwt").ExtractJwt;
const jWT = require("jsonwebtoken");
const moment =require('moment');
const duracion = moment.duration(2000, "m").asSeconds();
const clave = 'MyClaveSegura';
exports.getToken = (data) => {
    return jWT.sign(data, clave, { expiresIn: duracion });
  };
const opciones = {};
opciones.jwtFromRequest = extraerJWT.fromAuthHeaderAsBearerToken();
opciones.secretOrKey = clave;

passport.use( new estrategiaJWT(opciones, async (payload, done) => {
    return await ModeloCliente.findOne({
        where:{
            idusuario: payload.idusuario, 
        }
    })
    .then((data) =>{
        return done(null, data.idusuario);    
    })
    .catch((error) =>{
        return done(null, false);
    });
}));
exports.validarAutenticado = passport.authenticate('jwt', { session: false, failureRedirect:'/api/autenticacion/error/', });
