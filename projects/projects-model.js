const db = require("../data/db.config");

async function find() {
  const project = await db("projects as p")
    .leftJoin("user_values as uv", "p.user_value_id", "uv.id")
    .leftJoin("users as u", "u.id", "p.user_id")
    .leftJoin("tasks as t", "t.project_id", "p.id")
    .leftJoin("project_resources as pr", "pr.project_id", "p.id")
    .leftJoin("resources as r", "r.id", "pr.resource_id")
    .leftJoin("task_contexts as tc", "tc.task_id", "t.id")
    .leftJoin("contexts as c", "c.id", "tc.context_id")
    .select(
      "p.user_id",
      "u.username",
      "p.user_value_id",
      "uv.user_value",
      "p.id",
      "p.project_name",
      "p.project_description",
      "p.project_complete",
      "t.task_description",
      "t.task_notes",
      "t.task_complete",
      "r.resource_name",
      "r.resource_description",
      "c.context"
    );
  return project;
}

async function findById(id) {
  const project = await db("projects as p")
    .leftJoin("user_value as uv", "p.user_value_id", "user_value.id")
    .leftJoin("users as u", "u.id", "p.user_id")
    .where("p.id", id)
    .first()
    .select(
      "p.id",
      "p.user_id",
      "u.username",
      "p.user_value_id",
      "uv.value",
      "p.project_name",
      "p.project_description",
      "p.project_complete"
    );

  const tasks = await db("projects as p")
    .leftJoin("tasks as t", "t.project_id", "p.id")
    .where("p.id", id)
    .select("t.id", "t.task_description", "t.task_notes", "t.task_complete");
  const resources = await db("projects as p")
    .leftJoin("project_resources as pr", "pr.project_id", "p.id")
    .leftJoin("resources as r", "r.id", "pr.resource_id")
    .where("p.id", id)
    .select("r.resource_name", "r.resource_description");
  const contexts = await db("projects as p")
    .leftJoin("tasks as t", "t.project_id", "p.id")
    .leftJoin("task_contexts as tc", "tc.task_id", "t.id")
    .leftJoin("contexts as c", "c.id", "tc.context_id")
    .where("p.id", id)
    .select("c.context");
  return { project, tasks, resources, contexts };
}

// function findById(id) {
//   return db("projects")
//     .where({ id })
//     .first();
// }

async function add(project) {
  const [id] = await db("projects").insert(project);
  return db("projects")
    .where({ id })
    .first();
}

async function update(id, body) {
  await db("projects")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("projects")
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
