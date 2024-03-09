const Post = require('../models/posts');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
async function createToken(userName){
    const userAccount= await User.findOne({userName:userName});
    if(!userAccount){
        return { success: false, token:'' };
    }
   
        const token = jwt.sign({ username: userName }, 'yourSecretKey');
         return { success: true, token };
    
 
}
async function getUsernameFromToken(token) {
    try {
      // Verify and decode the token
      const decoded = jwt.verify(token, 'yourSecretKey');
  
      // Extract the username from the decoded token
      const username = decoded.username;
  
      return username;
    } catch (error) {
      console.error('Error decoding token:', error.message);
      return '';
    }
  }

module.exports = { createToken,getUsernameFromToken };
