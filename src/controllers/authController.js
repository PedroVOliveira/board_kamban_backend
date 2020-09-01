//@Author ismael alves
import env from '../../config/environments'
import authValidator from '../validators/authValidator'
import utils from '../utils/utils'
import verifyHandlerMiddleware from '../middlewares/verifiyHandlerMiddleware'
import { knex } from '../../config/server';

module.exports = function(app){

    //metodo que efetua login
    app.post('/login', 
        authValidator.loginValidator(),
        verifyHandlerMiddleware,
        (req, resp, next) => {
            const data = req.body
            console.log(data)
            knex.table('users').where({email: data.email}).then((rs)=>{
                if(rs.length > 0){
                    utils.compareCrypt(data.senha, rs[0].senha).then((compareSenha)=>{
                        if(compareSenha){
                            const token = utils.gerarToken(data.email)
                            resp.json({token: token, usuario: rs[0]})
                        }else{
                            next({name:'Unauthorized', mensagem: 'Usuario ou senha incorreta'})
                        }
                    })
                }else{
                    next({name:'Unauthorized', mensagem: 'Usuario ou senha incorreta'})  
                }
            }).catch(()=> next({name:'Unauthorized', mensagem: 'Usuario ou senha incorreta'}))
        }
    )
}