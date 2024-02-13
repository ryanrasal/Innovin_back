const jwt = require("jsonwebtoken");
const argon2 = require("argon2");

const { JWT_SECRET, JWT_TIMING } = process.env;

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.password, req.body.password, hashingOptions)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, JWT_SECRET, {
          expiresIn: JWT_TIMING,
        });

        delete req.user.hashedPassword;
        delete req.user.password;
        res
          .cookie("userConnect", req.user, {
            httpOnly: false,
          })
          .cookie("token", token, {
            httpOnly: true,
          })
          .sendStatus(200);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const verifyToken = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Token not provided");
    }

    console.warn("je suis req.cookies", req.cookies);

    req.payload = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    res.sendStatus(401);
  }
};

module.exports = { verifyPassword, verifyToken };
