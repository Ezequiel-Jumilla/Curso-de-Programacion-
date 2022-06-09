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


router.get('/agregar', (req, res, next) => {
    res.render('admin/agregar', {
        layou: 'admin/layout'
    })
});


router.post('/agregar', async (req, res, next) => {
    try {
        if (req.body.titulo != "" && req.body.fuente != "" && req.body.noticia != "") {
            await novedadesModel.insertNovedad(req.body);
            res.redirect('/admin/novedades')
        } else {
            res.render('admin/agregar', {
                layout: 'layout',
                error: true,
                message: 'Todo los campos son requeridos'
            })
        }
    } catch (error) {
        console.log(error)
        res.render('admin/agregar', {
            layout: 'layout',
            error: true,
            message: 'No se pudo cargar la novedad'
        })
    }
})


router.get('/editar/:id', async (req, res, next) => {
    var id = req.params.id;
    var novedad = await novedadesModel.getNovedadById(id);
    res.render('admin/editar', {
        layout: 'layout',
        novedad 
    });
});



router.post('/editar', async (req, res , next) => {
    try {
        var obj = {
            titulo: req.body.titulo,
            fuente: req.body.fuente,
            noticia: req.body.noticia
        }

        console.log(obj)
        await novedadesModel.editarNovedadById(obj, req.body.id);
        res.redirect('/admin/novedades');
    } catch (error) {
        console.log(error)
        res.render('admin/editar', {
            layout: 'layout',
            error: true,
            message: 'No se guardaron los cambios' 
        })
    }
});


module.exports = router;