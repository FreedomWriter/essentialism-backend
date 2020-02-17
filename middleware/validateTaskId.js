const taskModel = require("../tasks/tasks-models");

module.exports = async (req, res, next) => {
  try {
    const user = await taskModel.findById(req.params.id);
    if (!user) {
      next({ message: `No task found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
