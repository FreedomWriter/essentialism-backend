const secrets = require("../config/secrets");
const jwt = require("jsonwebtoken");

module.exports = () => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(400).json({ message: "No credentials provided" });
  } else {
    jwt.verify(token, secrets.jwt, (err, payload) => {
      if (err) {
        res.status(403).json({ message: "You are not authorized." });
      } else {
        req.userId = payload.userId;
        next();
      }
    });
  }
};
