const{Router} = require('express');
const router = Router();
const controladorFactura = require('../../controllers/controladorFactura');
const controladorAutenticacion= require('../../controllers/autenticacion');

router.get('/', controladorFactura.ListarFactura);
router.get('/facturaReciente', controladorFactura.ListarFacturaReciente);
router.post('/', controladorFactura.GuardarFactura);
router.delete('/:idfacturas',controladorAutenticacion.validarAutenticado, controladorFactura.EliminarParamsFactura);
router.put('/',controladorAutenticacion.validarAutenticado, controladorFactura.ModificarFactura);
module.exports = router;