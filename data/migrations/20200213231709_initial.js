exports.up = async function(knex) {
  await knex.schema.createTable("users", users => {
    users.increments();
    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
  });
  await knex.schema.createTable("values", tbl => {
    tbl.increments();
    tbl.string("value").notNullable();
    tbl.text("value_description");
  });

  await knex.schema.createTable("user_values", tbl => {
    tbl.increments();
    tbl
      .integer("value_id")
      .unsigned()
      .references("id")
      .inTable("values")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
  await knex.schema.createTable("projects", tbl => {
    tbl.increments();
    tbl
      .string("project_name")
      .notNullable()
      .unique();
    tbl.text("project_description");
    tbl.boolean("project_complete").defaultTo("false");
    tbl
      .integer("value_id")
      .unsigned()
      .unique()
      .references("id")
      .inTable("values")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
  await knex.schema.createTable("user_data", tbl => {
    tbl.increments();
    tbl
      .integer("user_id")
      .notNullable()
      .unsigned()
      .unique()
      .references("id")
      .inTable("users")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("value_id")
      .notNullable()
      .unsigned()
      .unique()
      .references("id")
      .inTable("values")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });

  await knex.schema.createTable("tasks", tbl => {
    tbl.increments();
    tbl.text("task_description").notNullable();
    tbl.text("task_notes");
    tbl.boolean("task_complete").defaultTo("false");
    tbl
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
  });
  await knex.schema.createTable("resources", tbl => {
    tbl.increments();
    tbl.string("resource_name").notNullable();
    tbl.text("resource_description");
  });
  await knex.schema.createTable("project_resources", tbl => {
    tbl
      .integer("project_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("projects")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("resource_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("resources")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.primary(["project_id", "resource_id"]);
  });
  await knex.schema.createTable("contexts", tbl => {
    tbl.increments();
    tbl.text("context").notNullable();
  });
  await knex.schema.createTable("task_contexts", tbl => {
    tbl
      .integer("task_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("tasks")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl
      .integer("context_id")
      .notNullable()
      .unsigned()
      .references("id")
      .inTable("contexts")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    tbl.primary(["task_id", "context_id"]);
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists("task_contexts");
  await knex.schema.dropTableIfExists("contexts");
  await knex.schema.dropTableIfExists("project_resources");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("tasks");
  await knex.schema.dropTableIfExists("user_data");
  await knex.schema.dropTableIfExists("projects");
  await knex.schema.dropTableIfExists("user_values");
  await knex.schema.dropTableIfExists("values");
  await knex.schema.dropTableIfExists("users");
};
