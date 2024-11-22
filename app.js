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
const net = require('net');
const client = new net.Socket();
const TCP_SERVER_HOST = process.env.TCP_SERVER_IP; 
const TCP_SERVER_PORT = parseInt(process.env.TCP_SERVER_PORT, 10);
const initialize= process.env.BLOOM_PSRT_INITIALIZE
client.connect(TCP_SERVER_PORT, TCP_SERVER_HOST, () => {
    console.log('Connected to TCP server');
    client.write(`${initialize}\n`);
});
client.on('error', (error) => {
    console.error('Error:', error.message);
    reject(error); // Reject the Promise if there's an error
    // Handle errors here
});

// Listen for the connection to close
client.on('close', () => {
    console.log('Connection closed');
    // Handle connection close here
});
setTimeout(async () => {
    const timeout = 1000; // Define timeout here
    const urls = process.env.URL_LIST.split(',');
    for (let url of urls) {
        await new Promise((resolve, reject) => {
            const client2 = new net.Socket();
            client2.connect(TCP_SERVER_PORT, TCP_SERVER_HOST, () => {
                console.log('Connected to TCP server2');
                client2.write(`1 ${url}\n`);
            });
            client2.on('error', (error) => {
                console.error('Error:', error.message);
                reject(error); // Reject the Promise if there's an error
            });

            // Listen for the connection to close
            client2.on('close', () => {
                console.log('Connection closed');
                resolve(); // Resolve the Promise when the connection is closed
            });
        });
    }
}, 1000); // Adjust the timeout as needed

const closeTCPConnection = () => {
    client.end(); // Close the TCP connection
  
};
process.on('SIGINT', () => {
    console.log('Stopping server...');
    closeTCPConnection(); // Close TCP connection before exiting
    process.exit(); // Exit the server process
});
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
