exports.seed = async function(knex) {
  await knex("contexts").truncate();
  await knex("contexts").then(function() {
    return knex("contexts").insert([
      { id: 1, context: "at home" },
      { id: 2, context: "at work" },
      { id: 3, context: "at computer" }
    ]);
  });
};
