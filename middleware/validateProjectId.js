const projectsModel = require("../projects/projects-model");

module.exports = async (req, res, next) => {
  try {
    const user = await projectsModel.findById(req.params.id);
    if (!user) {
      next({ message: `No project found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
