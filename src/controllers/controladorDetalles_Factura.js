const Detalles_Factura = require('../models/modeloDetalles_Factura');
const {validationResult} = require('express-validator');
const moment =require('moment');
const msj = require('../componentes/mensaje');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
const { normalizeUnits } = require('moment');
const mensaje = require('../componentes/mensaje');
exports.validarAutenticado = passport.validarAutenticado;

exports.listardetalle = async (req, res) => { 
    const {idusuario} = req.query;
    const detalle = await Detalles_Factura.findAll({
        where: {
            idfacturas: null,
            idusuario:idusuario
          },
        });
    res.json(detalle);
  };

exports.listarDetalle_Factura = async (req, res) => {
    try
    {
        const detalles = await Detalles_Factura.findAll();
        msj("Peticion procesada correctamente", 200, detalles, res);
    }
    catch{
        msj("Ocurrio un error en el servidor", 500, [], res);
    }
};

exports.buscarDetalle_Factura = async(req,res) => {
    console.log(req.params);
    const {iddetalles_Factura}=req.params;
    var mensaje ="";
    const detalles = await Detalles_Factura.findByPk(iddetalles_Factura);
    console.log(detalles);
    res.json(detalles);
}

exports.GuardarDetalles_Factura = async (req, res)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log( req.body + validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {   
        const { cantidad , subtotal, impuesto, total, idproductos, nombre_producto , idusuario, nombre_usuario} = req.body;
        console.log(req.body);
        if( cantidad && subtotal && impuesto && total  && idproductos && nombre_producto && idusuario && nombre_usuario)
        {
            const nuevodetalle = await Detalles_Factura.create({
                    cantidad: cantidad,
                    subtotal: subtotal,
                    impuesto: impuesto,
                    total: total,
                    idproductos:idproductos,
                    nombre_producto:nombre_producto,
                    idusuario:idusuario,
                    nombre_usuario:nombre_usuario

                }).then((data)=>{
                   msj("Datos procesados correctamente", 200, data, res);
                }).catch((error)=>{
                    msj("Datos procesados incorrectamente", 200, error, res);
                });
        }
        else
        {
            msj("Faltan algunos datos necesarios para el procesamiento de la petición", 200, [], res);
        }
    }
};

exports.EliminarDetalles_Factura = async (req, res) => {
    const { iddetalles_Factura  } =  req.params;
    if(!iddetalles_Factura )
    {
        res.send("Debe enviar el id del detalle ")
    }
    else{
         const buscarDetalle = await Detalles_Factura.findOne({
            where:{
                iddetalles_Factura : iddetalles_Factura ,
            } 
         });
         if(!buscarDetalle){
             res.send("El detalle no existe");
         }
         else{
             await Detalles_Factura.destroy({
                where:{
                    iddetalles_Factura :iddetalles_Factura ,
                }
             }).then((data) => {
                 console.log(data);
                 res.send("El registro ha sido eliminado");
             }).catch((error)=>{
                 console.log(error);
                 res.send("El registro no fue eliminado, porque hay un error en el servidor")
             });
         }
    }
};

exports.listardetalle = async (req, res) => { 
    const {idusuario} = req.query;
    const detalle = await Detalles_Factura.findAll({
        where: {
            idfacturas: null,
            idusuario:idusuario
          },
        });
    res.json(detalle);
  };


exports.ModificarDetalles_Factura = async (req, res)=> {
    const validacion=validationResult(req);
    var SEVAN;
    do{
    if (!validacion.isEmpty())
    {
        console.log(validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { idusuario } = req.query;
        const { idfacturas} = req.body;
        var buscarDetalle =await Detalles_Factura.findOne({
            where:{
                idfacturas: null,
                idusuario: idusuario
            }
        });
        console.log(buscarDetalle);
        SEVAN=buscarDetalle;
        if(!buscarDetalle){
            msj("Datos procesados incorrectamente", 200, [], res);
        } 
        else{
                buscarDetalle.idfacturas = idfacturas;
                await buscarDetalle.save();  
                console.log(buscarDetalle);  
                res.send("Registro Actualizado") 
             }

    }
}while(buscarDetalle !="");
};

