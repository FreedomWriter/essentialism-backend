const projectsModel = require("../projects/projects-model");

module.exports = async (req, res, next) => {
  try {
    const project = await projectsModel.findById(req.params.id);
    if (!project) {
      res
        .status(404)
        .json({ message: `No project found with the id of ${req.params.id}` });
    }
    next();
  } catch (err) {
    next();
  }
};
