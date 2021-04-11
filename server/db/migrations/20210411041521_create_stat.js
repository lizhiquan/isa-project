exports.up = function (knex) {
  return knex.schema.createTable('stat', function (table) {
    table.increments('id');
    table.string('method', 10).notNullable();
    table.string('endpoint', 255).notNullable();
    table.integer('count').unsigned().notNullable().defaultTo(1);
    table.unique(['method', 'endpoint']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('stat');
};
