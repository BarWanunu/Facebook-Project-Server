const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenService = require('../services/token.js');
const Post = require('../models/posts');
// Function to handle like/unlike functionality
async function likes(userId, postId, token, isLiked) {
  // Get the username from the token
  const usernamePromise = tokenService.getUsernameFromToken(token);
  
  const username = await usernamePromise;
  // Find the post by its id
  const post = await Post.findOne({ id: postId });

  if (!post) {
    return { success: false, message: 'Post not found' };
  }
  // Get the real id of the post
  const postRealId = post._id;
  let postLikes = post.likes;


    const userLiked = post.likedBy.includes(username);

    if (userLiked) {
    // If already liked, decrement likes by 1 and update the post
    const updatedLikes = postLikes - 1;
    await Post.updateOne({ _id: postRealId }, { $pull: { likedBy: username }, $set: { likes: updatedLikes } });
    return { success: true, message: 'Unliked successfully', likes: updatedLikes };
    }
    else{
      const updatedLikes = postLikes + 1;
        // Add the username to the likedBy array
        await Post.updateOne({ _id: postRealId }, { $push: { likedBy: username }, $set: { likes: updatedLikes } });
        return { success: true, message: 'Liked successfully', likes: updatedLikes };
      }
    }
  


module.exports = { likes };
