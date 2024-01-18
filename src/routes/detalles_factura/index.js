const { Router } = require('express');
const router = Router();
const controladorDetalles_Factura = require('../../controllers/controladorDetalles_Factura');
const controladorAutenticacion= require('../../controllers/autenticacion');

router.get('/listar2',controladorDetalles_Factura.listardetalle);
router.get('/listar',controladorDetalles_Factura.listarDetalle_Factura);
router.post('/guardar',controladorDetalles_Factura.GuardarDetalles_Factura);
router.delete('/:iddetalles_Factura', controladorDetalles_Factura.EliminarDetalles_Factura);
router.put('/modificar', controladorDetalles_Factura.ModificarDetalles_Factura);
module.exports = router;