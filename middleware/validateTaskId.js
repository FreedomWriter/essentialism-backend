const taskModel = require("../tasks/tasks-models");

module.exports = async (req, res, next) => {
  try {
    const user = await taskModel.findById(req.params.taskId);
    if (!user) {
      res
        .status(404)
        .json({ message: `No task found with the id of ${req.params.taskId}` });
    }
    next();
  } catch (err) {
    next();
  }
};
