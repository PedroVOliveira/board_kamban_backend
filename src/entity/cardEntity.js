import { knex } from '../../config/server';

knex.schema.hasTable('cards').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('cards',(table)=>{
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.integer('users_id').unsigned().notNullable();
      table.foreign('users_id').references('id').inTable('users');
    });
  }
});

export default knex.table('cards');


