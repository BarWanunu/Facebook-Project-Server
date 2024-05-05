const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSevice= require('../services/token.js');
const Post = require('../models/posts');
        // Check if the username is already taken
async function createUser(emailuser, usernameuser, passworduser, photouser) {
    try {
        console.log('Checking for existing user with username:', usernameuser);

        const userCount = await User.countDocuments({ userName: usernameuser });

        console.log('Number of existing users with the same username:', userCount);

        if (userCount > 0) {
            return { success: false, message: 'Username is already taken' };
        }
        // Create a new user instance

        const newUser = new User({ email: emailuser, userName: usernameuser, password: passworduser, photo: photouser });

        await newUser.save();

        console.log('User created successfully:', newUser);

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error during user creation:', error.message);
        return { success: false, message: 'An error occurred while creating the user' };
    }
}

// Function to check user credentials for login
async function checkUser(Username, password){
    const userAccount= await User.findOne({userName:Username});
    if(!userAccount){
        return { success: false, message: 'Incorrect username or password. Please try again.' };
    }
    if (userAccount.password === password){
       
         return { success: true, message: 'Login Success, welcome to Facebook!' };
    }
    else{
    return { success: false, message: 'Incorrect username or password. Please try again.'  };
    }
}

// Function to delete a post
async function deletePost(userId, postId, token) {
    const usernamePromise = tokenSevice.getUsernameFromToken(token);
    const username = await usernamePromise;
        // Check if the token matches the user ID
    if (username != userId) {
        return { success: false, message: 'Unauthorized access' };
    }

    // Find the post to be deleted
    const post = await Post.findOne({ id: postId });
    if (!post) {
        return { success: false, message: 'Post not found' };
    }

    const user = await User.findOne({ userName: username });
    if (!user) {
        return { success: false, message: 'User not found' };
    }

    // Filter out the post from the user's posts array
    user.posts = user.posts.filter(_id =>_id.toString() !== post._id.toString());
    await user.save();

    // Delete the post from the Post collection
    await Post.deleteOne({ id: postId });

    return { success: true, message: 'Post has been deleted' };
}

// Function to edit a post
async function editPost(userId, postId, token, newtext) {
    const usernamePromise = tokenSevice.getUsernameFromToken(token);
    const username = await usernamePromise;
    if (username != userId) {
      return { success: false, message: 'Unauthorized access' };
    }
        // Find the post to be edited

    const post = await Post.findOne({ id: postId });
    if (!post) {
      return { success: false, message: 'Post not found' };
    }
        // Update the text of the post

    const postrealId = post._id;
    const user = await User.findOne({ userName: username }).exec();
  

    await Post.updateOne({ id: postId }, { $set: { text: newtext } });
  
    return { success: true, message: 'Post has been edited' };
    // Remove the post ID from the user's posts array
  }

// Function to get user details
  async function getUser(token,userID){
    // const usernamePromise= tokenSevice.getUsernameFromToken(token);
    // const username = await usernamePromise;
   

    const userAccount= await User.findOne({userName:userID});
    if(!userAccount){
        return { success: false, message: 'User not found' };
    }
    return { success: true, message: 'user has been found',user:userAccount };
  }
  // Function to delete a user
  async function deleteUser(token){
    const usernamePromise= tokenSevice.getUsernameFromToken(token);
    const username1 = await usernamePromise;
    if(!username1){
        return { success: false, message: 'User not found' };
    }
    const userAccount= await User.findOne({userName:username1});
    if(!userAccount){
        return { success: false, message: 'User not found' };
    }
    const userPosts = await Post.find({ profile: username1 });

    // Delete each post individually
    for (const post of userPosts) {
        await Post.deleteOne({ _id: post._id });
    }
       // Remove user from friends' lists
       const userFriends = userAccount.friends;
       for (const friend of userFriends) {
           const friendUser = await User.findOne({ userName: friend.username });
           if (friendUser) {

            friendUser.friends = friendUser.friends.filter(f => f.username !== username1);
            await friendUser.save();
           }
       }
   
    await User.deleteOne({userName:username1});
    return { success: true, message: 'user has been found',user:userAccount };
  }

// Function to edit user details
  async function editUser(token, editUsername, editedImage) {
    const usernamePromise = tokenSevice.getUsernameFromToken(token);
    const username = await usernamePromise;
    if (!username) {
        return { success: false, message: 'User not found' };
    }
        // Find the user to be edited
    const userAccount = await User.findOne({ userName: username });
    if (!userAccount) {
        return { success: false, message: 'User not found' };
    }
        // Check if the username is already taken
    if (username != editUsername) {
        const findUser = await User.findOne({ userName: editUsername });
        if (findUser) {
            return { success: false, message: 'Username is already taken' };
        }
        await User.updateOne({ _id: userAccount._id }, { $set: { userName: editUsername } });
    }
    if (editedImage != '') {
        const sizeInKB = Buffer.byteLength(editedImage, 'base64') / 1024;
        if (sizeInKB > 140) {
            return { success: false, message: 'Post image size exceeds the limit of 140 KB' };
        }
        await User.updateOne({ _id: userAccount._id }, { $set: { photo: editedImage } });
    }
      // Update friends' usernames and profile images
      for (const friend of userAccount.friends) {
        // Find friend's user account
        const friendUser = await User.findOne({ userName: friend.username });
        if (!friendUser) {
            continue; // Skip if friend's user account is not found
        }
        
        // Find the friend we want to change
        const friendToUpdate = friendUser.friends.find(f => f.username === username);
        if (friendToUpdate) {
            // Update friend's username and profile image
            friendToUpdate.username = editUsername;
            friendToUpdate.photo = editedImage !== '' ? editedImage : friend.photo;
            await friendUser.save();
        }
    }
        // Update the username and profile image in user's posts

    const userPosts = await Post.find({ profile: username });
    for (const post of userPosts) {
        if (username != editUsername) {
            post.profile = editUsername;
        }
        if (editedImage != '') {
            post.profileImg = editedImage;
        }
        await post.save();
    }


    return { success: true, message: 'User has been changed', username: editUsername, profile: editedImage };
}

module.exports = { createUser, checkUser,deletePost, editPost,getUser,deleteUser , editUser };

