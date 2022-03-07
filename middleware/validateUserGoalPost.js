const userGoalsModel = require("../user-goals/user-goals-model");

module.exports = async (req, res, next) => {
  try {
    const { user_goal } = req.body;
    const userGoalExists = await userGoalsModel.findBy(user_goal);

    if (userGoalExists) {
      return res.status(404).json({
        message: `You've already added ${req.body.user_goal}`,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
