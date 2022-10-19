var express = require('express');
var router = express.Router();
const datos = require('../controllers/datos');

/* GET users listing. */
router.get('/:type', async function(req, res, next) {
    console.log('cosas');
    if (req.params.type == 'cat') {
        const data = datos.obtenerModelos();
        res.send(data);
    }else{
        const data = datos.obtenerExtras();
        res.send(data);
    }
    
});

module.exports = router;
