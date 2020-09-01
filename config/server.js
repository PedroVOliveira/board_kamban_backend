//@Author ismael alves
import express from 'express'
import bodyParser from 'body-parser'
import Knex from 'knex';
import assignResquestMiddleware from '../src/middlewares/assignResquestMiddleware';
import fs from 'fs'
import cors from 'cors'

import handlerErroMiddleware from '../src/middlewares/handlerErroMiddleware'
import env from './environments'
import http from 'http'
import path from 'path'

//instancia
const app = express()
const server = http.createServer(app)
const knex = Knex({
    client:'mysql',
    connection:{
        host:env.db.host,
        user:env.db.user,
        password:env.db.pass,
        database:env.db.database,
        port:env.db.port
    },
    migrations: {
        directory:'./src/entity'
    },
    useNullAsDefault:true,
});
knex.on('query',(query)=>{
    console.log(query);
})

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())

// app.use(assignResquestMiddleware)

//create folders default

//assets
app.use(express.static('./src/public'))

//auto import
fs.readdirSync('./src/controllers/').forEach((file)=>{
    require(path.join(__dirname, '..', 'src/controllers', file ))(app)
})

// NotFound router
app.get('*', (req, resp)=>{
    resp.status(404).json([{nome:"NotFound", mensagem:"rota não foi encontrada :("}])
})    

// start application
function startup(port){
    return new Promise(async (resolve, reject)=>{
        env.server.port = port != null ? port : env.server.port
        server.listen(env.server.port,()=>{
            // app.use(handlerErroMiddleware);
            resolve({
                url:env.server.url,
                server:server
            })
            console.log('servidor online: ',env.server.port);
        })
    })
}

// stop application
async function shutdown(){
    return server.close()
}

export { startup, shutdown, app, knex } // exporta somente o necessário