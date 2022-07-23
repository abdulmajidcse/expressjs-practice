const postIndex = (req, res) => {
  res.send("post index route");
};

const postStore = (req, res) => {
  res.json({
    statusCode: 200,
    statusMessage: "Post Store Route",
    data: { ...req.body },
    photo: req.file,
  });
};

module.exports = { postIndex, postStore };
