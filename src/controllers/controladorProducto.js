const Producto = require("../models/modeloProducto");
const Categoria = require("../models/modeloCategorias");
const { validationResult } = require("express-validator");
const moment = require("moment");
const msj = require("../componentes/mensaje");
const passport = require("../configs/passport");
const { Op, Sequelize } = require("sequelize");
const { normalizeUnits } = require("moment");
const mensaje = require("../componentes/mensaje");
exports.validarAutenticado = passport.validarAutenticado;

exports.listarProducto2 = async (req, res) => {
  const producto = await Producto.findAll();
  res.json(producto);
};

exports.listarCamisas = async (req, res) => {
  const camisas = await Producto.findAll({
    where: {
      idcategorias: 6,
    },
  });
  res.json(camisas);
};

exports.listarJoggers = async (req, res) => {
  const joggers = await Producto.findAll({
    where: {
      idcategorias: 7,
    },
  });
  res.json(joggers);
};

exports.listarSneakers = async (req, res) => {
  const sneakers = await Producto.findAll({
    where: {
      idcategorias: 8,
    },
  });
  res.json(sneakers);
};

exports.listarAccesorios = async (req, res) => {
  const accesorios = await Producto.findAll({
    where: {
      idcategorias: 9,
    },
  });
  res.json(accesorios);
};

exports.buscarProducto = async (req, res) => {
  console.log(req.params);
  const { idproductos } = req.params;
  var mensaje = "";
  const producto = await Producto.findByPk(idproductos);
  console.log(producto);
  res.json(producto);
};

exports.GuardarProducto = async (req, res) => {
  const {
    nombre_producto,
    cantidad_producto,
    precio_producto,
    marca_producto,
    idcategorias,
    costo,
  } = req.body;
  console.log(req.body);
  if (
    nombre_producto &&
    cantidad_producto &&
    precio_producto &&
    marca_producto &&
    idcategorias &&
    costo 
  ) {
    const buscarProducto = await Producto.findOne({
      where: {
        [Op.or]: {
          nombre_producto: nombre_producto,
        },
      },
    });
    console.log(buscarProducto);
    if (!buscarProducto) {
      await Producto.create({
        nombre_producto: nombre_producto,
        cantidad_producto: cantidad_producto,
        precio_producto: precio_producto,
        marca_producto: marca_producto,
        idcategorias: idcategorias,
        costo: costo,
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
  } else {
    msj(
      "Faltan algunos datos necesarios para el procesamiento de la petición",
      200,
      [],
      res
    );
  }
};

exports.EliminarProducto = async (req, res) => {
  const { idproductos } = req.params;
  if (!idproductos) {
    res.send("Debe enviar el id del producto ");
  } else {
    const buscarProductos = await Producto.findOne({
      where: {
        idproductos: idproductos,
      },
    });
    if (!buscarProductos) {
      res.send("El producto no existe");
    } else {
      await Producto.destroy({
        where: {
          idproductos: idproductos,
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

exports.ModificarProducto = async (req, res) => {
  const validacion = validationResult(req);
  if (!validacion.isEmpty()) {
    console.log(validacion.array());
    msj("Los datos ingresados no son validos", 200, validacion.array(), res);
  } else {
    const { idproductos } = req.query;
    const {
      nombre_producto,
      cantidad_producto,
      precio_producto,
      marca_producto,
      idcategorias,
      costo,
      imagen_producto,
    } = req.body;
    const buscarProducto = await Producto.findOne({
      where: {
        idproductos: idproductos,
      },
    });
    console.log(buscarProducto);
    if (!buscarProducto) {
      msj("Datos procesados incorrectamente", 200, [], res);
    } else {
      buscarProducto.nombre_producto = nombre_producto;
      buscarProducto.cantidad_producto = cantidad_producto;
      buscarProducto.precio_producto = precio_producto;
      buscarProducto.marca_producto = marca_producto;
      buscarProducto.idcategorias = idcategorias;
      buscarProducto.costo = costo;
      buscarProducto.imagen_producto = imagen_producto;
      await buscarProducto
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

exports.ModificarCantidadProducto = async (req, res) => {
  const { idproductos } = req.query;
  const { cantidad_producto } = req.body;

  if (!idproductos) {
    res.send("Debe enviar el id del producto");
  } else {
    var buscarProducto = await Producto.findOne({
      where: {
        idproductos: idproductos,
      },
    });
    if (!buscarProducto) {
      res.send("El producto no existe");
    } else {
      if (!cantidad_producto) {
        res.send("Debe enviar los datos completos");
      } else {
        buscarProducto.cantidad_producto = cantidad_producto;
        await buscarProducto.save();
        console.log(buscarProducto);
        res.send("Registro actualizado");
      }
    }
  }
};
