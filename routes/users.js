// Rutas relacionadas a los usuarios
const {Router} = require('express');
const { validarCampos } = require('../middlewares/validar-campos');

const  {esRolValido, emailExiste, existeUsuarioPorId}  = require('../helpers/db-validators');
const { check } = require('express-validator');
const{  usersGet,
        usersPut,
        usersPost,
        usersPatch,
        usersDelete } = require('../controllers/users');

const router = Router();

router.get('/', usersGet);
  
router.put('/:id', [
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos,
], usersPut);

// usamos el paquete validar-campos
  
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'Coloque su password aqui con mas de 6 letras').isLength({min:6}),
    check('correo', 'Esto no es un correo valido amigo').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos,
] ,usersPost);

router.patch('/', usersPatch);
  
router.delete('/:id', [
    
    check('id', 'No es un ID Válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,

], usersDelete);

module.exports = router;