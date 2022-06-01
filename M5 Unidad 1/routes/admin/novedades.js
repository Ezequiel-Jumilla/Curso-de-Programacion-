var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');


/* GET home page. */
router.get('/', async function (req, res, next) {

    var novedades = await novedadesModel.getnovedades();
    
    res.render('admin/novedades', {
        layout: 'layout',
        usuario: req.session.nombre,
        novedades
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;
    await novedadesModel.deleteNovedadesById(id);
    res.redirect('/admin/novedades')
});

module.exports = router;