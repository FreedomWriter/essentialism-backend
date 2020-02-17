const userValuesModel = require("../user-values/user-values-model");

module.exports = async (req, res, next) => {
  console.log(`validateUserValueId`, req.params.userValueId);
  try {
    const noUserValue = await userValuesModel.findById(req.params.userValueId);
    console.log(!noUserValue);
    if (noUserValue) {
      next({
        message: `No user-value found with the id of ${req.params.userValueId}`
      });
    }
    next();
  } catch (err) {
    next();
  }
};
