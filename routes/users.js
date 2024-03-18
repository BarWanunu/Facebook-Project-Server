const express = require('express');
const router = express.Router();
const userController= require('../controller/users.js');
const { createUser: createUserController } = require('../controller/users.js');
const postController= require('../controller/posts.js');
router.post('/', async (req, res) =>{
  const { email, username, password, confirmPassword, photo } = req.body;
  const message = await createUserController(email, username, password, confirmPassword, photo);
  res.json(message);
});
router.post('/signin', async (req, res) =>{
    const { username, password,  } = req.body;
    const message= await userController.checkUser(username,password);
    res.json(message);
});
router.delete('/:id/posts/:pid',async (req, res) => {
  const message = await userController.deletePost(req, res);
  res.json(message);
});
router.get('/:id/posts',async (req, res) => {
 
  const message = await postController.getUserPosts(req, res);
  // res.json(message);
});
router.patch('/:id/posts/:pid',async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.pid;
  const {  editedText} = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.editPost(userId,postId, token,editedText);
  res.json(message);
});

router.patch('/:id/posts/:pid/like',async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.pid;
  const { token, isLiked} = req.body;
  const message = await userController.likes(userId,postId, token,isLiked);
  res.json(message);
});
router.get('/:id/friends',async (req, res) => {
  const userId = req.params.id;
 
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.getAllFriends(token,userId);
  res.json(message);
});

router.get('/:id/friends',async (req, res) => {
  const userId = req.params.id;
 
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.getAllFriends(token,userId);
  res.json(message);
});
router.delete('/:id/friends/:fid',async (req, res) => {
  const userId = req.params.id;
  const friendId=req.params.fid;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.deleteFriend(token,friendId);
  res.json(message);
});
router.get('/:id',async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.getUser(token,userId);
  res.json(message);
});
router.delete('/:id',async (req, res) => {
  const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const message = await userController.deleteUser(token,userId);
  res.json(message);
});
router.patch('/:id',async (req, res) => {
  const userId = req.params.id;
  const { editedUsername, imageData} = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  const message = await userController.editUser(token,editedUsername, imageData);
  res.json(message);
});
router.post('/:id/friends',async (req, res) => {
  const userId = req.params.id;
 
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.addFriendsRequest(token,userId);
  res.json(message);
});
router.get('/:id/friends/requests',async (req, res) => {
  const userId = req.params.id;
 
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  const message = await userController.getAllFriendsRequest(token);
  res.json(message);
});
router.patch('/:id/friends/:fid',async (req, res) => {
  const userId = req.params.id;
  const friendId=req.params.fid;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

  // const message = await userController.deleteFriend(token,friendId);
  const message = await userController.approveFriendsRequest(token,friendId);
  res.json(message);
});
module.exports = router;