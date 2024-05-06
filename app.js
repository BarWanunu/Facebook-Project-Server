const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { addFriends } = require('./services/friends.js');
const Post = require('./models/posts');
const app = express();
const  { initializeUsers, initializePosts }  = require('./services/first_run');

const Mongodb = MongoClient;
const mongoose =require('mongoose')
// Custom environment variable configuration
const customENV = require('custom-env');
customENV.env(process.env.NODE_ENV,'./config')
// Connecting to MongoDB using Mongoose
mongoose.connect(process.env.CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true });
// Importing and configuring CORS middleware
const cors = require('cors');
app.use(express.static('public'));
app.use(cors());
// Middleware to parse JSON data
app.use(bodyParser.json({ limit: '10mb' }));
// Route to handle the POST or PATCH request
const path = require('path');
const fileURLToPath = require('url')
const filename = __filename;
// Update each post document to include the likedBy field
// async function migratePosts() {
//     const posts = await Post.find();
// for (const post of posts) {
//   post.likedBy = []; // Initialize likedBy field as an empty array
//   await post.save(); // Save the updated post document
// }
// }
// migratePosts();
let flag = true;
if(flag){
    console.log("flag", flag);
    initializeUsers(); 
     initializePosts();
    !flag;
}
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
// Listening on the specified port
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public','index.html'))
})
app.listen(process.env.PORT);
