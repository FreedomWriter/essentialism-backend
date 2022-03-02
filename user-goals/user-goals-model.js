const db = require("../data/db.config");
const GoalsModel = require("../goals/goals-model");

async function find(id) {
  // const user_Goals = await db("user_Goals as uv")
  //   .where("user_id", id)
  //   .leftJoin("Goals as v", "v.id", "uv.Goal_id")
  //   .select("uv.id", "v.goal", "v.Goal_description")
  // return user_Goals;
  const user_Goal_by_id = await db("user_Goals as uv")
    .where("uv.user_id", id)
    .join("users as u", "u.id", "uv.user_id")
    .select(
      "uv.user_id",
      "u.username",
      "uv.id as user_Goal_id",
      "uv.user_Goal",
      "uv.user_Goal_description"
    );
  return user_Goal_by_id;
}

function findBy(filter) {
  return db("user_Goals")
    .first("id", "user_Goal", "user_Goal_description")
    .where({ user_Goal: filter });
}

async function findById(id) {
  try {
    const user_Goal_by_id = await db("user_Goals as uv")
      .where("uv.id", id)
      .join("users as u", "u.id", "uv.user_id")
      .first(
        "uv.user_id",
        "u.username",
        "uv.id as user_Goal_id",
        "uv.user_Goal",
        "uv.user_Goal_description"
      );
    return user_Goal_by_id;
  } catch (err) {
    return err;
  }
}

async function add(goal) {
  try {
    const [id] = await db("user_Goals").insert(goal);
    return findById(id);
  } catch (err) {
    return err;
  }
}

async function update(userGoalId, body) {
  await db("user_Goals").where("id", userGoalId).update(body);

  return findById(userGoalId);
}

function remove(id) {
  return db("user_Goals").where({ id }).del();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};
