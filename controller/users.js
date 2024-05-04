const userService = require('../services/users.js');
const postOptionService = require('../services/post_option.js');
const friendsService = require('../services/friends.js');
const createUser = async (req, res) => {
    const { email, username, password, confirmPassword, photo } = req.body;
    // Check if email is in the correct format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { success: false, message: 'Please enter a valid email address' };
    }
    // Check if password meets the requirements
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    if (!passwordRegex.test(password)) {
        return { success: false, message: 'Password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.' };
    
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        return { success: false, message: 'Password and Confirm Password do not match' };
   
    }

    // Check if display name is not empty
    if (username == '') {
        return { success: false, message: 'Please enter a display name' };
    }
     if (photo== '') {
        return { success: false, message: 'Please upload a profile picture' };
            
        }
    const message= userService.createUser(email, username, password,photo);
    return message



    // Check if password meets the requirements

}
 const checkUser= async (req, res) => {
    const { username, password,  } = req.body;
    const message = await userService.checkUser(username, password);
    return message;
}
const deletePost = async (req, res) => {
    const userId = req.params.id;
    const postId = req.params.pid;
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await userService.deletePost(userId,postId, token);
    return message;
}
// async function editPost(userId,postId, token, text) {
//     const message = await userService.editPost(userId,postId, token,text);
//     return message;
// }
// async function likes(userId,postId, token,isliked) {
//     const message = await postOptionService.likes(userId,postId, token,isliked);
//     return message;
// }
const getAllFriends = async (req, res) => {
    const userId = req.params.id;
 
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.getAllFriends(token,userId);
    return message;
}
const deleteFriend= async (req, res) => {
    const userId = req.params.id;
    const friendId=req.params.fid;
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.deleteFriend(token,friendId);
    return message;
}
const getUser= async (req, res) => {
    const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header

    const message = await userService.getUser(token,userId);
    return message;
}
const deleteUser= async (req, res) => {
    const userId = req.params.id;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    const message = await userService.deleteUser(token,userId);
    return message;
}
const editUser= async (req, res) => {
    const userId = req.params.id;
  const { editedUsername, imageData} = req.body;
  const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
    const message = await userService.editUser(token,editedUsername, imageData);
    return message;
}
const addFriendsRequest= async (req, res) => {
    const userId = req.params.id;
 
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.addFriendsRequest(token,userId);
    return message;
}
const getAllFriendsRequest= async (req, res) => {
    const userId = req.params.id;
 
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.getAllFriendsRequest(token);
    return message;
}
const approveFriendsRequest= async (req, res) => {
    const userId = req.params.id;
    const friendId=req.params.fid;
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.approveFriendsRequest(token,friendId);
    return message;
}

const rejectFriendRequest= async (req, res) => {
    const userId = req.params.id;
    const friendId=req.params.fid;
    const token = req.headers.authorization.split(' ')[1]; // Extract token from Authorization header
  
    const message = await friendsService.rejectFriendRequest(token,friendId);
    return message;
}
module.exports = { createUser,checkUser,deletePost,getAllFriends,deleteFriend,getUser,deleteUser,editUser,addFriendsRequest,getAllFriendsRequest,approveFriendsRequest,rejectFriendRequest };