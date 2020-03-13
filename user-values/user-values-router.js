const express = require("express");
const userValueModel = require("./user-values-model");
const db = require("./user-values-model");
const validateUserValueId = require("../middleware/validateUserValueId");
const validateUserValuePost = require("../middleware/validateUserValuePost");

const router = express.Router({
  mergeParams: true
});

router.get("/", async (req, res, next) => {
  try {
    const id = req.params.id;
    const values = await db.find(id);
    res.json(values);
  } catch (err) {
    next(err);
  }
});

router.get("/:userValueId", validateUserValueId, async (req, res, next) => {
  const { userValueId } = req.params;
  const value = await db.findById(userValueId);
  res.json(value);
  try {
  } catch (err) {
    next();
  }
});

router.post("/", validateUserValuePost, async (req, res, next) => {
  const { id } = req.params;
  const { user_value, user_value_description } = req.body;
  try {
    console.log({ user_value, user_value_description, user_id: id });
    const newvalue = await userValueModel.add({
      user_value,
      user_value_description,
      user_id: id
    });
    console.log(newvalue);
    res.status(201).json(newvalue);
  } catch (err) {
    next(err);
  }
});

router.put("/:userValueId", validateUserValueId, async (req, res, next) => {
  try {
    const { userValueId } = req.params;
    console.log(`put: req.params.userValueId: `, userValueId);
    const { user_value_description } = req.body;
    console.log(
      `const {user_value_description} = req.body`,
      user_value_description
    );
    const value = await userValueModel.update(userValueId, req.body);
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
