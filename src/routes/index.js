const { Router }= require('express');
const router = Router();
router.get('/',(req,res) =>{
   res.json({"Titulo":"Prometheus"});
});
module.exports = router;
