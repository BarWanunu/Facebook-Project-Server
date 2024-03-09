const express = require('express');
const router = express.Router();

const controller =require('../controller/token.js');
router.post('/', async (req, res) =>{
    const message = await controller.createToken(req, res);
    res.json(message);
  });
  
module.exports = router;