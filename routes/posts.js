const express = require('express');
const router = express.Router();
const { createPost: createPostController } = require('../controller/posts.js');

router.post('/create', async (req, res) =>{
  const { id, text, profile, img, profileImg } = req.body;
  const message = await createPostController(id, text, profile, img, profileImg);
  res.json(message);
});

module.exports = router;