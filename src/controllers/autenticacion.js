const ModeloUsuario = require('../models/modeloUsuario');
const ModeloEmpleado = require('../models/modeloEmpleado')
const {validationResult} = require('express-validator');
const moment = require('moment');
const msj = require('../componentes/mensaje');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
const EnviarCorreo = require('../configs/correo')
exports.validarAutenticado = passport.validarAutenticado;

exports.incioSesion = async (req, res, next)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty)
    {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res);
    }
    else{
        const {nombre_usuario, contrasena_encriptada} = req.body;
        const Buscarusuario = await ModeloUsuario.findOne({
            where:{
                [Op.and]:[{
                    [Op.or]:
                    [
                        {nombre_usuario: nombre_usuario}                        
                    ],
                }],
            }
        });
        if(!Buscarusuario)
        {
            msj("El cliente no existe o se encuentra inactivo", 200,[], res);
        }
        else
        {
            if(!Buscarusuario.verificarContrasena(contrasena_encriptada, Buscarusuario.contrasena_encriptada))
            {
                msj("El cliente no existe o contrasena invalida", 200, [], res);
            }
            else
            {
                const usu = {
                    idusuario: Buscarusuario.idusuario,
                    nombre_completo: Buscarusuario.nombre_completo,
                    nombre_usuario: Buscarusuario.nombre_usuario,
                    correo: Buscarusuario.correo,
                    telefono: Buscarusuario.telefono,
                    direccion_usuario: Buscarusuario.direccion_usuario
                };
                const token = passport.getToken({idusuario: Buscarusuario.idusuario});
                const data = {
                    token: token,
                    cliente: usu
                };
                msj("Bienvenido, " + usu.nombre_completo, 200, data, res);
            }
        }
    }
};

exports.incioSesionEmpleado = async (req, res, next)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty)
    {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res);
    }
    else{
        const {nombre_usuario, contrasena_encriptada} = req.body;
        const BuscarEmpleado = await ModeloEmpleado.findOne({
            where:{
                [Op.and]:[{
                    [Op.or]:
                    [
                        {nombre_usuario: nombre_usuario}                        
                    ],
                }],
            }
        });
        if(!BuscarEmpleado)
        {
            msj("El cliente no existe o se encuentra inactivo", 200,[], res);
        }
        else
        {
            if(!BuscarEmpleado.verificarContrasena(contrasena_encriptada, BuscarEmpleado.contrasena_encriptada))
            {
                msj("El cliente no existe o contrasena invalida", 200, [], res);
            }
            else
            {
                const emp = {
                    idempleado: BuscarEmpleado.idempleado,
                    nombre_completo: BuscarEmpleado.nombre_completo,
                    nombre_usuario: BuscarEmpleado.nombre_usuario,
                    correo: BuscarEmpleado.correo,
                    telefono: BuscarEmpleado.telefono,
                    direccion_usuario: BuscarEmpleado.direccion_usuario
                };
                const token = passport.getToken({idempleado: BuscarEmpleado.idempleado});
                const data = {
                    token: token,
                    cliente: emp
                };
                msj("Bienvenido, " + emp.nombre_completo, 200, data, res);
            }
        }
    }
};

exports.ValidarToken = async (req, res)=> {
    const { data }= req.body;
    //console.log(req);
    msj("Token invalido", 200, data, res);
};
exports.enviarToken = async (req, res)=> {
    const { data }= req.body;
    res.status(200).json(data);
};

exports.recuperarContrasena = async (req, res, next)=>
{   
    const validacion=validationResult(req);
    if (!validacion.isEmpty)
    {
        msj("Los datos ingresados no son validos", 200, validacion.array(), res);
    }
    else{
    const {correo} = req.body;
    var Buscarusuario = await ModeloUsuario.findOne({
        where:{
            correo:correo,
        }
    });
    const rcontrasena='123';
    if(Buscarusuario)
    {
        Buscarusuario.contrasena_encriptada=rcontrasena;
        await Buscarusuario.save();
        const data ={
            correo: Buscarusuario.correo,
            contrasena_encriptada: rcontrasena,
        }
        EnviarCorreo.recuperarContrasena(data);
        msj("El correo a sido enviado", 200, [], res);
    }else{
        msj("Los datos que ingreso son invalidos", 200, [], res);
    }
   }
};