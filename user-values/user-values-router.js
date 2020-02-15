const express = require("express");
const userValueModel = require("./user-values-model");
const db = require("./user-values-model");
const validateId = require("../middleware/validateId");
const userDB = require("../users/users-model");

const router = express.Router({
  mergeParams: true
});

router.get("/", validateId, async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const values = await db.find(req);
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    const newvalue = await userValueModel.add(req.body);
    res.status(201).json(newvalue);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await userValueModel.update(id, req.body);
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

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedValue = await userValueModel.remove(id);
    console.log(deletedValue);
    if (deletedValue) {
      res.json({ removed: deletedValue });
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
