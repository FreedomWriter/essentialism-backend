const router = require("express").Router();

const usersModel = require("./users-model.js");
const userValuesRouter = require("../user-values/user-values-router");

const restricted = require("../middleware/restricted");
const validateId = require("../middleware/validateId");

router.use("/:id/values", userValuesRouter);

router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", validateId, restricted, async (req, res, next) => {
  const { id } = req.params;
  const project = await usersModel.findById(id);
  res.json(project);

  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newproject = await projectModel.add(req.body);
    res.status(201).json(newproject);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectModel.update(id, req.body);
    res.json(project);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await projectModel.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
