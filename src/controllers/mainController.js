//@Author ismael alves
import useEntity from '../entity/userEntity';
import cardEntity from '../entity/cardEntity';
import tarefaEntity from '../entity/tarefaEntity';
import { knex } from '../../config/server';

module.exports = function(app){

	// rota inicial de apresentação
	app.get('/', (req, resp, next)=>{
		// knex.table('users').insert({
		// 	name:'PEDRO',
		// 	email:'pedrovoliveiracontato@gmail.com',
		// 	password:'12345'

		// })
		// useEntity.insert({
		// 	name:'PEDRO',
		// 	email:'admin3@gmail.com',
		// 	password:'12345'
		// }).then((rs)=> {
		// 	if(rs.length > 0){
				
		// 	}
		// })
		// cardEntity.insert({
		// 	titulo: "Card 01",
		// 	users_id: 1
		// }).then((rs)=>{
		// 	console.log(rs)
		// })
		
		knex.table('cards').join('users', 'users_id', 'users.id').then((rs)=>{
			console.log(rs)
		}).catch((e)=>{
			console.log(e)
		})
		resp.json('Board Kamban 0.1 Online');	
	})

	// retirar o favicon.ico por default
	app.get('/favicon.ico', (req, res) =>{
		res.status(204)
	})

}