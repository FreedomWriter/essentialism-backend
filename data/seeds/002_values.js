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
        { id: 5, value: "Independence", value_description: "" },
        {
          id: 6,
          value: "Kindness and generosity"
        },
        { id: 7, value: "Living in the moment", value_description: "" },
        {
          id: 8,
          value:
            "Membership in a social group (such as your community, racial group, or school club)"
        },
        { id: 9, value: "Music", value_description: "" },
        { id: 10, value: "My community", value_description: "" },
        { id: 11, value: "My moral principles", value_description: "" },
        {
          id: 12,
          value: "Nature and the environment"
        },
        {
          id: 13,
          value: "Relationships with friends and family"
        },
        { id: 14, value: "Sense of humor", value_description: "" },
        { id: 15, value: "Success in my career", value_description: "" }
      ]);
    });
};
