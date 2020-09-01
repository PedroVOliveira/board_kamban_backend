//@Author ismael alves
import env from '../../config/environments'
import jsonwebtoken from 'jsonwebtoken'
import { knex } from '../../config/server'

export default function authorize(){
    return (req, resp, next)=>{  
        if(req.headers.authorization !== undefined){
            const token = req.headers.authorization
            try {
                const decode = jsonwebtoken.decode(token, env.security.secret)
                if(Date.now() >= decode.exp * 1000){next({name:'Forbidden', mensagem: 'Token está expirado'})}
                knex.table('users').where({email: decode.valor}).then((rs)=>{
                    if(rs.length > 0){
                        next()
                    }else{
                        next({name:'Unauthorized'})
                    }
                }).catch(next)
            } catch (error) {
                next({name:'Forbidden', mensagem: 'Token inválido ou incorreto'})
            }  
        }else{
            next({name:'Forbidden', mensagem: 'Token não encontrado'})
        }
    }
}