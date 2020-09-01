//@Author ismael alves
import usuarioValidator from '../validators/usuarioValidator'
import verifyHandlerMiddleware from '../middlewares/verifiyHandlerMiddleware'
import userEntity from '../entity/userEntity';
import utils from '../utils/utils'
import { knex } from '../../config/server'

module.exports = function(app){

    //metodo que cadastra os usuários
    app.post('/usuario',
        usuarioValidator.usuarioCadastro(),
        verifyHandlerMiddleware,
        async (req, resp, next)=>{
            let body = req.body
            body.senha = await utils.encrypt(body.senha)
            userEntity.insert(body).then((rs)=>{
                knex.table('users').where('id', rs[0]).then((data)=>{
                    resp.json(data[0])
                })
            }).catch(next)
        }
    )
}