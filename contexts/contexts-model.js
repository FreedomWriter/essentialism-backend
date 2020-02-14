const db = require("../data/db.config");

function find() {
  return db("contexts").select();
}

function findById(id) {
  return db("contexts")
    .where({ id })
    .first();
}

async function add(context) {
  const [id] = await db("contexts").insert(context);
  return db("contexts")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("contexts")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("contexts")
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
