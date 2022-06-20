var express = require('express');
var router = express.Router();
var novedadesModel = require('../../models/novedadesModel');
var util = require('util');
var cloudinary = require('cloudinary').v2;

var uploader = util.promisify(cloudinary.uploader.upload);
const destroy = util.promisify(cloudinary.uploader.destroy);


/* GET home page. */
router.get('/', async function (req, res, next) {



    var novedades = await novedadesModel.getnovedades();

    novedades = novedades.map(novedad => {
        if (novedad.img_id) {
            const imagen = cloudinary.image(novedad.img_id, {
                width: 80,
                height: 80,
                crop: 'fill'
            });
            return {
                ...novedad,
                imagen
            }
        } else {
            return {
                ...novedad,
                imagen: ''
            }        
        }
    });
    
    res.render('admin/novedades', {
        layout: 'layout',
        usuario: req.session.nombre,
        novedades
    });
});


router.get('/eliminar/:id', async (req, res, next) => {
    var id = req.params.id;

    let novedad = await novedadesModel.getNovedadById(id);
    if (novedad.img_id) {
        await (destroy(novedad.img_id));
    }

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

        var img_id = '';
        if (req.files && Object.keys(req.files).length > 0) {
            imagen = req.files.imagen;
            img_id = (await uploader(imagen.tempFilePath)).
            public_id;
        }


        if (req.body.titulo != "" && req.body.fuente != "" && req.body.noticia != "") {
            await novedadesModel.insertNovedad({
            ...req.body,
            img_id
        });
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

        let img_id = req.body.img_original;
        let borrar_img_vieja = false;
        if (req.body.img_delete === "1") {
            img_id = null;
            borrar_img_vieja = true;
        } else {
            if (req.files && Object.keys(req.files).length > 0) {
                imagen = req.files.imagen;
                img_id = (await uploader(imagen.tempFilePath)).public_id;
                borrar_img_vieja = true;
            }
        }
        if (borrar_img_vieja && req.body.img_original) {
            await (destroy(req.body.img_original));
        }

        var obj = {
            titulo: req.body.titulo,
            fuente: req.body.fuente,
            noticia: req.body.noticia,
            img_id

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