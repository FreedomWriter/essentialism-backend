const db = require("../data/db.config");
const GoalsModel = require("../goals/goals-model");

async function find(id) {
  // const user_goals = await db("user_goals as uv")
  //   .where("user_id", id)
  //   .leftJoin("Goals as v", "v.id", "uv.Goal_id")
  //   .select("uv.id", "v.goal", "v.goal_description")
  // return user_goals;
  const user_goal_by_id = await db("user_goals as uv")
    .where("uv.user_id", id)
    .join("users as u", "u.id", "uv.user_id")
    .select(
      "uv.user_id",
      "u.username",
      "uv.id as user_goal_id",
      "uv.user_goal",
      "uv.user_goal_description"
    );
  return user_goal_by_id;
}

function findBy(filter) {
  return db("user_goals")
    .first("id", "user_goal", "user_goal_description")
    .where({ user_goal: filter });
}

async function findById(id) {
  try {
    const user_goal_by_id = await db("user_goals as uv")
      .where("uv.id", id)
      .join("users as u", "u.id", "uv.user_id")
      .first(
        "uv.user_id",
        "u.username",
        "uv.id as user_goal_id",
        "uv.user_goal",
        "uv.user_goal_description"
      );
    return user_goal_by_id;
  } catch (err) {
    return err;
  }
}

async function add(goal) {
  try {
    const [id] = await db("user_goals").insert(goal);
    return findById(id);
  } catch (err) {
    return err;
  }
}

async function update(userGoalId, body) {
  await db("user_goals").where("id", userGoalId).update(body);

  return findById(userGoalId);
}

function remove(id) {
  return db("user_goals").where({ id }).del();
}

module.exports = {
  find,
  findBy,
  findById,
  add,
  update,
  remove,
};
