const{Router} = require('express');
const router = Router();
const controladorTarjeta = require('../../controllers/controladorTarjeta');
const controladorAutenticacion= require('../../controllers/autenticacion');
const {body, param} = require('express-validator');

router.get('/',controladorAutenticacion.validarAutenticado, controladorTarjeta.ListarTarjeta);

router.post('/',
body('num_tarjeta').isLength({min:16}).withMessage('La longitud minima de la categoria es de 16 caracteres'),
body('VIN').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('tipo_tarjeta').isEmpty().withMessage('No se permiten campos vacios'),
param('idusuario').isEmpty().withMessage('No se permiten campos vacios'),
controladorAutenticacion.validarAutenticado, controladorTarjeta.GuardarTarjeta);

router.delete('/:idtarjetas',controladorAutenticacion.validarAutenticado, controladorTarjeta.EliminarParamsTarjeta);

router.put('/',
param('idtarjetas').isEmpty().withMessage('No se permiten campos vacios')
.not().isInt().withMessage('El Id debe ser un numero entero'),
body('num_tarjeta').isLength({min:16}).withMessage('La longitud minima de la categoria es de 16 caracteres'),
body('VIN').isLength({min:3}).withMessage('La longitud minima de la categoria es de 3 caracteres'),
param('tipo_tarjeta').isEmpty().withMessage('No se permiten campos vacios'),
param('idusuario').isEmpty().withMessage('No se permiten campos vacios'),
controladorAutenticacion.validarAutenticado, controladorTarjeta.ActualizarTarjeta);
module.exports = router;