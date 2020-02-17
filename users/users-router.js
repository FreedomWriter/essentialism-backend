const router = require("express").Router();

const usersModel = require("./users-model.js");
const userValuesRouter = require("../user-values/user-values-router");

const restricted = require("../middleware/restricted");

router.use("/:id/values", userValuesRouter);

router.get("/", restricted, async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
