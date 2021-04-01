exports.up = function (knex) {
  return knex.schema.createTable('homework', function (table) {
    table.increments('id');
    table.string('name', 255).notNullable();
    table.text('content').notNullable();
    table.enu('type', ['lesson', 'lab']).notNullable();
    table.dateTime('due_date');
    table
      .integer('course_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('course')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('homework');
};
