exports.seed = async function (knex) {
  await knex("task_contexts").delete();
  await knex("task_contexts").then(function () {
    // Inserts seed entries
    return knex("task_contexts").insert([
      { task_id: 1, context_id: 1 },
      { task_id: 1, context_id: 3 },
    ]);
  });
};
