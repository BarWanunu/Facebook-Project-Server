const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSevice= require('../services/token.js');
const Post = require('../models/posts');
async function likes(userId,postId, token,isliked){
    const usernamePromise= tokenSevice.getUsernameFromToken(token);
    
    const username = await usernamePromise; //

    const post = await Post.findOne({id:postId});
    if (!post) {
        return { success: false, message: 'Post not found' };
      }
      postrealId=post._id;
      postLikes=post.likes;
      if(!isliked){
        await Post.updateOne({ id: postId }, { $set: { likes:(postLikes-1)  } });
        return  { success: true, message: 'ulike' ,likes:post.likes};

      }
      await Post.updateOne({ id: postId }, { $set: { likes:(postLikes+1)  } });
      return  { success: true, message: 'add like' ,likes:post.likes};

      

}

module.exports = { likes };