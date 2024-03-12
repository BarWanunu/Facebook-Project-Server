const express = require('express');
const router = express.Router();
const { createPost: createPostController } = require('../controller/posts.js');
const controller =require('../controller/posts.js');
router.post('/create', async (req, res) =>{
  const message = await createPostController(req, res);
  res.json(message);
});

router.get('/', async (req, res) =>{
  const message = await controller.getAllPosts(req, res);
  res.json(message);
});
router.get('/:pid', async (req, res) =>{
  const message = await controller.getPost(req, res);
  res.json(message);
});

module.exports = router;