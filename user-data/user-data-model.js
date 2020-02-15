const db = require("../data/db.config");

async function find() {
  const value = await db("user_data");

  return value;
}

function findById(id) {
  return db("user_data")
    .where({ id })
    .first();
}

async function add(value_project) {
  const { value_id, project_id } = value_project;
  console.log(value_project);
  const [id] = await db("user_data").insert(value_project);
  console.log(id);
  return findById(id);
}

async function update(id, body) {
  await db("user_data")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("user_data")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};
