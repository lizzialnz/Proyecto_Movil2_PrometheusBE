const Categorias = require('../models/modeloCategorias');
const {validationResult} = require('express-validator');
const moment =require('moment');
const msj = require('../componentes/mensaje');
const passport = require('../configs/passport');
const { Op } = require("sequelize");
const { normalizeUnits } = require('moment');
const mensaje = require('../componentes/mensaje');
exports.validarAutenticado = passport.validarAutenticado;

exports.ListarCategoria = async (req, res) => {
    try
    {
        const categorias = await Categorias.findAll();
        msj("Peticion procesada correctamente", 200, categorias, res);
    }
    catch{
        msj("Ocurrio un error en el servidor", 500, [], res);
    }
};

exports.buscarCategoria = async(req,res) => {
    console.log(req.params);
    const {idcategorias}=req.params;
    var mensaje ="";
    const categorias = await Categorias.findByPk(idcategorias);
    console.log(categorias);
    res.json(categorias);
}

exports.GuardarCategoria = async (req, res)=> {
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log( req.body + validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const {descripcion} = req.body;
        console.log(req.body);
        if(descripcion)
        {
            const buscarCategoria = await Categorias.findOne({
                where:{
                    [Op.or]:{
                        descripcion: descripcion
                    }
                }
            });
            console.log(buscarCategoria);
            if(!buscarCategoria){
                await Categorias.create({
                descripcion: descripcion,
                }).then((data)=>{
                   msj("Datos procesados correctamente", 200, data, res);
                }).catch((error)=>{
                    msj("Datos procesados correctamente", 200, error, res);
                });
            }
            else{
                const mensaje={
                    msj:"La categoria ya existe",
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


exports.EliminarParamsCategoria = async (req, res) => {
    const { idcategorias } =  req.params;
    if(!idcategorias)
    {
        res.send("Debe enviar el id de la factura ")
    }
    else{
         const buscarCategoria = await Categorias.findOne({
            where:{
                idcategorias: idcategorias,
            } 
         });
         if(!buscarCategoria){
             res.send("La factura no existe");
         }
         else{
             await Categorias.destroy({
                where:{
                    idcategorias:idcategorias,
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


exports.ModificarCategoria = async (req, res)=> {
    //const { id } = req.query;
    const validacion=validationResult(req);
    if (!validacion.isEmpty())
    {
        console.log(validacion.array());
        msj("Los datos ingresados no son validos", 200, validacion.array(),res);
    }
    else
    {
        const { idcategorias } = req.query;
        const { descripcion} = req.body;
        const buscarCategoria =await Categorias.findOne({
            where:{
                idcategorias: idcategorias
            }
        });
        console.log(buscarCategoria);
        if(!buscarCategoria){
            msj("Datos procesados incorrectamente", 200, [], res);
        }
        else{
            buscarCategoria.descripcion=descripcion;
    
                await buscarCategoria.save().then((data)=>{
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

