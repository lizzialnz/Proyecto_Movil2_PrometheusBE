const Tarjeta = require('../models/modeloTarjeta');
const {validationResult} = require('express-validator');
const moment =require('moment');
const msj = require('../componentes/mensaje');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
const { normalizeUnits } = require('moment');
const mensaje = require('../componentes/mensaje');
exports.validarAutenticado = passport.validarAutenticado;

exports.ListarTarjeta = async (req, res) => {
    try
    {
        const tarjeta = await Tarjeta.findAll();
        msj("Peticion procesada correctamente", 200, tarjeta, res);
    }
    catch{
        msj("Ocurrio un error en el servidor", 500, [], res);
    }
};

exports.buscarTarjeta = async(req,res) => {
    console.log(req.params);
    const {idtarjetas}=req.params;
    var mensaje ="";
    const tarjeta = await Factura.findByPk(idtarjetas);
    console.log(tarjeta);
    res.json(tarjeta);
}

exports.GuardarTarjeta = async (req, res)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log( req.body + validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const {num_tarjeta, fecha_vencimiento, VIN, tipo_tarjeta, idusuario} = req.body;
        console.log(req.body);
        if(num_tarjeta && fecha_vencimiento && VIN && tipo_tarjeta && idusuario)
        {
            const buscarTarjeta = await Tarjeta.findOne({
                where:{
                    [Op.or]:{
                        num_tarjeta: num_tarjeta
                    }
                }
            });
            console.log(buscarTarjeta);
            if(!buscarTarjeta){
                await Tarjeta.create({
                num_tarjeta: num_tarjeta,
                fecha_vencimiento: fecha_vencimiento,
                VIN: VIN,
                tipo_tarjeta: tipo_tarjeta,
                idusuario: idusuario
                }).then((data)=>{
                   msj("Datos procesados correctamente", 200, data, res);
                }).catch((error)=>{
                    msj("Datos procesados correctamente", 200, error, res);
                });
            }
            else{
                const mensaje={
                    msj:"El producto ya existe",
                };
                msj("Datos procesados correctamente", 200, mensaje, res);
            }
        }
        else
        {
            msj("Faltan algunos datos necesarios para el procesamiento de la petición", 200, [], res);
        }
    }
};

exports.EliminarParamsTarjeta = async (req, res) => {
    const { idtarjetas } =  req.params;
    if(!idtarjetas)
    {
        res.send("Debe enviar el id de la tarjeta ")
    }
    else{
         const buscarTarjeta = await Tarjeta.findOne({
            where:{
                idtarjetas: idtarjetas,
            } 
         });
         if(!buscarTarjeta){
             res.send("La tarjeta no existe");
         }
         else{
             await Tarjeta.destroy({
                where:{
                    idtarjetas:idtarjetas,
                }
             }).then((data) => {
                 console.log(data);
                 res.send("El registro ha sido eliminado");
             }).catch((error)=>{
                 console.log(error);
                 res.send("El registro no fue eliminado, porque hay un error en el servidor");
             });
         }
    }
};

exports.ActualizarTarjeta = async (req, res)=> {
    //const { id } = req.query;
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log(validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { idtarjetas } = req.query;
        const { num_tarjeta, fecha_vencimiento, VIN, tipo_tarjeta, idusuario} = req.body;
        const buscarTarjeta =await Tarjeta.findOne({
            where:{
                idtarjetas: idtarjetas
            }
        });
        console.log(this.buscarTarjeta);
        if(!this.buscarTarjeta){
            msj("Datos procesados incorrectamente", 200, [], res);
        }
        else{
            buscarTarjeta.num_tarjeta=num_tarjeta;
            buscarTarjeta.fecha_vencimiento=fecha_vencimiento;
            buscarTarjeta.VIN=VIN;
            buscarTarjeta.tipo_tarjeta=tipo_tarjeta;
            buscarTarjeta.idusuario=idusuario;
    
                await buscarTarjeta.save().then((data)=>{
                    console.log(data);
                    msj("Datos procesados correctamente", 200, data, res);
                })
                .catch((error)=>
                {
                    console.log(error);
                    msj("Error al actualizar el registro",200, error, res);
                });
            
        }
    }
};
