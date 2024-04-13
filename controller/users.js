const userService = require('../services/users.js');
const postOptionService = require('../services/post_option.js');
const friendsService = require('../services/friends.js');
function createUser(email, userName, password,confirmPassword, photo) {

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
    if (userName == '') {
        return { success: false, message: 'Please enter a display name' };
    }
     if (photo== '') {
        return { success: false, message: 'Please upload a profile picture' };
            
        }
    const message= userService.createUser(email, userName, password,photo);
    return message



    // Check if password meets the requirements

}
async function checkUser(username, password) {
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
async function editPost(userId,postId, token, text) {
    const message = await userService.editPost(userId,postId, token,text);
    return message;
}
async function likes(userId,postId, token,isliked) {
    const message = await postOptionService.likes(userId,postId, token,isliked);
    return message;
}
async function getAllFriends(token, userId) {
    const message = await friendsService.getAllFriends(token,userId);
    return message;
}
async function deleteFriend(token, userId) {
    const message = await friendsService.deleteFriend(token,userId);
    return message;
}
async function getUser(token, userId) {
    const message = await userService.getUser(token,userId);
    return message;
}

async function deleteUser(token, userId) {
    const message = await userService.deleteUser(token,userId);
    return message;
}
async function editUser(token,editedUsername, imageData) {
    const message = await userService.editUser(token,editedUsername, imageData);
    return message;
}
async function addFriendsRequest(token, userId) {
    const message = await friendsService.addFriendsRequest(token,userId);
    return message;
}
async function getAllFriendsRequest(token) {
    const message = await friendsService.getAllFriendsRequest(token);
    return message;
}
async function approveFriendsRequest(token,friendId) {
    const message = await friendsService.approveFriendsRequest(token,friendId);
    return message;
}

module.exports = { createUser,checkUser,deletePost,editPost,likes,getAllFriends,deleteFriend,getUser,deleteUser,editUser,addFriendsRequest,getAllFriendsRequest,approveFriendsRequest };