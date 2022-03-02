const userGoalsModel = require("../user-goals/user-goals-model");

module.exports = async (req, res, next) => {
  try {
    const userGoal = await userGoalsModel.findById(req.params.user_Goal_id);
    if (!userGoal) {
      res.status(404).json({
        message: `No user-goal found with the id of ${req.params.user_Goal_id}`,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
