const db = require("../data/db.config");

function find(project_id) {
  return db("tasks as t")
    .join("projects as p", "t.project_id", "p.id")
    .where({ project_id })
    .select(
      "p.project_name",
      "p.description",
      "t.id",
      "t.description",
      "t.notes",
      "t.complete"
    );
}

async function add(project_id, task) {
  const [id] = await db("tasks")
    .where("project_id", project_id)
    .insert(task);
  return find(project_id);
}

function remove(id) {
  return db("tasks")
    .where({ id })
    .del();
}

module.exports = {
  find,
  add,
  remove
};
