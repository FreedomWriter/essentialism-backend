exports.seed = async function (knex) {
  await knex("projects").delete();
  await knex("projects").insert([
    {
      id: 1,
      project_name: "Hire a Dev",
      project_description: "Need much code.",
      user_id: 1,
      user_goal_id: 1,
    },
    {
      id: 2,
      project_name: "Develop a Developer",
      project_description: "Call me crazy, but this makes sense",
      user_id: 1,
      user_goal_id: 2,
    },
    {
      id: 3,
      project_name: "Reap the rewards",
      user_id: 1,
      user_goal_id: 3,
    },
  ]);
};
