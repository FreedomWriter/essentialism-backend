const express = require("express");
const userValueModel = require("./user-values-model");
const db = require("./user-values-model");
const validateUserValueId = require("../middleware/validateUserValueId");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  try {
    const { id } = req.params.id;
    const values = await db.find(req);
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:userValueId", validateUserValueId, async (req, res, next) => {
  const { userValueId } = req.params;
  console.log(`router: userValueId: `, userValueId);
  const value = await db.findById(userValueId);
  res.json(value);
  try {
  } catch (err) {
    next();
  }
});

router.post("/", async (req, res, next) => {
  const { id } = req.params;
  try {
    const newvalue = await userValueModel.add(id, req.body);
    res.status(201).json(newvalue);
  } catch (err) {
    next(err);
  }
});

router.put("/:userValueId", validateUserValueId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const value = await userValueModel.update(id, req.body);
    res.json(value);
  } catch (err) {
    next(err);
  }
});

router.delete("/:userValueId", validateUserValueId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedValue = await userValueModel.remove(id);
    res.json({ removed: deletedValue });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
