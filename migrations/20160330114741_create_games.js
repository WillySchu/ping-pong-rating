exports.up = function(knex, Promise) {
  return knex.schema.createTable('games', function(table) {
    table.increments();
    table.integer('winner').unsigned().index().references('id').inTable('players').onDelete('cascade');
    table.integer('loser').unsigned().index().references('id').inTable('players').onDelete('cascade');
    table.timestamp('date').defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('games');
};
