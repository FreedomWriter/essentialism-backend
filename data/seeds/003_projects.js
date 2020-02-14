exports.seed = async function(knex) {
  await knex("projects").truncate();
  await knex("projects").insert([
    { id: 1, project_name: "Hire a Dev", description: "Need much code." },
    {
      id: 2,
      project_name: "Develop a Developer",
      description: "Call me crazy, but this makes sense"
    },
    { id: 3, project_name: "Reap the rewards" }
  ]);
};
