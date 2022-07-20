const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { findByIdAndUpdate } = require('../models/usuario');


const usersGet = async (req = request, res= response) => {

    // const {hola, asd, nombre = 'no name o NN'} = req.query;  /*los query params son los q estan despues del ? en el url*/

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    // const usuarios = await Usuario.find(query)
    //     .skip(desde)
    //     .limit(limite);

    // const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
                 .skip(desde)
                 .limit(limite)
    ])

    res.json({
        // resp
        total,
       usuarios,
    });
}

const usersPost = async (req, res= response) => {
 
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();     /*ver documentacion de bcrypt.js*/
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en DB

    await usuario.save();

    res.json({
        usuario
    });
}

const usersPut = async (req, res= response) => {

    const { id } = req.params;       /*params viene configurado asi Put */
    const { _id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if (password){   
        // Encriptar la contraseña
            const salt = bcryptjs.genSaltSync();     /*ver documentacion de bcrypt.js*/
            resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto, {new: true})

    res.json({
        // msg: 'Put API - controlador',
        // id,
        usuario
    });
}

const usersPatch = (req, res= response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}

const usersDelete = async (req, res= response) => {

    const {id} = req.params;
    // fisicamente lo borramos
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

module.exports= {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}