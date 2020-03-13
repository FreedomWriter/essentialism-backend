exports.seed = async function(knex) {
  await knex("values").truncate();
  await knex("values")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("values").insert([
        { id: 1, value: "Athletic ability", value_description: "" },
        { id: 2, value: "Art and literature", value_description: "" },
        { id: 3, value: "Creativity", value_description: "" },
        {
          id: 4,
          value:
            "discovering, or inventing things to make a difference in the world"
        },
        { id: 5, value: "Independence", value_description: "" }
      ]);
    });
};
