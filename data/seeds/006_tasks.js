exports.seed = async function(knex) {
  await knex("tasks").truncate();
  await knex("tasks").insert([
    { project_id: 2, description: "Find Natalie" },
    {
      project_id: 2,
      description: "Check out her github",
      notes: "She's been working hard!"
    },
    { project_id: 2, description: "Reach out." }
  ]);
};
