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
  const user = await usersModel.findById(id);
  res.json(user);

  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newuser = await userModel.add(req.body);
    res.status(201).json(newuser);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userModel.update(id, req.body);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await userModel.remove(id);

    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
