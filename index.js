const express = require("express");
const app = express();
require("dotenv").config();
const port = 3000;

const home = require("./controllers/home");

app.get("/", home);

app.all("*", function (req, res) {
  res.status(404).json({
    errorCode: 404,
    errorMessage: "Not Found",
  });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    errorCode: 500,
    errorMessage:
      process.env.NODE_ENV === "production" ? "Server Error" : err.message,
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
