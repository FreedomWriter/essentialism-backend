const userGoalsModel = require("../user-goals/user-goals-model");

module.exports = async (req, res, next) => {
  try {
    const { user_Goal } = req.body;
    const userGoalExists = await userGoalsModel.findBy(user_Goal);

    if (userGoalExists) {
      return res.status(404).json({
        message: `You've already added ${req.body.user_Goal}`,
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
