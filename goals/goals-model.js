const db = require("../data/db.config");

function find() {
  return db("goals").select();
}

function findById(id) {
  return db("goals").where({ id }).first();
}
function findBy(filter) {
  return db("goals").select("id", "goal", "goal_description").where(filter);
}

async function add(goal) {
  const [id] = await db("goals").insert(goal);
  return db("goals").where({ id }).first();
}

async function update(id, body) {
  await db("goals").where({ id }).update(body);

  return findById(id);
}

function remove(id) {
  return db("goals").where({ id }).del();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};
