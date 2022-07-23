const express = require("express");
const app = express();
require("dotenv").config();
const fs = require("fs");
const port = 3000;
const home = require("./controllers/homeController");
const postsRouter = require("./routes/posts");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", home);
app.use("/posts", postsRouter);

app.use((req, res) => {
  res.status(404).json({
    errorCode: 404,
    errorMessage: "Not Found",
  });
});

app.use((err, req, res, next) => {
  fs.fs.appendFile("storage/logs/error.log", `\n${err.message}`, (err) => {
    if (err) console.log(err);
  });
  res.status(500).json({
    errorCode: 500,
    errorMessage:
      process.env.NODE_ENV === "production" ? "Server Error" : err.message,
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
