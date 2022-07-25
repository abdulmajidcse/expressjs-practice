const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const port = 3000;
const home = require("./controllers/homeController");
const postsRouter = require("./routes/posts");
const errorResource = require("./resources/errorResource");
const usersRoute = require("./routes/users");
const guestRoute = require("./routes/guest");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.use("/posts", postsRouter);
app.use("/users", usersRoute);
app.use("/auth", guestRoute);

app.use((req, res) => {
  res.status(404).json(errorResource([], 404, "Not found"));
});

app.use((err, req, res, next) => {
  fs.appendFile("storage/logs/error.log", `\n${err.message}`, (err) => {
    if (err) console.log(err);
  });
  res
    .status(500)
    .json(
      errorResource(
        [],
        500,
        app.get("env") === "production" ? "Server Error" : err.message
      )
    );
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
