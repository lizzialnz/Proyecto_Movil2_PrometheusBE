const{Router} = require('express');
const router = Router();
const controladorUsuario = require('../../controllers/controladorUsuario');
const controladorAutenticacion= require('../../controllers/autenticacion');
const {body, param} = require('express-validator');

router.put('/',controladorUsuario.ActualizarLog);
router.delete('/:nombre_usuario',controladorUsuario.EliminarUsuarioLog);
router.get('/listar1',controladorUsuario.listar1);
router.get('/',controladorAutenticacion.validarAutenticado ,controladorUsuario.listarUsuarios);

router.post('/',
body('nombre_completo').isLength({min:5}).withMessage("El nombre no debe ser menor a 5 caracteres"),
body('nombre_usuario').isLength({min:5}).withMessage("El nombre de usuario no debe ser menor a 5 caracteres"),
body('correo').isEmail().withMessage("Debe de tener un formato de correo electronico apropiado"),
body('telefono').isLength({min:8}).withMessage("El telefono no debe ser menor a 8 caracteres"),
body('contrasena_encriptada').isLength({min:6}).withMessage("La longitud minima del nombre es de 6"),
body('direccion_usuario').isLength({min:10}).withMessage("La direccion del usuario no debe ser menor a 10 caracteres"),
controladorUsuario.Guardar);

router.delete('/:idusuario',controladorAutenticacion.validarAutenticado,controladorUsuario.EliminarParamsUsuario);

router.put('/',
param('idcategorias').isEmpty().withMessage('El ID no puede ir vacio').not().isInt().withMessage('El ID debe ser un numero entero'),
body('nombre_usuario').isLength({min:5}).withMessage("El nombre de usuario no debe ser menor a 5 caracteres"),
body('correo').isEmail().withMessage("Debe de tener un formato de correo electronico apropiado"),
body('telefono').isLength({min:8}).withMessage("El telefono no debe ser menor a 8 caracteres"),
body('contrasena_encriptada').isLength({min:6}).withMessage("La longitud minima del nombre es de 6"),
body('direccion_usuario').isLength({min:10}).withMessage("La direccion del usuario no debe ser menor a 10 caracteres"),
controladorAutenticacion.validarAutenticado,controladorUsuario.ActualizarQuery);
module.exports = router;