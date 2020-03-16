const express = require("express");
const userValueModel = require("./user-values-model");
const db = require("./user-values-model");
const projectsRouter = require("../projects/projects-router");
const validateUserValueId = require("../middleware/validateUserValueId");
const validateUserValuePost = require("../middleware/validateUserValuePost");

const router = express.Router({
  mergeParams: true
});

router.use("/:user_value_id/projects", projectsRouter);

router.get("/", async (req, res, next) => {
  try {
    const id = req.params.id;
    const values = await db.find(id);
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:user_value_id", validateUserValueId, async (req, res, next) => {
  const { user_value_id } = req.params;
  const value = await db.findById(user_value_id);
  res.json(value);
  try {
  } catch (err) {
    next();
  }
});

router.post("/", validateUserValuePost, async (req, res, next) => {
  const { id } = req.params;
  const { user_value, user_value_description } = req.body;
  try {
    const newvalue = await userValueModel.add({
      user_value,
      user_value_description,
      user_id: id
    });

    res.status(201).json(newvalue);
  } catch (err) {
    next(err);
  }
});

router.put("/:user_value_id", validateUserValueId, async (req, res, next) => {
  try {
    const { user_value_id } = req.params;

    const { user_value_description } = req.body;

    const value = await userValueModel.update(user_value_id, req.body);
    res.json(value);
  } catch (err) {
    next(err);
  }
});

router.delete("/user_value_id", validateUserValueId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedValue = await userValueModel.remove(id);
    res.json({ removed: deletedValue });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
