const Post = require('../models/posts');
const jwt = require('jsonwebtoken');
const User = require('../models/users');

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

        // Create a new post
        const post = new Post({
            text: text,
            profile: username,
            date: date,
            img: img,
            profileImg: userProfile,
        });

        // Save the post
        await post.save();

        return { success: true, message: 'Post created successfully' };
    } catch (error) {
        console.error('Error creating post:', error.message);
        return { success: false, message: 'An error occurred while creating the post' };
    }
}

module.exports = { createPost };
