import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import { createUser as createUserController } from "./controller/users.js";

const app = express();
const Mongodb=MongoClient;

import cors from 'cors';
import e from 'express';
app.use(express.static('public'));
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json());


// Route to handle the POST or PATCH request
app.post('/login', (req, res) => {
  const { displayName, password } = req.body;
  if (displayName == 'guest' && password == 'Aa12345678') {
    
    res.redirect(302, '/home');
  }
  else{
    return res.status(401).json({ message: 'Invalid username or password' });

  }

});
app.post('/signup', async(req, res) => {
    const { email, username, password,confirmPassword, photo } = req.body;
    const message = await createUserController(email, username, password, confirmPassword, photo);
    res.json(message);
});

app.listen(80)