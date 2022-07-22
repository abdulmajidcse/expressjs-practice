const home = (req, res) => {
  res.statusCode(200);
  res.json({
    statusCode: 200,
    statusMessage: "Success",
    data: {
      message: "Welcome to Express API",
    },
  });
};

module.exports = home;
