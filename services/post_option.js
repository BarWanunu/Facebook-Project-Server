const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenService = require('../services/token.js');
const Post = require('../models/posts');

async function likes(userId, postId, token, isLiked) {
  const usernamePromise = tokenService.getUsernameFromToken(token);
  
  const username = await usernamePromise;

  const post = await Post.findOne({ id: postId });

  if (!post) {
    return { success: false, message: 'Post not found' };
  }

  const postRealId = post._id;
  let postLikes = post.likes;

  if (isLiked) {
    // If already liked, decrement likes by 1 and update the post
    const updatedLikes = postLikes - 1;
    await Post.updateOne({ _id: postRealId }, { $set: { likes: updatedLikes } });
    return { success: true, message: 'Unliked successfully', likes: updatedLikes };
  }

  // If not liked, increment likes and update the post
  const updatedLikes = postLikes + 1;
  await Post.updateOne({ _id: postRealId }, { $set: { likes: updatedLikes } });

  return { success: true, message: 'Liked successfully', likes: updatedLikes };
}

module.exports = { likes };
