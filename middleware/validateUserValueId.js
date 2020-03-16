const userValuesModel = require("../user-values/user-values-model");

module.exports = async (req, res, next) => {
  try {
    const userValue = await userValuesModel.findById(req.params.user_value_id);
    if (!userValue) {
      res.status(404).json({
        message: `No user-value found with the id of ${req.params.user_value_id}`
      });
    }
    next();
  } catch (err) {
    next(err);
  }
};
