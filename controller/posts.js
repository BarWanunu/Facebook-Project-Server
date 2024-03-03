const postService = require('../services/posts');

const createPost = async (req, res) => {
  res.json(await postService.createPost(req.body.id, req.body.text, req.body.profile, req.body.img, req.body.profileImg));
}

module.exports = {createPost};