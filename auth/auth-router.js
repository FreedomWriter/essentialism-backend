const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("../middleware/validator");

const usersModel = require("../users/users-model.js");

const router = express.Router();

function generateToken(user) {
  return jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRETS
    // {
    //   expiresIn: "7d"
    // }
  );
}

router.post(
  "/register",
  validator("username"),
  validator("password"),
  async (req, res, next) => {
    try {
      let user = req.body;
      const hash = await bcrypt.hashSync(user.password, 10);
      user.password = hash;
      const registerUser = await usersModel.add(user);

      const token = await generateToken(registerUser);

      const newUser = await usersModel.findById(registerUser.id);
      res.status(201).json({
        message: `Welcome ${user.username}!`,
        token: token,
        user: {
          id: newUser.id,
          username: newUser.username,
        },
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(req.body);
    console.log(process.env.JWT_SECRETS);
    const user = await usersModel.findBy({ username }).first();

    if (user !== undefined) {
      const passwordValid = await bcrypt.compareSync(
        password,
        user.password,
        10
      );
      if (passwordValid) {
        const token = generateToken(user);
        console.log(res.config);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token: token,
          user: {
            id: user.id,
            username: user.username,
          },
        });
      }
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
