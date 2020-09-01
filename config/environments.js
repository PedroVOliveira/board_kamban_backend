//@Author pEDRO

const url = process.env.SERVER_URL  || 'http://localhost:3002'
const userDB = process.env.DB_USER || 'root'
const passDB = process.env.DB_PASS || 'MySql2019!'
const hostDB = process.env.DB_HOST || 'localhost'
const portDB = process.env.DB_PORT || 3306
const databaseDB = process.env.DB_DATABASE || 'testedb'

export default {
  server: { 
    port: process.env.SERVER_PORT || 3002,
    url: url,
    throttling: process.env.SERVER_THROTTLING || true
  },
  db: {
    user: userDB,
    pass: passDB,
    host: hostDB,
    port: portDB,
    database: databaseDB,
  },
  files:{
    default: url+'/uploads/system/default.png',
    uploadsPath: './src/public/uploads/',
    uploadsUrl: url+'/uploads/'
  },
  security: {
    secret: process.env.API_SECRET || `teste`,
    saltRounds: process.env.SALT_ROUNDS || 10
  },
}
