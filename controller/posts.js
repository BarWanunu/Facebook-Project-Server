const postService = require('../services/posts');

const createPost = async (req, res) => {
  const { text, data, img } = req.body;
  const token = req.headers['authorization'].split(' ')[1];
  const result = await postService.createPost(text, token, data, img);
  res.json(result);
}

const getAllPosts = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1]; 
  const result = await postService.getAllPosts( token);
  res.json(result);
}
const getPost = async (req, res) => {
  const postId = req.params.pid;
  const result = await postService.getPost( postId);
  res.json(result);
}
const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; 
  const result = await postService.getUserPosts( userId);
  res.json(result);
}
module.exports = {createPost,getAllPosts,getPost,getUserPosts};