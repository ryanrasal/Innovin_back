// ../controllers/LogoutControllers/LogoutController.js
const logout = (_, res) => {
    console.warn("coucou")
    try {
      res.clearCookie("userConnect");
      res.clearCookie("token");
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      console.error("Error in logout:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = logout;
