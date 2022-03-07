exports.seed = async function (knex) {
  await knex("tasks").delete();
  await knex("tasks").insert([
    { project_id: 2, task_description: "Find Natalie" },
    {
      project_id: 2,
      task_description: "Check out her github",
      task_notes: "She's been working hard!",
    },
    { project_id: 2, task_description: "Reach out." },
  ]);
};
