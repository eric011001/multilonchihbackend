var express = require('express');
var router = express.Router();
const evaluador = require('../public/javascripts/evaluador')
/* GET users listing. */
router.get('/', async function(req, res, next) {
  const cotizacion = req.body;
  let resultado = await evaluador.calcularPrecio(cotizacion);

  res.send(resultado)
});

module.exports = router;
