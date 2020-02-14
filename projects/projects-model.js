const db = require("../data/db.config");

function find() {
  return db("projects").select();
}

function findById(id) {
  return db("projects")
    .where({ id })
    .first();
}

async function add(project) {
  const [id] = await db("projects").insert(project);
  return db("projects")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("projects")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("projects")
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
