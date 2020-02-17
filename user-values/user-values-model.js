const db = require("../data/db.config");

async function find(req) {
  const { id } = req.params;

  const user_values = await db("user_values as uv")
    .where("user_id", id)
    .leftJoin("values as v", "v.id", "uv.value_id")
    .select("v.value", "v.value_description");
  return user_values;
}

async function findById(id) {
  const user_value_by_id = await db("user_values as uv")
    .where("value_id", id)
    .join("values as v", "v.id", "uv.value_id")
    .first()
    .select("v.value", "v.value_description");
  return user_value_by_id;
}

async function add(user_id, value) {
  const val = await db("values").findBy(value);
  if (!val) {
    const [id] = await db("values").insert(value);
    const userValue = await db("user_values")
      .where("user_id", user_id)
      .where("value_id", id)
      .insert(value)
      .first();
    return userValue;
  } else {
    const userValueObj = { user_id, value_id: val.id };
    const userValue = await db("user_values")
      .insert(userValueObj)
      .first();
    return findById(userValue.id);
  }
}

async function update(id, body) {
  await db("user_values")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("user_values")
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
