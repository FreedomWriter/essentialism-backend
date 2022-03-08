const express = require("express");
const contextsModel = require("./contexts-model");
const db = require("./contexts-model");

const restricted = require("../middleware/restricted");

const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const contexts = await db.find();
    res.json(contexts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const context = await db.findById(id);
    if (context) {
      res.json(context);
    } else {
      res
        .status(404)
        .json({ message: `Could not find context with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newcontext = await contextsModel.add(req.body);
    res.status(201).json(newcontext);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const context = await contextsModel.update(id, req.body);
    if (context) {
      res.json(context);
    } else {
      res
        .status(404)
        .json({ message: `Could not find context with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await contextsModel.remove(id);

    if (deletedCount) {
      res.json({ removed: deletedCount });
    } else {
      res
        .status(404)
        .json({ message: `Could not find context with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
