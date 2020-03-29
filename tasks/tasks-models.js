const db = require("../data/db.config");

function find(project_id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id })
    .select(
      "t.id",
      "t.project_id",
      "p.project_name",
      "t.task_description",
      "t.task_notes",
      "t.task_complete"
    );
}

function findById(id) {
  return db("tasks")
    .where({ id })
    .first();
}

async function add(project_id, task) {
  await db("tasks")
    .where("project_id", project_id)
    .insert(task);
  return find(project_id);
}

async function update(id, body) {
  await db("tasks")
    .where({ id })
    .update(body);

  return findById(id);
}

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}

module.exports = {
  find,
  add,
  remove,
  findById,
  update
};
