const Post = require('../models/posts');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const tokenSevice= require('../services/token.js');
async function createPost(text, token, date, img) {
    const secretKey = 'yourSecretKey';
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

async function getPost(postId){
    try {
        let post = await Post.findOne({id:postId});
    return { success: true, post: post };
    } catch (error) {
    return { success: false, post:'' };
  }
}
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
