const{Router} = require('express');
const router = Router();
const controladorCategoria = require('../../controllers/controladorCategoria');
const controladorAutenticacion= require('../../controllers/autenticacion');
const {body, param} = require('express-validator');

router.get('/',controladorAutenticacion.validarAutenticado, controladorCategoria.ListarCategoria);

router.post('/',
body('descripcion').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
controladorAutenticacion.validarAutenticado, controladorCategoria.GuardarCategoria);

router.delete('/:idcategorias',controladorAutenticacion.validarAutenticado, controladorCategoria.EliminarParamsCategoria);

router.put('/',
param('idcategorias').isEmpty().withMessage('El ID no puede ir vacio').not().isInt().withMessage('El ID debe ser un numero entero'),
body('descripcion').isLength({min:3}).withMessage('La longitud minima del nombre es de 3 caracteres')
,controladorAutenticacion.validarAutenticado, controladorCategoria.ModificarCategoria);
module.exports = router;