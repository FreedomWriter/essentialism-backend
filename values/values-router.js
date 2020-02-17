const express = require("express");
const valueModel = require("./values-model");
const db = require("./values-model");

const restricted = require("../middleware/restricted");

const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const values = await db.find();
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, async (req, res, next) => {
  const { id } = req.params;
  const value = await db.findById(id);
  if (value) {
    res.json(value);
  } else {
    res.status(404).json({ message: `Could not find value with id of ${id}` });
  }
  try {
  } catch (err) {
    next(err);
  }
});

router.post("/", restricted, async (req, res, next) => {
  try {
    const newvalue = await valueModel.add(req.body);
    res.status(201).json(newvalue);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await valueModel.update(id, req.body);
    if (value) {
      res.json(value);
    } else {
      res
        .status(404)
        .json({ message: `Could not find value with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await valueModel.remove(id);
    console.log(deletedCount);
    if (deletedCount) {
      res.json({ removed: deletedCount });
    } else {
      res
        .status(404)
        .json({ message: `Could not find value with id of ${id}` });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
