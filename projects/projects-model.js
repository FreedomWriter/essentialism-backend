const db = require("../data/db.config");

async function find() {
  const projects = await db("projects");
  const projectsArr = await projects.map(
    async project => await findById(project.id)
  );
  return Promise.all(projectsArr);
}

async function findByUser(user_id) {
  const projects = await db("projects as p")
    .select("p.id", "p.user_id", "p.project_name")
    .where("p.user_id", user_id);
  const projectsArr = await projects.map(
    async project => await findById(project.id)
  );
  return Promise.all(projectsArr);
}

async function findById(id) {
  try {
    const project = await db("projects as p")
      .leftJoin("user_values as uv", "p.user_value_id", "uv.id")
      .leftJoin("users as u", "u.id", "p.user_id")
      .where("p.id", id)
      .first()
      .select(
        "p.id",
        "p.user_id",
        "u.username",
        "p.user_value_id",
        "uv.user_value",
        "p.project_name",
        "p.project_description",
        "p.project_complete"
      );
    const tasks = await db("projects as p")
      .join("tasks as t", "t.project_id", "p.id")
      .where("p.id", id)
      .select("t.id", "t.task_description", "t.task_notes", "t.task_complete");
    const resources = await db("projects as p")
      .leftJoin("project_resources as pr", "pr.project_id", "p.id")
      .join("resources as r", "r.id", "pr.resource_id")
      .where("p.id", id)
      .select(
        "r.id as resource_id",
        "r.resource_name",
        "r.resource_description"
      );
    const contexts = await db("projects as p")
      .leftJoin("tasks as t", "t.project_id", "p.id")
      .leftJoin("task_contexts as tc", "tc.task_id", "t.id")
      .join("contexts as c", "c.id", "tc.context_id")
      .where("p.id", id)
      .select("c.id as context_id", "c.context");

    return { project, tasks, resources, contexts };
  } catch (err) {
    return err;
  }
}

async function add(project) {
  const [id] = await db("projects").insert(project);
  return findById(id);
}

async function update(value) {
  await db("projects as p")
    .where({ id: value.body.project_id })
    .update({
      project_name: value.body.project_name,
      project_description: value.body.project_description
    });
  const usersProjects = await findByUser(value.body.user_id);
  console.log(`userProjects`, usersProjects);
  return "testing and breaking";
}

function remove(id) {
  return db("projects")
    .where({ id })
    .del();
}

module.exports = {
  find,
  findById,
  findByUser,
  add,
  update,
  remove
};
