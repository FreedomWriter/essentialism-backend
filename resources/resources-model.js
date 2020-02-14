const db = require("../data/db.config");

function find() {
  return db("resources").select();
}

function findById(id) {
  return db("resources")
    .where({ id })
    .first();
}

async function add(resource) {
  const [id] = await db("resources").insert(resource);
  return db("resources")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("resources")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("resources")
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
