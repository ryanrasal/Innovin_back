const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const usersRouter = require("./src/routes/users");
const authRouter = require("./src/routes/auth");
const winesRouter = require("./src/routes/wines");
const cartsRouter = require("./src/routes/carts");
const cartwinesRouter = require("./src/routes/cartwines");
const messagesRouter = require("./src/routes/messages");
const logoutRouter = require("./src/routes/logout");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const cors = require("cors");

app.use(
  cors({
    origin: '*',
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

app.use("/users", usersRouter);
app.use("/authentification", authRouter);
app.use("/wines", winesRouter);
app.use("/carts", cartsRouter);
app.use("/cartwines", cartwinesRouter);
app.use("/messages", messagesRouter);
app.use("/logout", logoutRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const port = 8888;

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

module.exports = app;
