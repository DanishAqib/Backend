/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .raw(
      'CREATE EXTENSION IF NOT EXISTS "uuid-ossp"; CREATE EXTENSION IF NOT EXISTS tablefunc;'
    )
    .createTable("barber_timings", (table) => {
      table.uuid("bt_id").primary().defaultTo(knex.raw("uuid_generate_v4()"));
      table.uuid("b_id").references("u_id").inTable("users").notNullable();
      table.string("bt_start_time").notNullable();
      table.string("bt_end_time").notNullable();
      table.string("bt_interval").notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("barber_timings");
};
