const db = require("../data/db.config");
const valuesModel = require("../values/values-model");

async function find(id) {
  // const user_values = await db("user_values as uv")
  //   .where("user_id", id)
  //   .leftJoin("values as v", "v.id", "uv.value_id")
  //   .select("uv.id", "v.value", "v.value_description")
  // return user_values;
  const user_value_by_id = await db("user_values as uv")
    .where("uv.user_id", id)
    .join("users as u", "u.id", "uv.user_id")
    .select(
      "uv.user_id",
      "u.username",
      "uv.id as user_value_id",
      "uv.user_value",
      "uv.user_value_description"
    );
  return user_value_by_id;
}

function findBy(filter) {
  return db("user_values")
    .first("id", "user_value", "user_value_description")
    .where({ user_value: filter });
}

async function findById(id) {
  try {
    const user_value_by_id = await db("user_values as uv")
      .where("uv.id", id)
      .join("users as u", "u.id", "uv.user_id")
      .first(
        "uv.user_id",
        "u.username",
        "uv.id as user_value_id",
        "uv.user_value",
        "uv.user_value_description"
      );
    return user_value_by_id;
  } catch (err) {
    return err;
  }
}

async function add(value) {
  try {
    console.log(value);
    const [id] = await db("user_values").insert(value);
    return findById(id);
  } catch (err) {
    return err;
  }
}

async function update(userValueId, body) {
  await db("user_values")
    .where("id", userValueId)
    .update(body);

  return findById(userValueId);
}

function remove(id) {
  return db("user_values")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove
};
