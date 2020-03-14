// const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRETS, (err, payload) => {
      console.log(token);
      // console.log;
      if (err) {
        res.status(403).json({
          message: "You are not authorized FROM RESTIRCTED MIDDLEWARE",
          error: err.message
        });
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};
