const express = require("express");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");
const restricted = require("../middleware/restricted");

const usersModel = require("../users/users-model.js");

const router = express.Router();

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id
    },
    secrets.jwt,
    {
      expiresIn: "7d"
    }
  );
}

router.post("/register", async (req, res, next) => {
  try {
    const saved = await usersModel.add(req.body);

    const token = generateToken(saved);

    res.status(201).json({
      message: `Welcome ${user.username}`,
      authToken: token
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await usersModel.findBy({ username }).first();
    console.log(user);
    const passwordValid = await bycrypt.compareSync(password, user.password);

    if (user && passwordValid) {
      const token = generateToken(user);
      res.status(200).json({
        message: `Welcome ${user.username}!`,
        authToken: token
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", restricted(), (req, res, next) => {
  req.session.destroy(err => {
    if (err) {
      next(err);
    } else {
      res.json({
        message: "You are logged out"
      });
    }
  });
});

module.exports = router;
