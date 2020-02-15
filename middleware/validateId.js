const db = require("../data/db.config");
const usersModel = require("../users/users-model");

async function validateId(req, res, next) {
  try {
    const user = await usersModel.findById(req.params.id);

    if (!user) {
      next(`No user found with the id of ${req.params.id}`);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateId;
