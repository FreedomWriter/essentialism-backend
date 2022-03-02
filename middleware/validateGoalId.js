const userGoalsModel = require("../user-goals/user-goals-model");

module.exports = async (req, res, next) => {
  try {
    const user = await userGoalsModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: `No goal found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
