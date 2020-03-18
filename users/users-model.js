const bcrypt = require("bcryptjs");

const db = require("../data/db.config.js");

function find() {
  return db("users").select("id", "username");
}

function findBy(filter) {
  return db("users")
    .select("id", "username")
    .where(filter);
}

async function add(user) {
  // user.password = await bcrypt.hashSync(user.password, 10);
  const [id] = await db("users").insert(user);

  return findById(id);
}

async function update(id, body) {
  await db("users")
    .where({ id })
    .update(body);

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first("id", "username");
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

module.exports = {
  add,
  update,
  find,
  findBy,
  findById,
  remove
};
