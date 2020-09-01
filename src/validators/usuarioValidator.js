//@Author ismael alves
import { checkSchema } from 'express-validator'
import { knex } from '../../config/server'

class UsuarioValidator{

    usuarioCadastro(){
        return checkSchema({
            nome:{
                in: 'body',
                notEmpty: {
                    errorMessage: "nome e requirido"
                }
            },
            email:{
                in: 'body',
                notEmpty: {
                    errorMessage: "email e requirido"
                },
                isEmail:{
                    errorMessage: "necessina ser um email válido"
                },
                custom:{
                    options: async (value, {req, location, path}) =>{
                        const usuario = await knex.table('users').where({email: value})
                        if(usuario.length > 0){
                            return Promise.reject("email já está cadastrado no sistema")
                        }
                        return 'okay'
                    }
                }
            },
            senha: {
                in: 'body',
                notEmpty: {
                    errorMessage: "senha e requirido"
                },
                isLength: {
                    errorMessage: 'Senha deve conter no minimo 6 caracteres',
                    options:{
                        min: 6
                    }
                }
            }
        })
    }

}

export default new UsuarioValidator()