const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { createUser: createUserController } = require('./controller/users.js');

const app = express();
const Mongodb = MongoClient;
const mongoose =require('mongoose')

mongoose.connect('mongodb://localhost:27017/facebook', { useNewUrlParser: true, useUnifiedTopology: true });
const cors = require('cors');
app.use(express.static('public'));
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json());

// Route to handle the POST or PATCH request
app.post('/login', (req, res) => {
  const { displayName, password } = req.body;
  if (displayName == 'guest' && password == 'Aa12345678') {
    res.redirect(302, '/home');
  } else {
    return res.status(401).json({ message: 'Invalid username or password' });
  }
});
const signupRoutes = require('./routes/users.js');
app.use('/signup', signupRoutes);

// app.post('/signup', async (req, res) => {
//   const { email, username, password, confirmPassword, photo } = req.body;
//   const message = await createUserController(email, username, password, confirmPassword, photo);
//   res.json(message);
// });

app.listen(80);
