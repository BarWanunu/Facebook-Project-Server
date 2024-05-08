const Post = require('../models/posts');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const tokenSevice= require('../services/token.js');
// Function to create a new post
const net = require('net');
async function createPost(text, token, date, img) {
    const secretKey = 'yourSecretKey';
    const urlRegex = /(https?:\/\/www\.|https?:\/\/|www\.)?[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})+(\.[a-zA-Z0-9]{2,})?/g; // Regular expression to match URLs 
    try {
        // Verify and decode the received token
        const decoded = jwt.verify(token, secretKey);

        // Extract user information from the decoded token
        const { userId, username } = decoded;

        // Fetch user from the database
        const user = await User.findOne({ userName: username });

        if (!user) {
            return { success: false, message: 'User not found' };
        }

        const userProfile = user.photo;
        const lastPost = await Post.findOne({}, {}, { sort: { 'id': -1 } });
        const newPostId = lastPost ? lastPost.id + 1 : 1;
        const hasUrl = urlRegex.test(text);

        // Print to console if there is a URL in the text
        if (hasUrl) {
            console.log('The text contains a URL:', text);
    
            // Extract the URL from the text
            const url = text.match(urlRegex)[0]; // Assuming there's only one URL in the text
    
            // Check the URL
            const isURLAllowed = await checkURL(url);
            if (!isURLAllowed) {
                // URL is not allowed, return an error message
                return { success: false, message: 'The URL is not allowed' };
            }
        
        }
    
        // Create a new post
        const post = new Post({
            id:newPostId,
            text: text,
            profile: username,
            date: date,
            img: img,
            profileImg: userProfile,
        
        });

        // Save the post
        await post.save();
        user.posts.push(post._id);
        await user.save();


        return { success: true, message: 'Post created successfully',post:post};
    } catch (error) {
        console.error('Error creating post:', error.message);
        return { success: false, message: 'An error occurred while creating the post' };
    }
}
async function checkURL(url) {
    return new Promise((resolve, reject) => {
        const client = new net.Socket();
        const TCP_SERVER_HOST =process.env.TCP_SERVER_IP;
        const TCP_SERVER_PORT = process.env.TCP_SERVER_PORT;

        client.connect(TCP_SERVER_PORT, TCP_SERVER_HOST, () => {
            console.log('Connected to TCP server');
            // Send "2 " followed by the URL to the server
            client.write(`2 ${url}\n`);
        });

        // Listen for data from the server
        client.on('data', (data) => {
            console.log('Received data from server:', data.toString());
            const receivedData = data.toString(); // Convert data buffer to string
            if (receivedData === "true true") {
                resolve(false); // Resolve with true if the URL is allowed
            } else {
                resolve(true); // Resolve with false if the URL is not allowed
            }
            // Process the received data here
        });

        // Listen for errors
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
    });
}
// Function to get all posts for user's fees
async function getAllPosts(token) {
    try {
        const usernamePromise = tokenSevice.getUsernameFromToken(token);
        const username = await usernamePromise;
        if (!username) {
            return { success: false, message: 'Invalid token' };
        }

        // Find the user based on the username from the token
        const user = await User.findOne({ userName: username });
        if (!user) {
            return { success: false, message: 'User not found' };
        }

        // Get the user's friend IDs
        const friendIds = user.friends.map(friend => friend.username);

        // Find the 20 most recent posts of the user's friends
        let friendPosts = await Post.aggregate([
            // Match posts where the userId is in the friendIds array
            { $match: { profile: { $in: friendIds } } },
            // Sort posts by date in descending order
            { $sort: { date: -1 } },
            // Limit the result to 20 posts
            { $limit: 20 }
        ]);

        // Get the user IDs of friends
        const friendUserIds = user.friends.map(friend => friend.username);

        // Find the posts of users who are not friends with the user
        let nonFriendPosts = await Post.aggregate([
            // Match posts where the userId is not in the friendUserIds array
            { $match: { profile: { $nin: friendUserIds } } },
            // Sort posts by date in descending order
            { $sort: { date: -1 } },
            // Limit the result to 5 posts
            { $limit: 5 }
        ]);

        // Concatenate friendPosts and nonFriendPosts arrays
        const posts2 = [...friendPosts, ...nonFriendPosts];

        return posts2;
    } catch (error) {
        res.status(500).json( { success: false, message: 'Error fetching posts' });
    }
}
// Function to get a specific post by its ID
async function getPost(postId){
    try {
        let post = await Post.findOne({id:postId});
    return { success: true, post: post };
    } catch (error) {
    return { success: false, post:'' };
  }
}
// Function to get all posts of a specific user
async function getUserPosts(userId){
    try {
        const userPosts = await Post.aggregate([
            { $match: { profile: userId } }
            // Add more aggregation stages if needed
        ]);
       
        return userPosts;
    } catch (error) {
        //return { success: false, message: 'Error fetching posts' };
        res.status(500).json( { success: false, message: 'Error fetching posts' });
    }
}

module.exports = { createPost, getAllPosts,getPost,getUserPosts };
