const express = require("express");
const projectModel = require("./projects-model");
const db = require("./projects-model");
const tasksRouter = require("../tasks/tasks.router");

const validateProjectId = require("../middleware/validateProjectId");
const router = express.Router({
  mergeParams: true,
});

router.use("/:project_id/tasks", tasksRouter);

router.get("/", async (req, res, next) => {
  try {
    const projects = await db.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get("/user", async (req, res, next) => {
  const { id } = req.params;
  try {
    const projects = await db.findByUser(id);
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:project_id",

  validateProjectId,
  async (req, res, next) => {
    try {
      const { project_id } = req.params;
      const project = await db.findById(project_id);
      res.json(project);
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", async (req, res, next) => {
  const { id, user_Goal_id } = req.params;
  const { body } = req;

  try {
    const newproject = await projectModel.add({
      user_id: id,
      user_Goal_id,
      project_name: body.project_name,
      project_description: body.project_description,
    });
    res.status(201).json(newproject);
  } catch (err) {
    next(err);
  }
});

router.put(
  "/:project_id",

  validateProjectId,
  async (req, res, next) => {
    try {
      const { project_id } = req.params;
      const project = await projectModel.update({
        user_id: req.body.user_id,
        project_id: project_id,
        body: req.body,
      });
      res.json(project);
    } catch (err) {
      next(err);
    }
  }
);

router.delete(
  "/:project_id",

  validateProjectId,
  async (req, res, next) => {
    try {
      const { project_id } = req.params;
      const deletedCount = await projectModel.remove(project_id);

      res.json({ removed: deletedCount });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
