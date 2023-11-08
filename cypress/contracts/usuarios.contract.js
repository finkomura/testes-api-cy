const Joi = require ('joi')

const usuariosSchema = Joi.object({
    quantidade: Joi.number(),
    usuarios: Joi.array().items({
        administrador: Joi.string(),
        nome: Joi.string(),
        email: Joi.string(),
        password: Joi.string(),
        _id: Joi.string()
    })
})
export default usuariosSchema;