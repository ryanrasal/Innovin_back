const AuthManager = require("../../models/AuthManager");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_TIMING } = process.env;

async function loginController(req, res) {
  try {
    const { status, message } = await AuthManager.login(req.body.email, req.body.password);

    if (status === 200) {
      const payload = { sub: message.userConnect.id };

      const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: JWT_TIMING,
      });

      delete message.userConnect.hashedPassword;
      delete message.userConnect.password;

      res
        .cookie("userConnect", message.userConnect, {
          httpOnly: false,
        })
        .cookie("token", token, {
          httpOnly: true,
        })
        .json({status, message: {
          ...message,
          token, 
        },});
    } else {
      res.json({ status, message })
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

module.exports = loginController;
