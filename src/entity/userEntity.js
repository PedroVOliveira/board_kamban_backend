import { knex } from '../../config/server';

knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('users',(table)=>{
      table.increments('id').primary();
      table.string('name').notNullable();
      table.string('email').unique();
      table.string('senha').notNullable();
    });
  }
});

export default knex.table('users');