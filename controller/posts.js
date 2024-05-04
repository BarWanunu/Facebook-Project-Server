const postService = require('../services/posts');
const postOptionService = require('../services/post_option.js');
const userService = require('../services/users.js');

const createPost = async (req, res) => {
  const { text, data, img } = req.body;
  const token = req.headers['authorization'].split(' ')[1];
  const result = await postService.createPost(text, token, data, img);
  res.json(result);
}

const getAllPosts = async (req, res) => {
  // Check if the Authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).json({ success: false, message: "Authorization header is missing" });
  }

  // Split the Authorization header to get the token
  const tokenParts = req.headers.authorization.split(' ');

  // Check if the token has the correct format
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({ success: false, message: "Invalid token format" });
  }

  const token = tokenParts[1]; // Extract the token

  // Proceed with your logic to get all posts using the token
  const result = await postService.getAllPosts(token);
  res.json(result);
}

const getPost = async (req, res) => {
  const postId = req.params.pid;
  const result = await postService.getPost( postId);
  res.json(result);
}
const getUserPosts = async (req, res) => {
  const userId = req.params.id;
  //const token = req.headers.authorization.split(' ')[1]; 
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
  const {isLiked} = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const message = await postOptionService.likes(userId,postId, token,isLiked);
  return message;
}
module.exports = {createPost,getAllPosts,getPost,getUserPosts,editPost,likes};