const db = require("../data/db.config");

async function find() {
  const goal = await db("user_data");

  return goal;
}

function findById(id) {
  return db("user_data").where({ id }).first();
}

async function add(Goal_project) {
  const { Goal_id, project_id } = Goal_project;

  const [id] = await db("user_data").insert(Goal_project);

  return findById(id);
}

async function update(id, body) {
  await db("user_data").where({ id }).update(body);

  return findById(id);
}

function remove(id) {
  return db("user_data").where({ id }).del();
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove,
};
