var express = require('express');
var router = express.Router();
var verify = require('../controllers/jwtverify');
const connection = require('../controllers/conexion');
const bcryptjs = require('bcryptjs');


/* GET users listing. */

router.get('/', verify, function(req, res, next) {
  let sql = `SELECT (idUser, user, name, rol) FROM mulonchih.users;`;
  connection.query(sql,async (err, rows, fields) => {
    if (err) throw err
    res.send(rows);
  });
});


router.post('/',verify,async function(req,res,next) {
  const {user,psw,name,rol} = req.body;
  const salt = await bcryptjs.genSalt(10);
  const newpsw = await bcryptjs.hash(psw, salt);

  let sql = `INSERT INTO mulonchih.users ( user, name, password, rol) VALUES ('${user}','${name}','${newpsw}','${rol}');`;

  connection.query(sql,async (err, rows, fields) => {
    if (err) throw err
    res.send('insertado');
  })
})

router.get('/:id',verify,async function(req,res,next) {
    let sql = `SELECT idUser, user, name, rol FROM zyc.users WHERE idUser = ${req.params.id}; `
    connection.query(sql,async (err, rows, fields) => {
      if (err) throw err
      res.send(rows);
    });
});

router.patch('/',verify,async function(req,res,next) {
  const {user,psw,idUser,name} = req.body;
  let stringpsw = ``;
  if(psw){
    const salt = await bcryptjs.genSalt(10);
    const newpsw = await bcryptjs.hash(psw, salt);
    stringpsw = `, pasw = '${newpsw}'`
  }
  
  let sql = `UPDATE zyc.users SET user = '${user}', name = '${name}'${stringpsw} WHERE idUser = ${idUser};`
  connection.query(sql,async (err, rows, fields) => {
    if (err) throw err
    res.send('Actualizado');
  });
});

router.delete('/:id',verify,async function(req,res,next){
  const {id} = req.params;
  let sql = `DELETE FROM zyc.users WHERE idUser = ${id};`;

  connection.query(sql,async (err, rows, fields) => {
    if (err) throw err
    res.send('Eliminado');
  });
});
module.exports = router;
