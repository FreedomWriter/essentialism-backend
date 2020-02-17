const express = require("express");
const valueModel = require("./values-model");
const db = require("./values-model");

const restricted = require("../middleware/restricted");
const validateId = require("../middleware/validateId");

const router = express.Router();

router.get("/", restricted, async (req, res, next) => {
  try {
    const values = await db.find();
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", restricted, validateId, async (req, res, next) => {
  const { id } = req.params;
  const value = await db.findById(id);
  res.json(value);
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

router.put("/:id", restricted, validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await valueModel.update(id, req.body);
    res.json(value);
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", restricted, validateId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedCount = await valueModel.remove(id);
    res.json({ removed: deletedCount });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
