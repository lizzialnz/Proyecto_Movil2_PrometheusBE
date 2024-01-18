const{Router} = require('express');
const router = Router();
const controladorEmpleado = require('../../controllers/controladorEmpleado');
const controladorAutenticacion= require('../../controllers/autenticacion');
const {body, param} = require('express-validator');

router.get('/',controladorAutenticacion.validarAutenticado, controladorEmpleado.listarEmpleados);

router.post('/',
body('nombre_completo').isLength({min:5}).withMessage("El nombre no debe ser menor a 5 caracteres"),
body('nombre_usuario').isLength({min:5}).withMessage("El nombre de usuario no debe ser menor a 5 caracteres"),
body('correo').isEmail().withMessage("Debe de tener un formato de correo electronico apropiado"),
body('telefono').isLength({min:8}).withMessage("El telefono no debe ser menor a 8 caracteres"),
body('contrasena_encriptada').isLength({min:6}).withMessage("La longitud minima de la contraseña es de 6"),
body('direccion_usuario').isLength({min:10}).withMessage("La direccion del usuario no debe ser menor a 10 caracteres"),
controladorEmpleado.Guardar);

router.delete('/:idempleado',controladorAutenticacion.validarAutenticado, controladorEmpleado.EliminarParamsEmpleado);

router.put('/',
param('idcategorias').isEmpty().withMessage('El ID no puede ir vacio').not().isInt().withMessage('El ID debe ser un numero entero'),
body('nombre_usuario').isLength({min:5}).withMessage("El nombre de usuario no debe ser menor a 5 caracteres"),
body('correo').isEmail().withMessage("Debe de tener un formato de correo electronico apropiado"),
body('telefono').isLength({min:8}).withMessage("El telefono no debe ser menor a 8 caracteres"),
body('contrasena_encriptada').isLength({min:6}).withMessage("La longitud minima de la contraseña es de 6"),
body('direccion_usuario').isLength({min:10}).withMessage("La direccion del usuario no debe ser menor a 10 caracteres"),
controladorAutenticacion.validarAutenticado,controladorEmpleado.ActualizarQuery);
module.exports = router;