// const express = require("express");
// const userValueModel = require("./user-values-model");
// const db = require("./user-values-model");
// const validateUserValueId = require("../middleware/validateUserValueId");

// const router = express.Router({
//   mergeParams: true
// });

// router.get("/", validateUserValueId, async (req, res, next) => {
//   try {
//     const { id } = req.params.id;
//     const values = await db.find(req);
//     res.json(values);
//   } catch (err) {
//     next(err);
//   }
// });

// router.get("/:valueId", async (req, res, next) => {
//   const { valueId } = req.params;
//   const value = await db.findById(valueId);
//   if (value) {
//     res.json(value);
//   } else {
//     res
//       .status(404)
//       .json({ message: `Could not find value with id of ${valueId}` });
//   }
//   try {
//   } catch (err) {
//     next(err);
//   }
// });

// router.post("/", async (req, res, next) => {
//   try {
//     const newvalue = await userValueModel.add(req.body);
//     res.status(201).json(newvalue);
//   } catch (err) {
//     next(err);
//   }
// });

// router.put("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const value = await userValueModel.update(id, req.body);
//     if (value) {
//       res.json(value);
//     } else {
//       res
//         .status(404)
//         .json({ message: `Could not find value with id of ${id}` });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// router.delete("/:id", async (req, res, next) => {
//   try {
//     const { id } = req.params;
//     const deletedValue = await userValueModel.remove(id);
//     console.log(deletedValue);
//     if (deletedValue) {
//       res.json({ removed: deletedValue });
//     } else {
//       res
//         .status(404)
//         .json({ message: `Could not find value with id of ${id}` });
//     }
//   } catch (err) {
//     next(err);
//   }
// });

// module.exports = router;

const express = require("express");
const userValueModel = require("./user-values-model");
const db = require("./user-values-model");
const validateUserValueId = require("../middleware/validateUserValueId");

const router = express.Router({
  mergeParams: true
});

router.get("/", validateUserValueId, async (req, res, next) => {
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
  const value = await db.findById(userValueId);
  res.json(value);
  try {
  } catch (err) {
    next();
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
