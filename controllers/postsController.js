const postIndex = (req, res) => {
  res.send("post index route");
};

const postStore = (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: "Post Store Route",
    body: req.body,
  });
};

module.exports = { postIndex, postStore };
