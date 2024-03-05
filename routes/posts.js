const express = require('express');
const router = express.Router();
const { createPost: createPostController } = require('../controller/posts.js');

router.post('/create', async (req, res) =>{
  const {  text, token,date,  img,  } = req.body;
  const message = await createPostController(req, res);
  res.json(message);
});

module.exports = router;