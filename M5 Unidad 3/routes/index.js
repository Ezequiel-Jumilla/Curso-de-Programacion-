var express = require('express');
const res = require('express/lib/response');
const async = require('hbs/lib/async');
var router = express.Router();
var nodemailer = require('nodemailer');
var novedadesModel = require('../models/novedadesModel');
var cloudinary = require('cloudinary').v2;


/* GET home page. */
router.get('/', async function (req, res, next) {

  var novedades = await novedadesModel.getnovedades();

  novedades = novedades.splice(0, 6);

  novedades = novedades.map(novedad => {
    if (novedad.img_id) {
        const imagen = cloudinary.url(novedad.img_id, {
            width: 460,
            crop: 'fill'
        });
        return {
            ...novedad,
            imagen
        }
    } else {
        return {
            ...novedad,
            imagen: '/images/sinimagen2.jpg',
        }        
    }
});

  res.render('index', { novedades });
});


router.post('/', async (req, res, next) => {

  var email = req.body.email;
  var nombre = req.body.nombre;
  var consulta = req.body.consulta;



  var obj = {
    to: 'ezequieljumilla328@gmail.com',
    subject: 'CONTACTO WEB KOI',
    html: nombre + " " + "Se contactó a través de el formulario de consulta de la web de KOI, esperando mas información en el siguiente mail : " + email + ". <br> Además, realizó la siguiente consulta: " + consulta
  }

  var transport = nodemailer.createTransport({
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
