const db = require("../data/db.config");

function find() {
  return db("values").select();
}

function findById(id) {
  return db("values")
    .where({ id })
    .first();
}

async function add(value) {
  const [id] = await db("values").insert(value);
  return db("values")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("values")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("values")
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
