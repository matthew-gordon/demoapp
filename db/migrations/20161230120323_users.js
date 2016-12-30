'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (users) => {
    users.increments();
    users.text('name').unique().notNullable();
    users.text('email').unique().notNullable();
    users.text('bio').notNullable();
    users.boolean('super_user').defaultTo(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
