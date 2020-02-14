const router = require("express").Router();

const usersModel = require("./users-model.js");
const restricted = require("../middleware/restricted");

router.get("/", restricted(), async (req, res, next) => {
  try {
    const users = await usersModel.find();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
