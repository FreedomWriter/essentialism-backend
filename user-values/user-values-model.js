const db = require("../data/db.config");

async function find(req) {
  const { id } = req.params;

  const user_values = await db("user_values as uv")
    .where("user_id", id)
    .leftJoin("values as v", "v.id", "uv.value_id")
    .select("v.value", "v.value_description");
  return user_values;
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
