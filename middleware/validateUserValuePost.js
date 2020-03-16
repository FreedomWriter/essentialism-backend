const userValuesModel = require("../user-values/user-values-model");

module.exports = async (req, res, next) => {
  try {
    const { user_value } = req.body;
    const userValueExists = await userValuesModel.findBy(user_value);

    if (userValueExists) {
      return res.status(404).json({
        message: `You've already added ${req.body.user_value}`
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
