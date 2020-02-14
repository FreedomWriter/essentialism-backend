const db = require("../data/db.config");

function find() {
  return db("value_projects as vp")
    .join("values as v", "vp.value_id")
    .select();
}

function findById(id) {
  return db("value_projects")
    .where({ id })
    .first();
}

async function add(value_project) {
  const [id] = await db("value_projects").insert(value_project);
  return db("value_projects")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("value_projects")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("value_projects")
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
