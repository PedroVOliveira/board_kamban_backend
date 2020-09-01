//@Author ismael alves
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'
import env from '../../config/environments'


class Utils{

    //metodo que gera o token do usuario
    gerarToken(valor) {
        return jsonwebtoken.sign({valor: valor}, env.security.secret, {
            expiresIn: '1h',
        })
    }

    //metodo que gera o token do usuario
    decryptToken(valor) {
        return jsonwebtoken.verify(valor, env.security.secret)
    }

    //metodo que critografar valores
    encrypt(valor) {
        return bcrypt.hash(valor, env.security.saltRounds)
    }

    //metodo que compara o hash
    compareCrypt(data, encrypted){
        return bcrypt.compare(data, encrypted)
    }

}

export default new Utils()