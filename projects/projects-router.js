const express = require("express");
const projectModel = require("./projects-model");
const db = require("./projects-model");

const validateProjectId = require("../middleware/validateProjectId");
const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  // const { id } = req.params;
  // return res.json({ message: `You got here with the user ${id}` });
  try {
    const projects = await db.find();
    res.json(projects);
  } catch (err) {
    next(err);
  }
});

router.get(
  "/:project_id",

  validateProjectId,
  async (req, res, next) => {
    const { project_id } = req.params;
    const project = await db.findById(project_id);
    res.json(project);

    try {
    } catch (err) {
      next(err);
    }
  }
);

router.post("/", async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.params;
  try {
    const newproject = await projectModel.add(req.body);
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
      const project = await projectModel.update(project_id, req.body);
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
