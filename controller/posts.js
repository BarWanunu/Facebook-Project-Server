const postService = require('../services/posts');
const postOptionService = require('../services/post_option.js');
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
const editPost= async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.pid;
  const {  editedText} = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userService.editPost(userId,postId, token,editedText);
  return message;
}
const likes= async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.pid;
  const { token, isLiked} = req.body;
  const message = await postOptionService.likes(userId,postId, token,isLiked);
  return message;
}
module.exports = {createPost,getAllPosts,getPost,getUserPosts,editPost,likes};