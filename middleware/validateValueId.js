const userValuesModel = require("../user-values/user-values-model");

module.exports = async (req, res, next) => {
  try {
    const user = await userValuesModel.findById(req.params.id);
    if (!user) {
      next({ message: `No user-value found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
