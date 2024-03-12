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
async function getAllPosts(){
    try {
        const posts = await Post.find();

        return { success: true, posts: posts };
      } catch (error) {
        return { success: false, message: 'Error fetching posts' };
      }
}
async function getPost(postId){
    try {
        const post = await Post.findOne({id:postId});
    return { success: true, post: post };
    } catch (error) {
    return { success: false, post:'' };
  }
}
module.exports = { createPost, getAllPosts,getPost };
