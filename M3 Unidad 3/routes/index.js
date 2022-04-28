var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.post('/', async(req, res, next) =>{

var email = req.body.email;
var nombre = req.body.nombre;
var consulta = req.body.consulta;



var obj = {
  to: 'ezequieljumilla328@gmail.com',
  subject: 'CONTACTO WEB KOI',
  html: nombre + " " + "Se contacto a traves de el formulario de consulta de la web de KOI, esperando mas informacion en el siguiente mail : " + email + ". <br> Además, realizó la siguiente consulta: " + consulta 
}

var transport =nodemailer.createTransport({
host: process.env.SMTP_HOST,
port: process.env.SMTP_PORT,
auth: {
  user: process.env.SMTP_USER,
  pass: process.env.SMTP_PASS
}
});


var info = await transport.sendMail(obj);

res.render('index', {
  message: 'Mensaje enviado correctamente'
});
});



module.exports = router;
