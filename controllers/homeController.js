const home = (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: "Success",
    data: {
      message: "Welcome to Express API",
    },
  });
};

module.exports = home;
