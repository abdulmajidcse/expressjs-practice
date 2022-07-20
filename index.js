const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: "Success",
    data: {
      message: "Welcome to Express API",
    },
  });
});

app.all("*", function (req, res) {
  res.status(404);
  res.json({
    errorCode: 404,
    errorMessage: "Not Found",
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    errorCode: 500,
    errorMessage: err.message,
  });
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
