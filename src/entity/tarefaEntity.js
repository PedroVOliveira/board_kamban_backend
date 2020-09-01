import { knex } from '../../config/server';

knex.schema.hasTable('tarefas').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('tarefas',(table)=>{
      table.increments('id').primary();
      table.string('titulo').notNullable();
      table.boolean('estaAtivo').defaultTo(true);
      table.timestamp('dataEntrega').notNullable();
      table.integer('cards_id').unsigned().notNullable();
      table.foreign('cards_id').references('id').inTable('cards');
    });
  }
});

export default knex.table('cartarefasds');