const userValuesModel = require("../user-values/user-values-model");

module.exports = async (req, res, next) => {
  try {
    const user = await userValuesModel.findById(req.params.id);
    if (!user) {
      res
        .status(404)
        .json({ message: `No value found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
