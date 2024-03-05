const postService = require('../services/posts');

const createPost = async (req, res) => {
  const { text, token, data, img } = req.body;
  const result = await postService.createPost(text, token, data, img);
  res.json(result);
}

module.exports = {createPost};