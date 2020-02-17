const userValuesModel = require("../user-values/user-values-model");

async function validateValueId(req, res, next) {
  try {
    const value = await userValuesModel.findById(req.params.id);

    if (!value) {
      next(`No value found with the id of ${req.params.id}`);
    }
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = validateValueId;
