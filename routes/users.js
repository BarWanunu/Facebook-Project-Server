const express = require('express');
const router = express.Router();
const userController= require('../controller/users.js');
const { createUser: createUserController } = require('../controller/users.js');

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
  const userId = req.params.id;
  const postId = req.params.pid;
  const { token} = req.body;
  const message = await userController.deletePost(userId,postId, token);
  res.json(message);
});
router.patch('/:id/posts/:pid',async (req, res) => {
  const userId = req.params.id;
  const postId = req.params.pid;
  const { token, editedText} = req.body;
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

module.exports = router;