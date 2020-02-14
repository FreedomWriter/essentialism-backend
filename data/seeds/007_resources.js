exports.seed = async function(knex) {
  await knex("resources").truncate();
  await knex("resources").then(function() {
    // Inserts seed entries
    return knex("resources").insert([
      { id: 1, resource_name: "Computer" },
      { id: 2, resource_name: "Internet" },
      { id: 3, resource_name: "Grit" }
    ]);
  });
};
