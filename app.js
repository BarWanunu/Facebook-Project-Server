const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { addFriends } = require('./services/friends.js');



const app = express();
const Mongodb = MongoClient;
const mongoose =require('mongoose')

const customENV = require('custom-env');
customENV.env(process.env.NODE_ENV,'./config')

mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });

const cors = require('cors');
app.use(express.static('public'));
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json({ limit: '10mb' }));
// Route to handle the POST or PATCH request

const signupRoutes = require('./routes/users.js');
app.use('/signup', signupRoutes);

const postRoutes = require('./routes/posts.js');
app.use('/posts', postRoutes);  

const tokenRoutes = require('./routes/token.js');
app.use('/Token', tokenRoutes);

const userRoutes = require('./routes/users.js');
app.use('/User', userRoutes);
const usersRoutes = require('./routes/users.js');
app.use('/users', usersRoutes);
// app.post('/signup', async (req, res) => {
//   const { email, username, password, confirmPassword, photo } = req.body;
//   const message = await createUserController(email, username, password, confirmPassword, photo);
//   res.json(message);
// });

app.listen(process.env.PORT);
