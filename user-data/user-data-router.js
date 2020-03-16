const express = require("express");
const db = require("./user-data-model");

const restricted = require("../middleware/restricted");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const resources = await db.find();
    res.json(resources);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, async (req, res, next) => {
  const { id } = req.params;
  const resource = await db.findById(id);
  if (resource) {
    res.json(resource);
  } else {
    res
      .status(404)
      .json({ message: `Could not find resource with id of ${id}` });
  }
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newresource = await db.add(req.body);
    res.status(201).json(newresource);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const resource = await db.update(id, req.body);
    if (resource) {
      res.json(resource);
    } else {
      res
        .status(404)
        .json({ message: `Could not find resource with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await db.remove(id);

    if (deletedCount) {
      res.json({ removed: deletedCount });
    } else {
      res
        .status(404)
        .json({ message: `Could not find resource with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
