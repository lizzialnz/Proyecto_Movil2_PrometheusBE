const { Router } = require('express');
const router = Router();
const controladorProducto = require('../../controllers/controladorProducto');
const controladorAutenticacion= require('../../controllers/autenticacion');
const {body, param} = require('express-validator');

router.get('/camisas', controladorProducto.listarCamisas);
router.get('/joggers', controladorProducto.listarJoggers);
router.get('/sneakers', controladorProducto.listarSneakers);
router.get('/accesorios', controladorProducto.listarAccesorios);

router.get('/listar2', controladorProducto.listarProducto2);

router.post('/guardar',
body('nombre_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
body('marca_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('idcategorias').isEmpty().withMessage('No se permiten campos vacios'),
controladorProducto.GuardarProducto);

router.put('/modificar',
param('idproductos').isEmpty().withMessage('No se permiten campos vacios')
.not().isInt().withMessage('El Id debe ser un numero entero'),
body('nombre_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
body('marca_producto').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('idcategorias').isEmpty().withMessage('No se permiten campos vacios'),
param('idtallas').isEmpty().withMessage('No se permiten campos vacios'),
controladorAutenticacion.validarAutenticado,controladorProducto.ModificarProducto);

router.put('/modificarCantidad', controladorProducto.ModificarCantidadProducto);

router.delete('/:idproductos', controladorProducto.EliminarProducto);

module.exports=router;

