const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSevice = require('../services/token.js');
const Post = require('../models/posts');
const addFriends = async (userId, friendUsername) => {
  try {
    const user = await User.findOne({ userName: userId });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check if the friend is not already in the friends list
    if (!user.friends.some(friend => friend.username === friendUsername)) {
      // Find the friend by username
      const friend = await User.findOne({ userName: friendUsername });

      if (!friend) {
        return { success: false, message: 'Friend not found' };
      }

      // Add the friend to the user's friends with username and photo
      user.friends.push({ username: friend.userName, photo: friend.photo });
      await user.save();
      friend.friends.push({ username: user.userName, photo: user.photo });
      await friend.save();
      return { success: true, message: 'Friend added successfully' };
    } else {
      return { success: false, message: 'User is already a friend' };
    }
  } catch (error) {
    console.error('Error adding friend:', error.message);
    return { success: false, message: 'Internal Server Error' };
  }
};


const getAllFriends = async (token, userClientID) => {
  try {
    // Get the username from the provided token
    const username = await tokenSevice.getUsernameFromToken(token);

    // Find the user by their own username
    const user = await User.findOne({ userName: username });

    if (!user) {
      return { success: false, message: 'User not found' };
    }

    // Check if the requested user is the same as the user making the request
    if (userClientID === user.userName) {
      const friends = user.friends;
      return { success: true, friends: friends };
    } else {
      // Check if the requested user is a friend of the user making the request
      const isFriend = user.friends.some(friend => friend.username === userClientID);

      if (isFriend) {
        // Find the requested user by their username
        const requestedUser = await User.findOne({ userName: userClientID });

        if (!requestedUser) {
          return { success: false, message: 'Requested user not found' };
        }

        // Return the friends of the requested user
        const requestedUserFriends = requestedUser.friends;
        return { success: true, friends: requestedUserFriends };
      } else {
        return { success: false, message: 'You are not authorized to view this user\'s friends' };
      }
    }
  } catch (error) {
    console.error('Error fetching friends:', error.message);
    return { success: false, message: 'Internal Server Error' };
  }
};

const deleteFriend = async (token, friendUsername) => {
  try {
    // Get the username of the user making the request
    const usernamePromise = tokenSevice.getUsernameFromToken(token);
    const username = await usernamePromise;
    const myuser = await User.findOne({ userName: username });
    if (!myuser) {
      // User not found
      return { success: false, message: 'User not found' };
    }
    const friendUser = await User.findOne({ userName: friendUsername });
    // Update the user's friends list to remove the specified friend
    myuser.friends = myuser.friends.filter(userName => userName !==friendUsername);
    await myuser.save();
    friendUser.friends = friendUser.friends.filter(userName => userName !==userName);
    await friendUser.save();

    // Successfully removed friend
    return { success: true, message: 'Friend removed successfully' };
  } catch (error) {
    console.error('Error deleting friend:', error.message);
    return { success: false, message: 'Internal Server Error' };
  }
};

module.exports = { addFriends,getAllFriends,deleteFriend };
