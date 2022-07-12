const { response, request } = require('express');


const usersGet = (req = request, res= response) => {


    const {hola, asd, nombre = 'no name o NN'} = req.query;  /*los query params son los q estan despues del ? en el url*/

    res.json({
        msg: 'get API - controlador',
        hola,
        asd,
        nombre
    });
}

const usersPost = (req, res= response) => {

    const {nombre, edad} = req.body; /*le puedo pedir que me de esos datos solamente*/

    res.json({
        msg: 'Post API - controlador',
        nombre,
        edad
    });
}

const usersPut = (req, res= response) => {

    const { id } = req.params;       /*params viene configurado asi Put */

    res.json({
        msg: 'Put API - controlador',
        id
    });
}

const usersPatch = (req, res= response) => {
    res.json({
        msg: 'Patch API - controlador'
    });
}

const usersDelete = (req, res= response) => {
    res.json({
        msg: 'Delete API - controlador'
    });
}


module.exports= {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}