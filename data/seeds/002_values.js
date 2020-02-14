exports.seed = async function(knex) {
  await knex("values").truncate();
  await knex("values")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("values").insert([
        { id: 1, value: "Athletic ability", description: "" },
        { id: 2, value: "Art and literature", description: "" },
        { id: 3, value: "Creativity", description: "" },
        {
          id: 4,
          value:
            "discovering, or inventing things to make a difference in the world"
        },
        { id: 5, value: "Independence", description: "" },
        {
          id: 6,
          value: "Kindness and generosity"
        },
        { id: 7, value: "Living in the moment", description: "" },
        {
          id: 8,
          value:
            "Membership in a social group (such as your community, racial group, or school club)"
        },
        { id: 9, value: "Music", description: "" },
        { id: 10, value: "My community", description: "" },
        { id: 11, value: "My moral principles", description: "" },
        {
          id: 12,
          value: "Nature and the environment"
        },
        {
          id: 13,
          value: "Relationships with friends and family"
        },
        { id: 14, value: "Sense of humor", description: "" },
        { id: 15, value: "Success in my career", description: "" }
      ]);
    });
};
