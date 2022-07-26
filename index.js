const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const home = require("./controllers/homeController");
const postsRouter = require("./routes/posts");
const errorResource = require("./resources/errorResource");
const usersRoute = require("./routes/users");
const guestRoute = require("./routes/guest");
const authRoute = require("./routes/auth");
const authenticate = require("./middlewares/authenticate");
const morgan = require("morgan");

const logStream = fs.createWriteStream(
  path.join(__dirname, "storage/logs/error.log"),
  { flags: "a" }
);

app.use(morgan("common", { stream: logStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", home);
app.use("/posts", postsRouter);
app.use("/users", usersRoute);
app.use("/auth", guestRoute);
app.use("/auth", authenticate, authRoute);

app.use((req, res) => {
  res.status(404).json(errorResource([], 404, "Not found"));
});

app.use((err, req, res, next) => {
  if (err instanceof Array) {
    return res.status(422).json(errorResource(err, 422));
  } else {
    return res
      .status(500)
      .json(
        errorResource(
          [],
          500,
          app.get("env") === "production" ? "Server Error" : err.message
        )
      );
  }
});

app.listen(process.env.APP_PORT, () => {
  console.log(`App is lestening ${process.env.APP_URL}`);
});
