exports.up = function (knex) {
  return knex.schema.createTable('course', function (table) {
    table.increments('id');
    table.string('code', 20).notNullable().unique();
    table.string('name', 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('course');
};
