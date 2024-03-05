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
module.exports = router;