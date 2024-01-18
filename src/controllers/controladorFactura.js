const Factura = require("../models/modeloFactura");
const { validationResult } = require("express-validator");
const moment = require("moment");
const msj = require("../componentes/mensaje");
const passport = require("../configs/passport");
const { Op } = require("sequelize");
const { normalizeUnits } = require("moment");
const mensaje = require("../componentes/mensaje");
exports.validarAutenticado = passport.validarAutenticado;

exports.ListarFactura = async (req, res) => {
  const factura = await Factura.findAll();
  res.json(factura);
};

exports.ListarFacturaReciente = async (req, res) => {
  const factura = await Factura.findOne({
      order: [["idfacturas", "DESC"]]
  });
  res.json(factura);
};

exports.buscarFactura = async (req, res) => {
  console.log(req.params);
  const { idfacturas } = req.params;
  var mensaje = "";
  const factura = await Factura.findByPk(idfacturas);
  console.log(factura);
  res.json(factura);
};

exports.GuardarFactura = async (req, res) => {
  const { idusuario } = req.body;
  console.log(req.body);
  if (idusuario) {
    await Factura.create({
      idusuario: idusuario,
    })
      .then((data) => {
        msj("Datos procesados correctamente", 200, data, res);
      })
      .catch((error) => {
        msj("Datos procesados incorrectamente", 200, error, res);
      });
  } else {
    const mensaje = {
      msj: "El producto ya existe",
    };
    msj("Datos procesados correctamente", 200, mensaje, res);
  }
};

exports.EliminarParamsFactura = async (req, res) => {
  const { idfacturas } = req.params;
  if (!idfacturas) {
    res.send("Debe enviar el id de la factura ");
  } else {
    const buscarFactura = await Factura.findOne({
      where: {
        idfacturas: idfacturas,
      },
    });
    if (!buscarFactura) {
      res.send("La factura no existe");
    } else {
      await Factura.destroy({
        where: {
          idfacturas: idfacturas,
        },
      })
        .then((data) => {
          console.log(data);
          res.send("El registro ha sido eliminado");
        })
        .catch((error) => {
          console.log(error);
          res.send(
            "El registro no fue eliminado, porque hay un error en el servidor"
          );
        });
    }
  }
};

exports.ModificarFactura = async (req, res) => {
  //const { id } = req.query;
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.array());
    msj("Los datos ingresados no son validos", 200, validacion.array(), res);
  } else {
    const { idfacturas } = req.query;
    const { fecha_factura, idusuario } = req.body;
    const buscarFactura = await Factura.findOne({
      where: {
        idfacturas: idfacturas,
      },
    });
    console.log(buscarFactura);
    if (!buscarFactura) {
      msj("Datos procesados incorrectamente", 200, [], res);
    } else {
      buscarFactura.fecha_factura = fecha_factura;
      buscarFactura.idusuario = idusuario;

      await buscarFactura
        .save()
        .then((data) => {
          console.log(data);
          msj("Datos procesados correctamente", 200, data, res);
        })
        .catch((error) => {
          console.log(error);
          msj("Error al actualizar el registro", 200, error, res);
        });
    }
  }
};
