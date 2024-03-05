const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
async function createUser(emailuser, usernameuser, passworduser, photouser) {
    try {
        console.log('Checking for existing user with username:', usernameuser);

        const userCount = await User.countDocuments({ userName: usernameuser });

        console.log('Number of existing users with the same username:', userCount);

        if (userCount > 0) {
            return { success: false, message: 'Username is already taken' };
        }

        const newUser = new User({ email: emailuser, userName: usernameuser, password: passworduser, photo: photouser });

        await newUser.save();

        console.log('User created successfully:', newUser);

        return { success: true, message: 'User created successfully' };
    } catch (error) {
        console.error('Error during user creation:', error.message);
        return { success: false, message: 'An error occurred while creating the user' };
    }
}

async function checkUser(Username, password){
    const userAccount= await User.findOne({userName:Username});
    if(!userAccount){
        return { success: false, message: 'Incorrect username or password. Please try again.', token:'' };
    }
    if (userAccount.password === password){
        const token = jwt.sign({ userId: userAccount._id, username: userAccount.userName }, 'yourSecretKey');
         return { success: true, message: 'Login Success, welcome to Facebook!' , token };
    }
    else{
    return { success: false, message: 'Incorrect username or password. Please try again.' , token:'' };
    }
}

module.exports = { createUser, checkUser };

