const express = require('express');
const router = express.Router();
const { createUser: createUserController } = require('../controller/users.js');

router.post('/', async (req, res) =>{
  const { email, username, password, confirmPassword, photo } = req.body;
  const message = await createUserController(email, username, password, confirmPassword, photo);
  res.json(message);
});

module.exports = router;
